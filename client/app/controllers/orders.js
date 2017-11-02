import Ember from 'ember';

const { computed, get, getProperties } = Ember;

const { sort } = computed;

/* global _ */

export default Ember.Controller.extend({
	sortBy: 'createdAt',
	sortDir: 'desc',
	sort: computed('sortBy', 'sortDir', function() {
		return [`${get(this, 'sortBy')}:${get(this, 'sortDir')}`];
	}),

	sortedOrders: sort('model', 'sort')
});