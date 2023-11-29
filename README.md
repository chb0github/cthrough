# glass
This cache is very simple, and meant to be entirely transparent. It takes variable args and the cache is immutable. :

package.json:
```json
"dependencies" : {
  "cthrough" : "chb0github/cthrough"
}
```
usage:

Most basic:
```javascript
const cache = require('cthrough');

const myFunc = cache((someArg) => `{Math.random()} {someArg}`);
myFunc(arg)
```

```javascript
const cache = require('cthrough');

const myFunc = cache((secretId) => getFromAws(secretId), (keyId) => // return true on expired key);

myFunc("fooKey");
```



