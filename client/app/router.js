import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
	location: config.locationType,
	rootURL: config.rootURL
});

Router.map(function() {
	this.route('orders');
	this.route('order', { path: '/order/:order_id' }, function() {
		this.route('products');
	});
	this.route('customer', { path: '/customer/:customer_id' });
	this.route('products', function() {
		this.route('upload');
	});
});

export default Router;
