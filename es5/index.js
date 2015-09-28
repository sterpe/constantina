"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var isString = require('lodash').isString;
var isObject = require('lodash').isObject;
var isArray = require('lodash').isArray;
var forEach = require('lodash').forEach;
var merge = require('lodash').merge;
var map = require('lodash').map;

module.exports = function ƒ(o) {
	var prefix = arguments.length <= 1 || arguments[1] === undefined ? "" : arguments[1];

	if (isString(o)) {
		return _defineProperty({}, o, prefix ? o + '@' + prefix : o);
	}
	if (isArray(o)) {
		return merge.apply(undefined, map(o, function (value, index) {
			return ƒ(value, prefix);
		}));
	}
	if (isObject(o)) {
		var _ret = (function () {
			var retval = {};
			forEach(o, function (value, key) {
				retval[key] = ƒ(value, prefix ? prefix + '.' + key : key);
			});
			return {
				v: retval
			};
		})();

		if (typeof _ret === 'object') return _ret.v;
	}
};
