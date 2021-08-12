(async () => {

    const DeNsResolver = require('./index');

    let resolver = new DeNsResolver();

    //Basic domain demo
    console.log('Domain endpoint', await resolver.resolveAddress('qip'));

    //Subdomain support
    console.log('Domain data', await resolver.resolveDomainData('test/qip'));

})()