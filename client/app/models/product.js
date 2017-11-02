import Ember from 'ember';
import DS from 'ember-data';

const { computed, get, getProperties } = Ember;
const { attr } = DS;

export default DS.Model.extend({
	itemType: attr('string'),
	description: attr('string'),
	brand: attr('string'),
	color: attr('string'),
	style: attr('string'),
	upc: attr('string'),
	quantity: attr('number'),
	season: attr('string'),
	adjustedBandSize: attr('number'),
	adjustedCupSize: attr('string'),
	size: computed('adjustedCupSize', 'adjustedBandSize', function() {
		let { adjustedBandSize, adjustedCupSize } = getProperties(this, 'adjustedBandSize', 'adjustedCupSize');
		if (adjustedBandSize && adjustedCupSize) return `${adjustedBandSize}${adjustedCupSize}`;
		return '';
	}),
	type: attr('string'),
	msrp: attr('number'),
	whsl: attr('number'),
	range: attr('string'),
	category: attr('string'),
	subcategory: attr('string'),
	styleCoverage: attr('string'),
	styleDesign: attr('string'),
	styleWardrobe: attr('string'),
	verticalFullnessFit: attr('string'),
	rootWidthFit: attr('string'),
	placementSpread: attr('string'),
	projected: attr('string'),
	quickbooksId: attr('string')
});