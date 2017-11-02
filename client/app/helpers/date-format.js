import Ember from 'ember';

/* global d3 */

export default Ember.Helper.helper(([date]) => formatTime(date));

let formatTime = d3.timeFormat('%d %b %Y');