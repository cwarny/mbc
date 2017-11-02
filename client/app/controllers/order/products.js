import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';

/* global _ */

const { get, computed, getProperties, A } = Ember;

export default Ember.Controller.extend({
	queryParams: [ { brand: { type: 'array' } }, { color: { type: 'array' } }, { season: { type: 'array' } }, { style: { type: 'array' } }, { adjusted_cup_size: { type: 'array' } }, { adjusted_band_size: { type: 'array' } }, { range: { type: 'array' } }, { category: { type: 'array' } }, { subcategory: { type: 'array' } }, { style_coverage: { type: 'array' } }, { style_design: { type: 'array' } }, { style_wardrobe: { type: 'array' } }, { vertical_fullness_fit: { type: 'array' } }, { root_width_fit: { type: 'array' } }, { placement_spread: { type: 'array' } }, { projected: { type: 'array' } }, 'page' ],

	ajax: Ember.inject.service(),
	
	brands: computed('season', 'color', 'style', 'cup', 'band', 'range', 'category', 'subcategory', 'style_coverage', 'style_design', 'style_wardrobe', 'vertical_fullness_fit', 'root_width_fit', 'placement_spread', 'projected', function () {
		return this.getUniqueValues('brand');
	}),
	seasons: computed('brand', 'color', 'style', 'cup', 'band', 'range', 'category', 'subcategory', 'style_coverage', 'style_design', 'style_wardrobe', 'vertical_fullness_fit', 'root_width_fit', 'placement_spread', 'projected', function () {
		return this.getUniqueValues('season');
	}),
	colors: computed('brand', 'season', 'style', 'cup', 'band', 'range', 'category', 'subcategory', 'style_coverage', 'style_design', 'style_wardrobe', 'vertical_fullness_fit', 'root_width_fit', 'placement_spread', 'projected', function () {
		return this.getUniqueValues('color');
	}),
	styles: computed('brand', 'season', 'color', 'cup', 'band', 'range', 'category', 'subcategory', 'style_coverage', 'style_design', 'style_wardrobe', 'vertical_fullness_fit', 'root_width_fit', 'placement_spread', 'projected', function () {
		return this.getUniqueValues('style');
	}),
	cups: computed('brand', 'season', 'color', 'style', 'band', 'range', 'category', 'subcategory', 'style_coverage', 'style_design', 'style_wardrobe', 'vertical_fullness_fit', 'root_width_fit', 'placement_spread', 'projected', function () {
		return this.getUniqueValues('adjusted_cup_size');
	}),
	bands: computed('brand', 'season', 'color', 'style', 'cup', 'range', 'category', 'subcategory', 'style_coverage', 'style_design', 'style_wardrobe', 'vertical_fullness_fit', 'root_width_fit', 'placement_spread', 'projected', function () {
		return this.getUniqueValues('adjusted_band_size');
	}),
	ranges: computed('brand', 'season', 'color', 'style', 'cup', 'band', 'category', 'subcategory', 'style_coverage', 'style_design', 'style_wardrobe', 'vertical_fullness_fit', 'root_width_fit', 'placement_spread', 'projected', function () {
		return this.getUniqueValues('range');
	}),
	categories: computed('brand', 'season', 'color', 'style', 'cup', 'band', 'range', 'subcategory', 'style_coverage', 'style_design', 'style_wardrobe', 'vertical_fullness_fit', 'root_width_fit', 'placement_spread', 'projected', function () {
		return this.getUniqueValues('category');
	}),
	subcategories: computed('brand', 'season', 'color', 'style', 'cup', 'band', 'range', 'category', 'style_coverage', 'style_design', 'style_wardrobe', 'vertical_fullness_fit', 'root_width_fit', 'placement_spread', 'projected', function () {
		return this.getUniqueValues('subcategory');
	}),
	coverages: computed('brand', 'season', 'color', 'style', 'cup', 'band', 'range', 'category', 'subcategory', 'style_design', 'style_wardrobe', 'vertical_fullness_fit', 'root_width_fit', 'placement_spread', 'projected', function () {
		return this.getUniqueValues('style_coverage');
	}),
	designs: computed('brand', 'season', 'color', 'style', 'cup', 'band', 'range', 'category', 'subcategory', 'style_coverage', 'style_wardrobe', 'vertical_fullness_fit', 'root_width_fit', 'placement_spread', 'projected', function () {
		return this.getUniqueValues('style_design');
	}),
	wardrobes: computed('brand', 'season', 'color', 'style', 'cup', 'band', 'range', 'category', 'subcategory', 'style_coverage', 'style_design', 'vertical_fullness_fit', 'root_width_fit', 'placement_spread', 'projected', function () {
		return this.getUniqueValues('style_wardrobe');
	}),
	fullnessFits: computed('brand', 'season', 'color', 'style', 'cup', 'band', 'range', 'category', 'subcategory', 'style_coverage', 'style_design', 'style_wardrobe', 'root_width_fit', 'placement_spread', 'projected', function () {
		return this.getUniqueValues('vertical_fullness_fit');
	}),
	rootFits: computed('brand', 'season', 'color', 'style', 'cup', 'band', 'range', 'category', 'subcategory', 'style_coverage', 'style_design', 'style_wardrobe', 'vertical_fullness_fit', 'placement_spread', 'projected', function () {
		return this.getUniqueValues('root_width_fit');
	}),
	spreads: computed('brand', 'season', 'color', 'style', 'cup', 'band', 'range', 'category', 'subcategory', 'style_coverage', 'style_design', 'style_wardrobe', 'vertical_fullness_fit', 'root_width_fit', 'projected', function () {
		return this.getUniqueValues('placement_spread');
	}),
	projectedOptions: computed('brand', 'season', 'color', 'style', 'cup', 'band', 'range', 'category', 'subcategory', 'style_coverage', 'style_design', 'style_wardrobe', 'vertical_fullness_fit', 'root_width_fit', 'placement_spread', function () {
		return this.getUniqueValues('projected');
	}),

	searchTask: task(function* (itemType, prefix) {
		if (Ember.isBlank(prefix)) { return []; }
		yield timeout(500);
		return this.getUniqueValues(itemType, prefix);
	}).restartable(),

	page: 1,
	resultsPerPage: 10,
	pages: computed('firstPage', 'totalPages', 'resultsPerPage', function() {
		let { firstPage, totalPages, resultsPerPage } = getProperties(this, 'firstPage', 'totalPages', 'resultsPerPage');
		let len = Math.min(totalPages-firstPage+1, 5);
		return _.range(firstPage, firstPage+len);
	}),
	firstPage: computed('page', 'resultsPerPage', {
		get() {
			let { page, resultsPerPage } = getProperties(this, 'page', 'resultsPerPage')
			return Math.floor((page-1)/5)*5+1;
		},
		set(key, value) {
			return value;
		}
	}),
	totalPages: computed('model.meta.total', function() {
		return Math.ceil(get(this, 'model.meta.total')/get(this, 'resultsPerPage'));
	}),

	getUniqueValues(itemType, prefix) {
		let itemTypes = ['brand', 'season', 'color', 'style', 'adjusted_cup_size', 'adjusted_band_size', 'range', 'category', 'subcategory', 'style_coverage', 'style_design', 'style_wardrobe', 'vertical_fullness_fit', 'root_width_fit', 'placement_spread', 'projected'].filter(d => d !== itemType);
		let filter = _.omitBy(getProperties(this, itemTypes), _.isEmpty);
		let adapter = get(this, 'store').adapterFor('application');
		let { host, namespace } = getProperties(adapter, 'host', 'namespace');
		return get(this, 'ajax').request(`${host}/${namespace}/products/unique`, { data: { item_type: itemType, prefix: prefix, filter: filter } });
	},

	actions: {
		incrementPage() {
			if (get(this, 'pages.lastObject') < get(this, 'totalPages')) {
				this.incrementProperty('firstPage', 5);
			} 
		},
		decrementPage() {
			if (get(this, 'pages.firstObject') > 1) {
				this.decrementProperty('firstPage', 5);
			}
		},
		setPage(p) {
			set(this, 'page', p);
		}
	}
});