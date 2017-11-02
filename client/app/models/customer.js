import Ember from 'ember';
import DS from 'ember-data';

const { computed, get, getProperties, getWithDefault } = Ember;
const { attr, hasMany, belongsTo } = DS;

export default DS.Model.extend({
	quickbooksId: attr('string'),
	
	firstName: attr('string'),
	lastName: attr('string'),
	fullName: computed('firstName', 'lastName', function() {
		return `${get(this, 'firstName')} ${getWithDefault(this, 'lastName', '')}`;
	}),
	createdAt: attr('date'),
	totalSpent: attr('number'),

	email: attr('string'),
	defaultAddress: attr(),
	phone: attr('string'),

	recurring: attr('boolean'),
	orders: hasMany('order'),
	isHappy: attr('string'),
	age: attr('number'),
	likeFit: attr(),
	isPregnant: attr('boolean'),
	checkoutFrequency: attr('number'),
	allowanceBra: attr(),
	allowancePanty: attr(),
	currentManufacturer: attr('string'),

	surgeryAugmentation: attr('boolean'),
	surgeryMastectomy: attr('boolean'),
	surgeryMaleFemale: attr('boolean'),
	surgeryReduction: attr('boolean'),
	surgeryNone: attr('boolean'),
	
	currentCupSize: attr('string'),
	currentCupSizeDd: attr('string'),
	computedCupSize: attr('string'),
	currentBandSize: attr('number'),
	currentBandSizeDd: attr('number'),
	computedBandSize: attr('number'),
	currentPantSize: attr('number'),
	currentDressSize: attr('number'),
	computedSisterSize: attr('number'),

	currentSize: computed('currentCupSize', 'currentBandSize', function() {
		return `${get(this, 'currentCupSize').trim()}${get(this, 'currentBandSize')}`
	}),
	computedSize: computed('computedCupSize', 'computedBandSize', function() {
		return `${get(this, 'computedCupSize').trim()}${get(this, 'computedBandSize')}`
	}),
	
	shapeSpaceBetween: attr('number'),
	shapeFuller: attr('string'),
	shapeSpread: attr('number'),
	
	measureLying: attr('number'),
	measureWaist: attr('number'),
	measureTight: attr('number'),
	measureStanding: attr('number'),
	measureSnug: attr('number'),
	measureLeaning: attr('number'),
	
	styleCoverage: attr(),
	styleTop: attr(),
	styleDesign: attr(),
	styleWardrobe: attr(),
	styleBottom: attr()
});