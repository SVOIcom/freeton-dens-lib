# FreeTON DeNs domain resolve lib
Based on  Augual.TEAM DeNS

## Installation and usage

```shell
npm install freeton-dens-lib
```

Usage in Node.js

```javascript
const DeNsResolver = require('freeton-dens-lib');

let resolver = new DeNsResolver();

//Basic domain demo
console.log('Domain endpoint', await resolver.resolveAddress('qip'));

//Subdomain support
console.log('Domain data', await resolver.resolveDomainData('test/qip'));


```

Usage in browser

You can connect script directly with jsDelivr

```html
<script src="https://cdn.jsdelivr.net/npm/freeton-dens-lib/index.min.js"></script>
```

or connect index.js file in any way. No other libraries needed

```javascript
let resolver = new DeNsResolver();

//Basic domain demo
console.log('Domain endpoint', await resolver.resolveAddress('qip'));

//Subdomain support
console.log('Domain data', await resolver.resolveDomainData('test/qip'));


```