const { httpRequest } = require('../../util/http'),
	https = require('https');

exports.create = options => {
	let order = options.body.data.order.data,
		products = order.basket,
		customer = order.customer.data;

	let data = {
		CustomerRef: {
			value: customer.attributes.quickbooks_id
		},
		DocNumber: (''+order.attributes.order_number),
		Line: products.map(product => ({
			Amount: product.data.attributes.msrp,
			DetailType: 'SalesItemLineDetail',
			SalesItemLineDetail: {
				ItemRef: {
					value: product.data.attributes.quickbooks_id
				},
				Qty: 1,
				UnitPrice: product.data.attributes.msrp,
				TaxCodeRef: {
					value: 'TAX'
				}
			}
		}))
	};
	
	let params = {
		hostname: 'quickbooks.api.intuit.com',
		path: `/v3/company/${options.get('X-Company-Id')}/invoice`,
		method: 'POST',
		headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': options.get('Authorization') }
	};

	return httpRequest(params, JSON.stringify(data)).then(resp => ({
		data: {
			id: resp.Invoice.Id,
			type: 'invoices',
			attributes: { order: order }
		}
	}));
	// TODO: Should I create an invoice record into ES myself here or should I use a webhook?
};

exports.getOne = (req, res, next) => {
	let params = {
		hostname: 'quickbooks.api.intuit.com',
		path: `/v3/company/${req.get('X-Company-Id')}/invoice/${req.params.invoice_id}/pdf`,
		method: 'GET',
		headers: { 'Content-Type': 'application/pdf', 'Authorization': req.get('Authorization') }
	};

	const request = https.request(params, response => {
		if (response.statusCode < 200 || response.statusCode >= 300) {
			return new Error(response.statusMessage);
		}
		let body = [];
		response.on('data', chunk => {
			body.push(chunk);
		});
		response.on('end', () => {
			let pdf;
			try {
				pdf = new Buffer.concat(body);
			} catch(e) {
				return new Error(e);
			}
			res.writeHead(200, {
				'Content-Type': 'application/pdf',
				'Content-Disposition': 'attachment',
				'Content-Length': pdf.length
			});
			res.end(pdf);
		});
	});

	request.on('error', err => {
		return new Error(err);
	});
	
	request.end();	
};