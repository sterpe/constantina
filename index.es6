"use strict";

const isString = require('lodash').isString;
const isObject = require('lodash').isObject;
const isArray = require('lodash').isArray;
const forEach = require('lodash').forEach;
const merge = require('lodash').merge;
const map = require('lodash').map;

module.exports = function ƒ(o, prefix = "") {
	if (isString(o)) {
		return {
			[o]: prefix ? o + '@' + prefix : o
		};
	}
	if (isArray(o)) {
		return merge.apply(undefined, map(o, function (value, index) {
			return ƒ(value, prefix);
		}));
	}
	if (isObject(o)) {
		let retval = {};
		forEach(o, function (value, key) {
			retval[key] = ƒ(value, prefix ? prefix + '.' + key : key);
		});
		return retval;
	}
};
