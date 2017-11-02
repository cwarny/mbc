import Ember from 'ember';

const { get, set, A, computed } = Ember;

import { task, timeout } from 'ember-concurrency';

export default Ember.Controller.extend({
	session: Ember.inject.service(),

	scanned: A(),

	text: '',
	error: null,

	searchTask: task(function* (prefix) {
		set(this, 'error', null);
		if (Ember.isBlank(prefix)) { return []; }

		yield timeout(500);

		let product = yield get(this, 'store').findRecord('product', prefix);

		if (!product) {
			set(this, 'error', `No product found for UPC ${prefix}`);
		} else {
			get(this, 'scanned').unshiftObject({
				item: product, 
				task: get(this, 'uploadTask').perform(product)
			});
		}

		set(this, 'text', '');
	}).restartable(),

	uploadTask: task(function* (product) {
		product.incrementProperty('quantity');
		yield product.save();
	}),

	actions: {
		login() {
			this.get('session').authenticate('authenticator:torii', 'quickbooks-oauth2');
		},
		logout() {
			this.get('session').invalidate();
		}
	}
});