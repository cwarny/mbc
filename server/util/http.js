const https = require('https');

module.exports = {
	httpRequest: (params, data) => {
		return new Promise((resolve, reject) => {
			const req = https.request(params, res => {
				if (res.statusCode < 200 || res.statusCode >= 300) {
					return reject(new Error(res.statusMessage));
				}
				let body = [];
				res.on('data', chunk => {
					body.push(chunk);
				});
				res.on('end', () => {
					try {
						body = JSON.parse(Buffer.concat(body).toString());
					} catch(e) {
						reject(e);
					}
					resolve(body);
				});
			});

			req.on('error', err => {
				reject(err);
			});
			
			if (data) {
				req.write(data);
			}
			
			req.end();
		});
	},
	toHTTP: func => {
		return (req, res, next) => {
			func(req)
				.then(data => {
					res.send(data);
				})
				.catch(err => {
					next(err);
				});
		}
	}
};