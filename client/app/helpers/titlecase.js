import Ember from 'ember';

export default Ember.Helper.helper(([value]) => {
	if (Ember.isEmpty(value)) return;
	return value.split(' ')
		.map(v => {
			let n = '';
			for (let c of v) {
				if (c == c.toUpperCase()) {
					n += ('' + c);
				} else {
					n += c;
				}
			}
			return n.charAt(0).toUpperCase() + n.substr(1).toLowerCase();
		})
		.join(' ');
});