module.exports = {
	es: {
		url: process.env.DEV_ES || 'http://localhost:9200'
	},
	qb: {
		clientId: process.env.PROD_QB_CLIENT_ID,
		clientSecret: process.env.PROD_QB_CLIENT_SECRET
	},
	se: {
		apiKey: process.env.PROD_SHIPPINGEASY_API_KEY,
		apiSecret: process.env.PROD_SHIPPINGEASY_API_SECRET
	},
	port: process.env.HTTP_PORT
}