# mbc-server

## Elasticsearch

* Clear ES index: `curl -XDELETE localhost:9200/mbc`
* Set up ES index: `curl -XPUT localhost:9200/mbc -d @esconfig.json`
* If you want to sample the products: `gshuf -n 5000 data/products.json > data/sample_products.json`
* Prepare bulk load:
	* `cat data/customers.json | jq -c '{ index: { _index: "mbc", _type: "customer", _id: .shopify_id } }, .' > data/requests`
	* `cat data/orders.json | jq -c '{ index: { _index: "mbc", _type: "order", _id: .id } }, .' >> data/requests`
	* `cat data/products.json | jq -c '{ index: { _index: "mbc", _type: "product", _id: .upc } }, .' >> data/requests`
* Bulk load ES: `cat data/requests | parallel --pipe -N1000 'curl -s -XPOST localhost:9200/_bulk --data-binary @-' > data/bulk_results`
* Check everything loaded well: `cat data/bulk_results | jq '.errors'`