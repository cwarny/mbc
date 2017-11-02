module.exports = {
	port: process.env.HTTPS_PORT,
	es: {
		url: process.env.PROD_ES
	},
	qb: {
		clientId: process.env.PROD_QB_CLIENT_ID,
		clientSecret: process.env.PROD_QB_CLIENT_SECRET,
		webhooksVerifier: process.env.PROD_QB_WEBHOOKS_VERIFIER_TOKEN
	},
	shopify: {
		apiKey: process.env.PROD_SHOPIFY_API_KEY,
		password: process.env.PROD_SHOPIFY_PASSWORD,
		webhooksVerifier: process.env.PROD_SHOPIFY_WEBHOOKS_VERIFIER_TOKEN
	}
}