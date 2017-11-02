import Ember from 'ember';

let { get, set, observer, A } = Ember;

export default Ember.TextField.extend({
	attributeBindings: ['autofocus'],
	autofocus: true,
	classNames: ['permafocus'],

	focusOut() {
		this.$().focus();
	},

	input(evt) {
		get(this, 'task').perform(evt.currentTarget.value);
	}
});