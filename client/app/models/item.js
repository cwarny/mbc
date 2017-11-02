import Ember from 'ember';
import DS from 'ember-data';

const { get, computed } = Ember;
const { attr } = DS;

export default DS.Model.extend({
	name: attr('string'),
	type: computed('name', function() {
		return get(this, 'name').split('(')[0].trim();
	})
});