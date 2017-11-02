# MBC

## Data

* Get data: `python get_data.py`

## QB Loading

* `python3.5 delete_qb_customers.py`
* `python3.5 delete_qb_inventory.py`
* `python3.5 get_data.py`
* 


## Notes

* Inventory in QB:

Create the following hierarchy of categories:

Bra
	Size
		Brand
			Color
				Season
Panty
	Size
		Brand
			Color
				Season

Then place each inventory item under one of the leaves. When retrieving an inventory item, grab its category, and use the category's FullyQualifiedName to get the details about the item.

* Orders:
	* subtotal_price = total_line_items_price - total_discounts
	* total_price = subtotal_price + total_tax
	* created_at = processed_at
	* One of variant_id and variant_title have to be populated, but never at the same time
	* variant_id and product_id are a 1-to-1 mapping (isomorphous)

## Questions

* Difference between "refunded and restocked" and just "refunded"?
* Why choice between "every 31 days" subscription and "every 30 days" subscription?
* What's an SKU of 1 for a line item in an order?
* "recurring_price"?
* How is a sale reported in Shopify right now?