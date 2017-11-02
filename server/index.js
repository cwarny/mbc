const config = require('./config'),
	express = require('express'),
	app = express();

app.set('port', (process.env.PORT || config.port));

require('./middleware')(app);

app.use('/api', require('./api'));
app.use('/token', require('./token'));
app.use('/webhooks', require('./webhooks'));

// app.use(require('./middleware/err')());

app.listen(app.get('port'), () => {
	console.log('node app running on port', app.get('port'));
});

module.exports = app;