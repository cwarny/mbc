import requests
import json
import csv
from itertools import chain
from math import ceil
from util import process_customer, process_line_item, shopify2quickbooks4customer, shopify2quickbooks4product
from quickbooks import QuickbooksClient

hostname = 'mybra-concierge.myshopify.com'
username = '377500fd3caa5e1eaaede502d71020be'
password = '95f9f79512bb86157489655f6e701d1f'

r = requests.get('https://%s/admin/customers.json' % hostname, auth=(username,password), params={'limit': 250})
jsn = r.json()

with open('qb_config.json') as infile:
	config = json.load(infile)
	qb = QuickbooksClient(**config)
	client = qb.connect()

headers = {
	'content-type': 'application/json', 
	'accept': 'application/json'
}

customers = {}

with open('data/customers.json', 'w') as outfile:
	for cust in jsn['customers']:
		c = process_customer(cust)
		qb_cust = shopify2quickbooks4customer(c)
		if qb_cust:
			r = client.post('https://quickbooks.api.intuit.com/v3/company/123145763725199/customer', data=json.dumps(qb_cust), headers=headers)
			resp = r.json()
			if 'Customer' in resp:
				c['quickbooks_id'] = resp['Customer']['Id']
				customers[c['shopify_id']] = c['quickbooks_id']
				outfile.write(json.dumps(c) + '\n')

r = requests.get('https://%s/admin/orders.json' % hostname, auth=(username,password), params={'limit': 250, 'status': 'any'})
jsn = r.json()

with open('data/orders.json', 'w') as outfile:
	for order in jsn['orders']:
		order['total_price'] = float(order['total_price'])
		order['subtotal_price'] = float(order['subtotal_price'])
		order['total_tax'] = float(order['total_tax'])
		order['total_discounts'] = float(order['total_discounts'])
		order['total_line_items_price'] = float(order['total_line_items_price'])
		order['total_price_usd'] = float(order['total_price_usd'])
		order['tags'] = [tag.strip() for tag in order['tags'].split(',')]

		if 'customer' in order:
			order['customer'] = process_customer(order['customer'])
			if order['customer']['shopify_id'] not in customers:
				continue
			order['customer']['quickbooks_id'] = customers[order['customer']['shopify_id']]

		for line_item in order['line_items']:
			process_line_item(line_item)

		for refund in order['refunds']:
			for refund_line_item in refund['refund_line_items']:
				process_line_item(refund_line_item['line_item'])

			for trx in refund['transactions']:
				trx['amount'] = float(trx['amount'])

		for fulfillment in order['fulfillments']:
			for line_item in fulfillment['line_items']:
				process_line_item(line_item)

		for shipping_line in order['shipping_lines']:
			shipping_line['price'] = float(shipping_line['price'])

		order = { k:v for k,v in order.items() if v }
		
		outfile.write(json.dumps(order) + '\n')

with open('data/bras.csv') as brafile, open('data/panties.csv') as pantyfile, open('data/other.csv') as otherfile, open('data/products.json', 'w') as outfile:
	reader = chain(csv.DictReader(brafile), csv.DictReader(pantyfile), csv.DictReader(otherfile))

	for row in reader:
		row = { k: v.strip() for k,v in row.items() }

		product = {
			'upc': row['UPC'],
			'brand': row['Brand'],
			'style': row['Style'],
			'item_type': row['Item Type'],
			'range': row['Range'],
			'description': row['Description'],
			'color': row['Colour'],
			'season': row['Season']
		}

		if not row['MBC Current qty']:
			continue
		else:
			product['quantity'] = int(row['MBC Current qty'])

		if row[' US$ WHSL ']:
			product['whsl'] = float(row[' US$ WHSL '][1:])

		if row[' US$ MSRP ']:
			try:
				product['msrp'] = float(row[' US$ MSRP '][1:])
			except ValueError:
				pass

		if row['Discontinued/ Unavailable?']:
			product['discontinued'] = True
		else:
			product['discontinued'] = False

		if row['SIZE \nACTUAL PANTY TO PULL']:
			if 'MBC Type' in row:
				product['type'] = 'panty'
				product['panty_size'] = row['SIZE \nACTUAL PANTY TO PULL']

				if 'Size\nUSE IF PANTIES' in row:
					product['adjusted_panty_size'] = row['Size\nUSE IF PANTIES']

				product['category'] = row['MBC Type']
			else:
				product['type'] = 'other'
				product['size'] = row['Size\nUSE IF PANTIES']
		else:
			product['type'] = 'bra'
			product['cup_size'] = row['Cup\nACTUAL CUP TO PULL']
			product['adjusted_cup_size'] = row['Adjusted Cup\nFILTER WITH THIS COLUMN']

			if row['Back\nACTUAL BAND TO PULL']:
				product['band_size'] = int(row['Back\nACTUAL BAND TO PULL'])

			if row['Adjusted Band\nUSE THIS ONE']:
				product['adjusted_band_size'] = row['Adjusted Band\nUSE THIS ONE']
				product['adjusted_band_size_int'] = int(row['Adjusted Band\nUSE THIS ONE'])

			if 'MBC Survey Primary ID' in row and row['MBC Survey Primary ID']:
				product['category'] = row['MBC Survey Primary ID']

			if 'MBC Survey Second ID' in row and row['MBC Survey Second ID']:
				product['subcategory'] = row['MBC Survey Second ID']

			if 'Fit Similar To' in row and row['Fit Similar To'] and row['Fit Similar To'] not in ['#N/A','0']:
				product['similar_fit'] = [ e.strip() for e in row['Fit Similar To'].split(',') ]

			if row['Coverage Options'] and row['Coverage Options'] not in ['#N/A','0']:
				product['style_coverage'] = [ e.strip() for e in row['Coverage Options'].split(',') ]

			if row['Pattern Options'] and row['Pattern Options'] not in ['#N/A','0']:
				product['style_design'] = [ e.strip() for e in row['Pattern Options'].split(',') ]

			if row['Style Options'] and row['Style Options'] not in ['#N/A','0']:
				product['style_wardrobe'] = [ e.strip() for e in row['Style Options'].split(',') ]

			if row['Vertical Fullness Fit'] and row['Vertical Fullness Fit'] not in ['#N/A','0']:
				product['vertical_fullness_fit'] = [ e.strip() for e in row['Vertical Fullness Fit'].split(',') ]

			if row['Root Width Fit'] and row['Root Width Fit']:
				product['root_width_fit'] = row['Root Width Fit']

			if 'Placement Spread (Gore)' in row and row['Placement Spread (Gore)']:
				product['placement_spread'] = row['Placement Spread (Gore)']

			if row['Projected']:
				product['projected'] = row['Projected'].strip()

			if 'Matching Panty' in row and row['Matching Panty'] and row['Matching Panty'] not in ['#N/A','0']:
				product['matching_panties'] = [ e.strip() for e in row['Matching Panty'].split(',') ]

			if 'Hook Notes' in row and row['Hook Notes']:
				product['hook_notes'] = row['Hook Notes']

			if 'Notes' in row and row['Notes']:
				product['notes'] = row['Notes']

		product = { k:v for k,v in product.items() if v is not None and v not in ['#N/A','0'] }

		# Don't upload empty inventory
		if product['quantity'] == 0:
			continue

		qb_prod = shopify2quickbooks4product(product)

		payload = {
			'BatchItemRequest': [
				{ 'bId': 'bid0', 'Query': 'select * from Account where Name = \'%s - Expense\'' % product['brand'] },
				{ 'bId': 'bid1', 'Query': 'select * from Account where Name = \'%s - Asset\'' % product['brand'] },
				{ 'bId': 'bid2', 'Query': 'select * from Account where Name = \'%s - Revenue\'' % product['brand'] }
			]
		}

		r = client.post('https://quickbooks.api.intuit.com/v3/company/123145763725199/batch', data=json.dumps(payload), headers=headers)
		resp = r.json()

		qb_prod['ExpenseAccountRef'] = { 'value': resp['BatchItemResponse'][0]['QueryResponse']['Account'][0]['Id'] }
		qb_prod['AssetAccountRef'] = { 'value': resp['BatchItemResponse'][1]['QueryResponse']['Account'][0]['Id'] }
		qb_prod['IncomeAccountRef'] = { 'value': resp['BatchItemResponse'][2]['QueryResponse']['Account'][0]['Id'] }

		if qb_prod:
			r = client.post('https://quickbooks.api.intuit.com/v3/company/123145763725199/item?minorversion=4', data=json.dumps(qb_prod), headers=headers)
			resp = r.json()
			if 'Item' in resp:
				product['quickbooks_id'] = resp['Item']['Id']
				outfile.write(json.dumps(product) + '\n')
