const config = require('../../config'),
	es = require('../../util/es'),
	{ httpRequest } = require('../../util/http'),
	querystring = require('querystring'),
	_ = require('lodash'),
	{ item2product } = require('../../util');

exports.get = options => {
	let filter = options.query.filter;

	let query = {
		bool: {
			must: {
				match_all: {}
			},
			filter: {
				bool: {
					must: []
				}
			}
		}
	};

	let fields = ['brand', 'season', 'color', 'style', 'adjusted_cup_size', 'adjusted_band_size', 'range', 'category', 'subcategory', 'style_coverage', 'style_design', 'style_wardrobe', 'vertical_fullness_fit', 'root_width_fit', 'placement_spread', 'projected'];

	fields.forEach(field => {
		if (filter[field]) {
			let f = { terms: {} };
			f.terms[`${field}.raw`] = filter[field];
			query.bool.filter.bool.must.push(f);
		}
	});
		
	return es.search({
		index: 'mbc',
		type: 'product',
		body: {
			size: 10,
			from: 10*((+filter.page)-1),
			query: query
		}
	}).then(resp => ({
		meta: {
			total: resp.hits.total
		},
		data: resp.hits.hits.map(hit => ({
			id: hit._id,
			type: 'products',
			attributes: hit._source
		}))
	}));
};

exports.getUniqueValues = options => {
	let aggs = {};

	let { item_type, filter, prefix } = options.query;

	if (prefix || !_.isEmpty(filter)) {
		aggs.filtered = {
			filter: {
				bool: {
					must: []
				}
			},
			aggs: {}
		};

		if (prefix) {
			aggs.filtered.filter.bool.must.push({ match_phrase_prefix: {} });
			aggs.filtered.filter.bool.must[0].match_phrase_prefix[item_type] = options.query.prefix;
		}

		if (!_.isEmpty(filter)) {
			_.toPairs(filter).forEach(([key, value]) => {
				let f = { terms: {} };
				f.terms[`${key}.raw`] = value;
				aggs.filtered.filter.bool.must.push(f);
			});
		}

		aggs.filtered.aggs[item_type] = { terms: { field: `${item_type}.raw`, order : { _term : 'asc' } } };
	} else {
		aggs[item_type] = { terms: { field: `${item_type}.raw`, order : { _term : 'asc' } } };
	}

	return es.search({
		index: 'mbc',
		type: 'product',
		size: 0,
		body: {
			aggs: aggs
		}
	}).then(resp => {
		let buckets = resp.aggregations.filtered ? resp.aggregations.filtered[item_type].buckets : resp.aggregations[item_type].buckets;
		if (buckets.length) {
			return buckets.map(b => b.key);
		}
		return [];
	});
};

exports.getOne = options => {
	let qs = querystring.stringify({
		minorversion: 4,
		query: `select * from Item where Sku = \'${options.params.product_id}\'`
	});

	return httpRequest({
		hostname: 'quickbooks.api.intuit.com',
		path: `/v3/company/${options.get('X-Company-Id')}/query?${qs}`,
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Authorization': options.get('Authorization')
		}
	}).then(resp => {
		if (_.isEmpty(resp.QueryResponse)) {
			return { data: null }
		}
		let item = resp.QueryResponse.Item[0];
		return {
			data: {
				id: (+item.Sku),
				type: 'products',
				attributes: item2product(item)
			}
		};
	});
};

exports.updateOne = options => {
	let qs = querystring.stringify({
		minorversion: 4,
		query: `select * from Item  where Sku = \'${options.params.product_id}\'`
	});

	return httpRequest({
		hostname: 'quickbooks.api.intuit.com',
		path: `/v3/company/${options.get('X-Company-Id')}/query?${qs}`,
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Authorization': options.get('Authorization')
		} 
	}).then(resp => {
		resp.QueryResponse.Item[0].QtyOnHand = options.body.data.attributes.quantity;
		let data = JSON.stringify(resp.QueryResponse.Item[0]);
		return httpRequest({
			hostname: 'quickbooks.api.intuit.com',
			path: `/v3/company/${options.get('X-Company-Id')}/item`,
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization': options.get('Authorization')
			}
		}, data)
	}).then(() => {
		return options.body;
	});
};