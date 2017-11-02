import Ember from 'ember';
import OAuth2Bearer from 'ember-simple-auth/authorizers/oauth2-bearer';

const { get } = Ember;

export default OAuth2Bearer.extend({
	session: Ember.inject.service(),

	authorize(sessionData, block) {
		if (get(this, 'session.isAuthenticated') && !Ember.isEmpty(sessionData.access_token)) {
			block('Authorization', `Bearer ${sessionData.access_token}`);
			block('X-Company-Id', sessionData.realmId);
		}
	}
});
