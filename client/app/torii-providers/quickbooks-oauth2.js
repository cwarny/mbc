import {configurable} from 'torii/configuration';
import Oauth2 from 'torii/providers/oauth2-code';
import Ember from 'ember';

let {get} = Ember;

export default Oauth2.extend({
	name:    'quickbooks-oauth2',
	baseUrl: 'https://appcenter.intuit.com/connect/oauth2',

	// Additional url params that this provider requires
	requiredUrlParams: ['display'],

	responseParams: ['code', 'state', 'realmId'],

	scope: configurable('scope', 'email'),

	display: 'popup',
	redirectUri: configurable('redirectUri', function() {
		// A hack that allows redirectUri to be configurable
		// but default to the superclass
		return this._super();
	}),

	open(options) {
		let name = get(this, 'name'),
			url = this.buildUrl(),
			redirectUri = get(this, 'redirectUri'),
			responseParams = get(this, 'responseParams'),
			responseType = get(this, 'responseType'),
			state = get(this, 'state'),
			shouldCheckState = responseParams.indexOf('state') !== -1;

		return get(this, 'popup')
			.open(url, responseParams, options)
			.then(authData => {
				let missingResponseParams = [];
				responseParams.forEach(param => {
					if (authData[param] === undefined) {
						missingResponseParams.push(param);
					}
				});

				if (missingResponseParams.length) {
					throw new Error(`The response from the provider is missing these required response params: ${missingResponseParams.join(', ')}`);
				}

				if (shouldCheckState && authData.state !== state) {
					throw new Error(`The response from the provider has an incorrect session state param: should be '${state}', but is '${authData.state}'`);
				}

				return {
					authorizationCode: decodeURIComponent(authData[responseType]),
					provider: name,
					redirectUri: redirectUri,
					realmId: authData['realmId']
				};
			})
			.then(authData => {
				if (authData.authorizationCode && authData.authorizationCode === '200') {
					throw new Error('User canceled authorization');
				}
				return authData;
			});
	},

	fetch(data) {
		return data;
	}
});