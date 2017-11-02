from quickbooks import QuickbooksClient
import json
from util import shopify2quickbooks4product
from itertools import filterfalse, chain
import csv

with open('qb_config.json') as infile:
	config = json.load(infile)
	qb = QuickbooksClient(**config)
	client = qb.connect()

headers = {
	'content-type': 'application/json', 
	'accept': 'application/json'
}

def generate_query_results(q, size=25):
	r = client.get('https://quickbooks.api.intuit.com/v3/company/123145763725199/query', headers={'accept': 'application/json'}, params={'query': '%s maxresults %i' % (q, size)})
	query_response = r.json()['QueryResponse']
	if query_response:
		yield query_response
	while query_response and size == query_response['maxResults']:
		r = client.get('https://quickbooks.api.intuit.com/v3/company/123145763725199/query', headers={'accept': 'application/json'}, params={'query': '%s maxresults %i' % (q, size)})
		query_response = r.json()['QueryResponse']
		if query_response:
			yield query_response

query_results = generate_query_results('select * from Invoice')

for qr in query_results:
	payload = {
		'BatchItemRequest': [
			{
				'operation': 'delete',
				'bId': 'bid%i' % i,
				'Invoice': {
					'Id': inv['Id'],
					'SyncToken': inv['SyncToken']
				}
			}
			for i,inv in enumerate(qr['Invoice'])
		]
	}
	r = client.post('https://quickbooks.api.intuit.com/v3/company/123145763725199/batch', data=json.dumps(payload), headers=headers)
	print('delete', r.status_code)