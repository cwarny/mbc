import Ember from 'ember';

/* global d3 */

export default Ember.Helper.helper(([value]) => value ? formatCurrency(value) : formatCurrency(0));

let formatCurrency = d3.format('($.2f')