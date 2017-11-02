const es = require('../../util/es');

exports.get = options => {
	return es.search({
		index: 'mbc',
		type: 'customer',
		body: {
			query: {
				bool: {
					must: {
						match_all: {}
					}
				}
			}
		}
	}).then(resp => {
		return {
			meta: {
				total: resp.hits.total
			},
			data: resp.hits.hits.map(d => ({
				id: d._id,
				type: 'customers',
				attributes: d._source
			}))
		};
	});
};

exports.getOne = options => {
	return Promise.all([
		es.get({
			index: 'mbc',
			type: 'customer',
			id: options.params.customer_id
		}),
		this.getCustomerOrders(options)
	]).then(([customer, orders]) => ({
		data: {
			id: customer._id,
			type: 'customers',
			attributes: customer._source,
			relationships: orders.data.map(order => ({ 
				id: order.id, 
				type: order.type 
			}))
		},
		included: orders.data.map(order => ({
			id: order.id,
			type: order.type,
			attributes: order.attributes,
			relationships: order.relationships
		}))
	}));
};

exports.getCustomerOrders = options => {
	return es.search({
		index: 'mbc',
		type: 'order',
		body: {
			size: 10,
			sort: [
				{ created_at: { order: 'desc' } }
			],
			query: {
				term: {
					'customer.id': options.params.customer_id
				}
			}
		}
	}).then(resp => ({
		data: resp.hits.hits.map(d => {
			let customer_id = d._source.customer.id;
			delete d._source.customer;
			return {
				id: d._id,
				type: 'orders',
				attributes: d._source,
				relationships: {
					customer: {
						data: { 
							type: 'customers', 
							id: customer_id
						}
					}
				}
			};
		})
	}));
};