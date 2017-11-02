import Ember from 'ember';
import { task } from 'ember-concurrency';

const { computed, get, set, getProperties, A, run } = Ember;

export default Ember.Controller.extend({
	session: Ember.inject.service(),

	checkout: task(function* () {
		let invoice = this.store.createRecord('invoice', {
			order: get(this, 'model'),
			customerId: get(this, 'model.customer.quickbooksId'),
			products: get(this, 'model.basket')
		});

		yield invoice.save()
			.then(data => {
				let order = get(this, 'model');
				set(order, 'invoiceId', get(data, 'id'));
				return order.save();
			})
			.then(data => {
				this.transitionToRoute('order');
				
				let adapter = get(this, 'store').adapterFor('application');
				let { host, namespace } = getProperties(adapter, 'host', 'namespace');
				let { access_token, realmId } = get(this, 'session.data.authenticated');

				return Ember.$.ajax({
					url: `${host}/${namespace}/invoices/${get(data,'invoiceId')}`,
					headers: {
						'Authorization': `Bearer ${access_token}`,
						'X-Company-Id': realmId,
					},
					xhrFields: {
						responseType: 'blob'
					}
				});
			}).then(data => {
				let blob = new Blob([data], {type: 'image/pdf'});
				let a = document.createElement('a');
				a.style = 'display: none';
				document.body.appendChild(a);
				let url = window.URL.createObjectURL(blob);
				a.href = url;
				a.download = 'invoice.pdf';
				a.click();
				window.URL.revokeObjectURL(url);
			});
	}).drop(), // 'Drop' ensures task cannot be relaunched while it is running

	actions: {
		addToBasket(product) {
			product.toggleProperty('picked');
			get(this, 'model.basket').pushObject(product);
		},
		removeFromBasket(product) {
			product.toggleProperty('picked');
			get(this, 'model.basket').removeObject(product);	
		}
	}
});