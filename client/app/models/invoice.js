import Ember from 'ember';
import DS from 'ember-data';

const { get, computed } = Ember;
const { attr, belongsTo, hasMany } = DS;

export default DS.Model.extend({
	order: belongsTo('order'),
	// customerId: attr('string'),
	// products: hasMany('product')
});