const es = require('../../util/es'),
	{ httpRequest } = require('../../util/http'),
	_ = require('lodash');

exports.get = options => {
	return es.search({
		index: 'mbc',
		type: 'order',
		body: {
			query: {
				bool: {
					must_not: [
						{
							term: {
								fulfillment_status: 'fulfilled'
							}
						},
						{
							exists: {
								field: 'invoice_id'
							}
						}
					]
				}
			}
		}
	}).then(resp => {
		let included = [], 
			data = [];

		resp.hits.hits.forEach(d => {
			let order = d._source,
				customer = order.customer,
				lineItems = order.line_items;

			let relationships = {};

			delete order.customer;
			delete order.line_items;

			included.push({
				id: customer.shopify_id,
				type: 'customers',
				attributes: customer
			});

			relationships.customer = {
				data: { 
					type: 'customers', 
					id: customer.shopify_id
				}
			};

			lineItems.forEach(item => {
				included.push({
					id: item.id,
					type: 'items',
					attributes: item
				});
				let datum = { type: 'items', id: item.id };
				if (relationships.hasOwnProperty('line_items')) {
					relationships.line_items.data.push(datum);
				} else {
					relationships.line_items = { data: [datum] };
				}
			});

			data.push({
				id: d._id,
				type: 'orders',
				attributes: order,
				relationships: relationships
			});
		});

		return {
			meta: { total: resp.hits.total },
			data: data,
			included: included
		};
	});
};

exports.getOne = options => {
	return es.get({
		index: 'mbc',
		type: 'order',
		id: options.params.order_id
	}).then(resp => {
		let included = [],
			relationships = {};

		let order = resp._source,
			customer = order.customer,
			lineItems = order.line_items,
			basket = order.basket;

		delete order.customer;
		delete order.line_items;
		delete order.basket;

		included.push({
			id: customer.shopify_id,
			type: 'customers',
			attributes: customer
		});

		relationships.customer = {
			data: { 
				type: 'customers', 
				id: customer.shopify_id
			}
		};

		lineItems.forEach(item => {
			included.push({
				id: item.id,
				type: 'items',
				attributes: item
			});
			let datum = { type: 'items', id: item.id };
			if (relationships.hasOwnProperty('line_items')) {
				relationships.line_items.data.push(datum);
			} else {
				relationships.line_items = { data: [datum] };
			}
		});

		if (basket) {
			basket.forEach(product => {
				included.push({
					id: product.upc,
					type: 'products',
					attributes: product
				});
				let datum = { type: 'products', id: product.upc };
				if (relationships.hasOwnProperty('basket')) {
					relationships.basket.data.push(datum);
				} else {
					relationships.basket = { data: [datum] };
				}
			});
		}

		let data = {
			id: resp._id,
			type: 'orders',
			attributes: order,
			relationships: relationships
		};

		return {
			data: data,
			included: included
		};
	});
};

exports.updateOne = options => {
	return es.update({
		index: 'mbc',
		type: 'order',
		id: options.params.order_id,
		body: {
			doc: {
				invoice_id: options.body.data.attributes.invoice_id,
				basket: options.body.data.basket.map(d => d.data.attributes)
			}
		}
	}).then(resp => {
		return options.body;
	});
};