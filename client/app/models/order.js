import Ember from 'ember';
import DS from 'ember-data';

const { computed, get, getProperties, isEmpty } = Ember;
const { empty } = computed;
const { attr, belongsTo, hasMany } = DS;

export default DS.Model.extend({
	orderNumber: attr('number'),
	createdAt: attr('date'),
	customer: belongsTo('customer'),
	financialStatus: attr('string'),
	fulfillmentStatus: attr('string'),
	totalPrice: attr('number'),
	lineItems: hasMany('item'),
	basket: hasMany('product'),
	invoiceId: attr('string')
});