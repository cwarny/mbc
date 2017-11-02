const { isValidPayload } = require('../../util'),
	es = require('../../util/es'),
	querystring = require('querystring'),
	_ = require('lodash'),
	{ httpRequest } = require('../../util/http'),
	{ refresh } = require('../../token/controller');

exports.handle = options => {
	const payload = JSON.stringify(options.body);
	const signature = options.get('intuit-signature');

	console.log(payload);

	return new Promise((resolve, reject) => {
		if (isValidPayload('qb', signature, payload)) {
			let notif = options.body.eventNotifications[0];

			let ops = _(notif.dataChangeEvent.entities)
				.groupBy('name')
				.mapValues(v => _(v)
					.groupBy('id')
					.mapValues(m => _.sortBy(m, 'lastUpdated'))
					.value()
				)
				.value();

			console.log(JSON.stringify(ops));
			
			return es.get({
				index: 'mbc',
				type: 'client',
				id: notif.realmId
			}).then(resp => {
				let qs = querystring.stringify({
					entities: _.uniq(notif.dataChangeEvent.entities.map(d => d.name)).join(','), 
					changedSince: resp._source.last_cdc_timestamp,
					minorversion: 4
				});

				return httpRequest({
					hostname: 'quickbooks.api.intuit.com',
					path: `/v3/company/${notif.realmId}/cdc?${qs}`,
					method: 'GET',
					headers: {
						'Content-Type': 'text/plain',
						'Accept': 'application/json',
						'Authorization': `Bearer ${resp._source.access_token}`
					}
				}).catch(reason => {
					console.log(reason);
					if (true) {
						return refresh({ 
							body: { 
								realmId: resp._id, 
								refresh_token: resp._source.refresh_token 
							} 
						}).then(resp => {
							return httpRequest({
								hostname: 'quickbooks.api.intuit.com',
								path: `/v3/company/${notif.realmId}/cdc?${qs}`,
								method: 'GET',
								headers: {
									'Content-Type': 'text/plain',
									'Accept': 'application/json',
									'Authorization': `Bearer ${resp._source.access_token}`
								}
							})
						});
					}
				});
			}).then(resp => {
				let queryResp = resp.CDCResponse[0].QueryResponse;

				console.log(JSON.stringify(queryResp));

				if (_.isEmpty(queryResp[0])) return;

				let entities = _(...queryResp)
					.merge()
					.mapValues(v => _(v)
						.groupBy('Id')
						.mapValues(m => _.sortBy(m, 'MetaData.LastUpdatedTime'))
						.value()
					)
					.value();

				console.log(JSON.stringify(entities));

				let merged = _.merge(ops, entities);

				let objects = _(merged)
					.mapValues(v => _(v)
						.values()
						.flatten()
						.filter(d => d.hasOwnProperty('operation'))
						.sortBy('lastUpdated')
						.value()
					)
					.omitBy(_.isEmpty)
					.value();

				if (_.isEmpty(objects)) return;

				console.log(JSON.stringify(objects));

				let promises = [];
				
				if (objects.hasOwnProperty('Item')) {
					objects.Item.forEach(item => {
						let es_op;
						if (item.operation === 'Delete') {
							es_op = es.delete({
								index: 'mbc',
								type: 'product',
								id: item.Sku
							});
						} else {
							es_op = es.update({
								index: 'mbc',
								type: 'product',
								id: item.Sku,
								body: {
									doc: { quantity: item.QtyOnHand }
								}
							});
						}
						promises.push(es_op);
					});
				}

				if (objects.hasOwnProperty('Invoice')) {
					objects.Invoice.forEach(invoice => {
						let es_op;
						if (invoice.operation === 'Delete') {
							es_op = es.search({
								index: 'mbc',
								type: 'order',
								body: {
									query: {
										bool: {
											must: {
												match_all: {}
											},
											filter: {
												bool: {
													must: {
														term: {
															invoice_id: invoice.id
														}
													}
												}
											}
										}
									}
								}
							}).then(resp => {
								let order = resp.hits.hits[0]._source;
								console.log(JSON.stringify(order));

								return es.update({
									index: 'mbc',
									type: 'order',
									id: order.id,
									body: {
										script: 'ctx._source.remove(\"invoice_id\"); ctx._source.remove(\"basket\")'
									}
								});
							});
						} else {
							es_op = es.search({
								index: 'mbc',
								type: 'order',
								body: {
									query: {
										bool: {
											must: {
												match_all: {}
											},
											filter: {
												bool: {
													must: {
														term: {
															order_number: (+invoice.DocNumber)
														}
													}
												}
											}
										}
									}
								}
							}).then(resp => {
								let order = resp.hits.hits[0]._source;
								console.log(JSON.stringify(order));
								order.invoice_id = invoice.id;

								return es.update({
									index: 'mbc',
									type: 'order',
									id: order.id,
									body: { doc: order }
								});
							});
						}

						promises.push(es_op);
					});
				}

				return promises.reduce((cur, next) => cur.then(next), Promise.resolve());
			}).then(() => {
				return es.update({
					index: 'mbc',
					type: 'client',
					id: notif.realmId,
					body: { doc: { last_cdc_timestamp: (new Date()).toISOString() } }
				});
			}).then(resolve).catch(reject);
		} else {
			reject();
		}
	});
};