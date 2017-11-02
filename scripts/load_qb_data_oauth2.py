from quickbooks import QuickbooksClient
import json
from util import shopify2quickbooks4customer

def generate_customers():
	with open('data/customers.json') as infile:
		for line in infile:
			jsn = { k:v for k,v in json.loads(line).items() if v }
			cust = shopify2quickbooks4customer(jsn)
			if cust:
				yield cust

def generate_products():
	

customers = generate_customers()

payload = {
	'BatchItemRequest': [
		{
			'operation': 'create',
			'bId': 'bid%i' % i,
			'Customer': c
		}
		for i,c in enumerate(customers)
	]
}

headers = {
	'content-type': 'application/json', 
	'accept': 'application/json'
}

with open('qb_config.json') as infile:
	config = json.load(infile)
	qb = QuickbooksClient(**config)
	client = qb.connect()

r = client.post('https://quickbooks.api.intuit.com/v3/company/123145763725199/batch', data=json.dumps(payload), headers=headers)



