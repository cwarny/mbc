import Ember from 'ember';

const { run, isEmpty, testing, computed } = Ember;

import ToriiAuthenticator from 'ember-simple-auth/authenticators/torii';
import config from '../config/environment';

/* global _ */

export default ToriiAuthenticator.extend({
	torii: Ember.inject.service(),
	ajax: Ember.inject.service(),

	tokenRefreshOffset: computed(function() {
		const min = 5, max = 10;
		return (Math.floor(Math.random() * (max - min)) + min) * 1000;
	}).volatile(),

	restore(data) {
		return this._super(...arguments).then(data => {
			const now = (new Date()).getTime();
			if (!isEmpty(data.expires_at) && data.expires_at < now) {
				return this._refreshAccessToken(data.expires_in, data.refresh_token, data.realmId);
			} else {
				this._scheduleAccessTokenRefresh(data.expires_in, data.expires_at, data.refresh_token, data.realmId);
				return data;
			}
		});
	},

	authenticate() {
		const ajax = this.get('ajax');
		const tokenExchangeUri = config.torii.providers['quickbooks-oauth2'].tokenExchangeUri;

		return this._super(...arguments).then(data => {
			return ajax.request(tokenExchangeUri, {
				type: 'POST',
				crossDomain: true,
				dataType: 'json',
				contentType: 'application/json',
				data: JSON.stringify(data)
			}).then(response => {
				response.provider = data.provider;
				response.realmId = data.realmId;

				const expiresAt = this._absolutizeExpirationTime(response.expires_in);
				this._scheduleAccessTokenRefresh(response.expires_in, expiresAt, response.refresh_token, response.realmId);
				if (!isEmpty(expiresAt)) {
					response = _.merge(response, { expires_at: expiresAt });
				}

				return response;
			});
		});
	},

	_refreshTokenTimeout: null,

	_absolutizeExpirationTime(expiresIn) {
		if (!isEmpty(expiresIn)) {
			return new Date((new Date().getTime()) + expiresIn * 1000).getTime();
		}
	},

	_refreshAccessToken(expiresIn, refreshToken, realmId) {
		const data = { grant_type: 'refresh_token', refresh_token: refreshToken, realmId: realmId };
		const tokenRefreshUri = config.torii.providers['quickbooks-oauth2'].tokenRefreshUri;

		return this.get('ajax').request(tokenRefreshUri, {
			type: 'POST',
			crossDomain: true,
			dataType: 'json',
			contentType: 'application/json',
			data: JSON.stringify(data)
		}).then(response => {
			expiresIn = response.expires_in || expiresIn;
			refreshToken = response.refresh_token || refreshToken;
			realmId = response.realmId || realmId;
			const expiresAt = this._absolutizeExpirationTime(expiresIn);
			const data = _.merge(response, { expires_in: expiresIn, expires_at: expiresAt, refresh_token: refreshToken, realmId: realmId, provider: 'quickbooks-oauth2' });
			this._scheduleAccessTokenRefresh(expiresIn, null, refreshToken, realmId);
			this.trigger('sessionDataUpdated', data);
			return data;
		});
	},

	_scheduleAccessTokenRefresh(expiresIn, expiresAt, refreshToken, realmId) {
		const now = (new Date()).getTime();
		if (isEmpty(expiresAt) && !isEmpty(expiresIn)) {
			expiresAt = new Date(now + expiresIn * 1000).getTime();
		}
		const offset = this.get('tokenRefreshOffset');
		if (!isEmpty(refreshToken) && !isEmpty(expiresAt) && expiresAt > now - offset) {
			run.cancel(this._refreshTokenTimeout);
			delete this._refreshTokenTimeout;
			if (!testing) {
				this._refreshTokenTimeout = run.later(this, this._refreshAccessToken, expiresIn, refreshToken, realmId, expiresAt - now - offset);
			}
		}
	}
});