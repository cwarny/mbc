import DS from 'ember-data';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
import config from '../config/environment';

export default DS.JSONAPIAdapter.extend(DataAdapterMixin, {
	host: 'https://mybraconcierge.herokuapp.com',
	// host: 'http://localhost:7000',
	namespace: 'api',
	authorizer: 'authorizer:torii'
});