import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
	model(params, transition) {
		return this.store.findRecord('customer', params.customer_id);
	}
});