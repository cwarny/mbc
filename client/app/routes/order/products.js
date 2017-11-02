import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
	queryParams: {
		brand: {
			refreshModel: true
		},
		season: {
			refreshModel: true
		},
		color: {
			refreshModel: true
		},
		style: {
			refreshModel: true
		},
		adjusted_cup_size: {
			refreshModel: true
		},
		adjusted_band_size: {
			refreshModel: true
		},
		page: {
			refreshModel: true
		},
		range: {
			refreshModel: true
		},
		category: {
			refreshModel: true
		},
		subcategory: {
			refreshModel: true
		},
		style_coverage: {
			refreshModel: true
		},
		style_design: {
			refreshModel: true
		},
		style_wardrobe: {
			refreshModel: true
		},
		vertical_fullness_fit: {
			refreshModel: true
		},
		root_width_fit: {
			refreshModel: true
		},
		placement_spread: {
			refreshModel: true
		},
		projected: {
			refreshModel: true
		}
	},

	afterModel(model, transition) {
		if (this.modelFor('order').get('invoiceId')) {
			this.transitionTo('order.index');
		}
	},

	model(params, transition) {
		return this.store.query('product', { filter: params });
	}
});
