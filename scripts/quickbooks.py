import requests
from requests_oauthlib import OAuth2Session
import json
import os.path

class QuickbooksClient:
	def __init__(self, client_id, client_secret, redirect_uri, scope, oauth2_url):
		self.client_id = client_id
		self.client_secret = client_secret
		self.redirect_uri = redirect_uri
		self.scope = scope
		self.oauth2_url = oauth2_url
		self.extra = { 'client_id': client_id, 'client_secret': client_secret }
		self.authorization_url = 'https://appcenter.intuit.com/connect/oauth2'

	def token_saver(self, token):
		with open('qb_token.json', 'w') as outfile:
			json.dump(token, outfile)

	def connect(self):
		if not os.path.isfile('qb_token.json'):
			oauth = OAuth2Session(self.client_id, redirect_uri=self.redirect_uri, scope=self.scope)
			authorization_url, state = oauth.authorization_url(self.authorization_url)
			print('Please go to %s and authorize access.' % authorization_url)
			authorization_response = input('Enter the full callback URL: ')
			token = oauth.fetch_token(self.oauth2_url, authorization_response=authorization_response, client_secret=self.client_secret)
			self.token_saver(token)
		else:
			with open('qb_token.json') as infile:
				token = json.load(infile)

		return OAuth2Session(self.client_id, token=token, auto_refresh_url=self.oauth2_url, auto_refresh_kwargs=self.extra, token_updater=self.token_saver)