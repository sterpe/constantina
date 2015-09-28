# constantina

Recursive, namespaced key mirror without `foo: null`.

`keymirror` is cool, recursive key mirrors are better, but 
I don't like that mess with `*: null`:

```
require('keymirror')({
	"foo": null,
	"bar": null,
	"baz": null
});

```

Recursive key-mirrors exist but none, to my knowledge, avoid the `null` stuff.

`constantina`s approach is different:

```javascript
var constantina = require('constantina');

constantina({
	"foo": ["bar", "baz"],
	"quux": "beep"
});

// or use this syntax...
constantina([
	{ "foo": ["bar", "baz"] },
	{ "quux": "beep"}
]);

// => { "foo": { "bar" : "bar@foo", "baz" : "baz@foo" }, "quux": { "beep": "beep@quux" } }
```


More examples:

```
$ node
> var f = require('constantina');
undefined
> f
[Function: ƒ]
> f({"foo": ["bar", "baz"], "quux": "beep"});
{ foo: { bar: 'bar@foo', baz: 'baz@foo' },
  quux: { beep: 'beep@quux' } }
> f([{foo: ["bar", "baz"]}, { "quux": "beep" }]);
{ foo: { bar: 'bar@foo', baz: 'baz@foo' },
  quux: { beep: 'beep@quux' } }
> f(["one", "two", "three"]);
{ one: 'one', two: 'two', three: 'three' }
> f({"foo": [{ "bar": ["one", "two", "three"]}, "baz", {"bazzier": "bazziest"}], "quux": {"beep": "boop"}});
{ foo: 
   { bar: 
      { one: 'one@foo.bar',
        two: 'two@foo.bar',
        three: 'three@foo.bar' },
     baz: 'baz@foo',
     bazzier: { bazziest: 'bazziest@foo.bazzier' } },
  quux: { beep: { boop: 'boop@quux.beep' } } }
> 
```

