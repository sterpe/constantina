const FILE = "../index.es6";

jest.dontMock('lodash');
jest.dontMock(FILE);

describe([
		"A function ƒ(o) which returns a"
		, "nested-recursive map of namespaced keys."
].join(" "), function () {
	it([
		"should return an object with the namespaced"
		, "key if given a string"
	].join(" "), function () {
		const ƒ = require(FILE);
		
		expect(ƒ("foo")).toEqual({
			foo: "foo"
		});
	});
	it([
			"should return a nested namespaced"
			, "object if given a simple object"
			, "with k-v pair"
	].join(" "), function () {
		const ƒ = require(FILE);

		expect(ƒ({ "foo": "bar" })).toEqual({
			"foo": {
				"bar": "bar@foo"
			}
		});
		expect(ƒ({
			foo: "bar"
			, baz: "quux"
		})).toEqual({
			foo: {
				bar: "bar@foo"
			}
			, baz: {
				quux: "quux@baz"
			}
		});
	});
	it([
		"should return a merged object of values"
		, "if given an array of values"
	].join(" "), function () {
		const ƒ = require(FILE);

		expect(ƒ(["foo", "bar"])).toEqual({
			foo: "foo"
			, bar: "bar"
		});
		expect(ƒ(["foo", {
			"bar": [ "baz", "quux" ]
		}])).toEqual({
			foo: "foo"
			, bar: {
				baz: "baz@bar"
				, quux: "quux@bar"
			}
		});
	});
	it([
		"should transform complex nested structures"
	].join(" "), function () {
		const ƒ = require(FILE);

		expect(ƒ({
			foo: [
				"bar"
				, {
					"quux": [
							"A"
							, {
								"B": "C"
								, "D": [ "F", "G"]
							}
							, "Q"
					]
				}
			]
			, "bar": "QQQQ"
		})).toEqual({
			foo: {
				bar: "bar@foo"
				, quux: {
					A: "A@foo.quux"
					, B: {
						C: "C@foo.quux.B"
					}
					, D: {
						F: "F@foo.quux.D"
						, G: "G@foo.quux.D"
					}
					, Q: "Q@foo.quux"
				}
			}
			, bar: {
				QQQQ: "QQQQ@bar"
			}
		});
	});
});
