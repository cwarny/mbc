import Ember from 'ember';

let { get, set, observer, A } = Ember;

export default Ember.Component.extend({
	dimension: 'customer-profile',
	dimensions: [
		{ label: 'Profile', component: 'customer-profile' },
		{ label: 'Style', component: 'customer-style' },
		{ label: 'Measurements', component: 'customer-measure' },
		{ label: 'Shape', component: 'customer-shape' },
		{ label: 'Surgery', component: 'customer-surgery' }
	]
});