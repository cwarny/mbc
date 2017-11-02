import Ember from 'ember';
import DS from 'ember-data';

let { underscore } = Ember.String;

export default DS.JSONAPISerializer.extend({
	keyForAttribute(attr) {
		return underscore(attr);
	},
	
	keyForRelationship(rawKey) {
		return underscore(rawKey);
	}
});