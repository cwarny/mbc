import re
import json
from datetime import datetime as dt

def process_customer(cust):
	patt = re.compile('\$(\d+) ?- ?\$(\d+)')
	
	if 'note' in cust and cust['note']:
		note = json.loads(cust['note'])
		cust.update(note)

		del cust['note']

		m = patt.match(cust['allowance_bra'])
		cust['allowance_bra'] = {
			'min': int(m.group(1)), 
			'max': int(m.group(2))
		}

		m = patt.match(cust['allowance_panty'])
		cust['allowance_panty'] = {
			'min': int(m.group(1)), 
			'max': int(m.group(2))
		}

		cust['shape_spread'] = int(cust['shape_spread'])
		
	if 'current_band_size_dd' in cust:
		if cust['current_band_size_dd']:
			cust['current_band_size_dd'] = int(cust['current_band_size_dd'])
		else:
			del cust['current_band_size_dd']

	cust['tags'] = [tag.strip() for tag in cust['tags'].split(',')]

	for tag in cust['tags']:
		if 'age' in tag:
			age = tag.split('-')[1]
			try:
				cust['age'] = int(age)
			except ValueError:
				pass
		if 'how' in tag:
			how = tag.split('-')[1]
			cust['how'] = how

	cust['total_spent'] = float(cust['total_spent'])
	
	if 'checkout_frequency' in cust:
		if cust['checkout_frequency']:
			try:
				cust['checkout_frequency'] = int(cust['checkout_frequency'])
				cust['recurring'] = True
			except ValueError:
				del cust['checkout_frequency']
				cust['recurring'] = False
		else:
			del cust['checkout_frequency']

	if 'style_wardbrobe' in cust:
		cust['style_wardrobe'] = cust['style_wardrobe'].split(',')

	if 'style_coverage' in cust:
		cust['style_coverage'] = cust['style_coverage'].split(',')

	if 'style_design' in cust:
		cust['style_design'] = cust['style_design'].split(',')

	if 'style_bottom' in cust:
		cust['style_bottom'] = cust['style_bottom'].split(',')

	if 'style_top' in cust:
		cust['style_top'] = cust['style_top'].split(',')

	if 'like_fit' in cust:
		cust['like_fit'] = cust['like_fit'].split(',')

	cust['shopify_id'] = cust.pop('id')

	cust = { k:v for k,v in cust.items() if v }

	return cust

def process_line_item(line_item):
	line_item['price'] = float(line_item['price'])
	if 'total_discount' in line_item:
		line_item['total_discount'] = float(line_item['total_discount'])

	if 'tax_lines' in line_item:
		for tax_line in line_item['tax_lines']:
			tax_line['price'] = float(tax_line['price'])

	for prop in line_item['properties']:
		line_item[prop['name']] = prop['value']
	
	del line_item['properties']
	
	if 'shipping_interval_frequency' in line_item:
		line_item['shipping_interval_frequency'] = int(line_item['shipping_interval_frequency'])
	if 'charge_delay' in line_item:
		line_item['charge_delay'] = int(line_item['charge_delay'])
	if 'recurring_price' in line_item:
		line_item['recurring_price'] = float(line_item['recurring_price'])
	if 'number_charges_until_expiration' in line_item:
		line_item['number_charges_until_expiration'] = int(line_item['number_charges_until_expiration'])

def shopify2quickbooks4customer(jsn):
	customer = {}
	
	if 'default_address' not in jsn:
		return None
	
	addr = { k:v for k,v in jsn['default_address'].items() if v }
	
	physical_address = {}
	if 'address1' in addr:
		physical_address['Line1'] = addr['address1']
	if 'address2' in addr:
		physical_address['Line2'] = addr['address2']
	if 'city' in addr:
		physical_address['City'] = addr['city']
	if 'country' in addr:
		physical_address['Country'] = addr['country']
	if 'province_code' in addr:
		physical_address['CountrySubDivisionCode'] = addr['province_code']
	if 'zip' in addr:
		physical_address['PostalCode'] = addr['zip']
	
	customer['BillAddr'] = customer['ShipAddr'] = physical_address
	
	if 'first_name' in addr:
		customer['GivenName'] = addr['first_name']
	elif 'first_name' in jsn:
		customer['GivenName'] = jsn['first_name']
	if 'last_name' in addr:
		customer['FamilyName'] = addr['last_name']
	elif 'last_name' in jsn:
		customer['FamilyName'] = jsn['last_name']
	
	if 'phone' in addr:
		customer['PrimaryPhone'] = { 'FreeFormNumber': addr['phone'] }
	
	if 'email' in jsn:
		customer['PrimaryEmailAddr'] = { 'Address': jsn['email'] }
	elif 'user_email' in jsn:
		customer['PrimaryEmailAddr'] = { 'Address': jsn['user_email'] }
	
	customer['Notes'] = jsn['shopify_id']
	
	return customer

def shopify2quickbooks4product(jsn):
	item = {}

	if jsn['type'] == 'panty':
		name = 'Panty {brand} {style} {color} {panty_size}'.format(**jsn)
	elif jsn['type'] == 'bra':
		name = 'Bra {brand} {style} {color} {cup_size} {band_size}'.format(**jsn)
	else:
		name = 'Other {brand} {style} {color} {size}'.format(**jsn)

	item['Name'] = name
	if 'description' in jsn:
		item['Description'] = jsn['description']
	
	item['Sku'] = jsn['upc']
	
	item['Type'] = 'Inventory'
	
	if 'msrp' in jsn:
		item['UnitPrice'] = jsn['msrp']
	if 'style' in jsn:
		item['PurchaseDesc'] = jsn['style']
	if 'whsl' in jsn:
		item['PurchaseCost'] = jsn['whsl']
	
	item['TrackQtyOnHand'] = True
	
	item['SubItem'] = False

	if 'discontinued' in jsn and jsn['discontinued']:
		item['Active'] = False

	item['InvStartDate'] = dt.strftime(dt.now(), '%Y-%m-%d')
	if 'quantity' in jsn:
		item['QtyOnHand'] = jsn['quantity']

	return item