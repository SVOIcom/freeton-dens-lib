/*
  _____ ___  _   ___        __    _ _      _
 |_   _/ _ \| \ | \ \      / /_ _| | | ___| |_
   | || | | |  \| |\ \ /\ / / _` | | |/ _ \ __|
   | || |_| | |\  | \ V  V / (_| | | |  __/ |_
   |_| \___/|_| \_|  \_/\_/ \__,_|_|_|\___|\__|
 */
/**
 * @name FreeTON browser wallet and injector
 * @copyright SVOI.dev Labs - https://svoi.dev
 * @license Apache-2.0
 * @version 1.0
 */

(() => {
    let isANodejs = typeof process === 'object';

    /**
     * Async JSONP
     * @async
     * @param url
     * @param callback
     * @returns {Promise<unknown>}
     */
    const _jsonp = (url, callback = "jsonpCallback_" + String(Math.round(Math.random() * 100000))) => {
        return new Promise((resolve, reject) => {
            try {
                let script = document.createElement("script");

                window[callback] = function (data) {
                    window[callback] = undefined;
                    resolve(data);
                };
                script.src = `${url}&callback=${callback}`;
                document.body.appendChild(script);
            } catch (e) {
                reject(e);
            }
        });
    }

    /**
     * Fetch-based request
     * @param url
     * @returns {Promise<any>}
     * @private
     */
    const _fetchJSON = async (url) => {
        let _resolvedFetch = typeof fetch === 'undefined' ? require('node-fetch') : fetch;
        return await ((await _resolvedFetch(url))).json();
    }

    /**
     * Unified request
     * @param url
     * @returns {Promise<unknown|*>}
     */
    const request = async (url) => {
        if(!isANodejs) {
            return await _jsonp(url);
        }

        return _fetchJSON(url);
    }

    class DeNsResolver {
        constructor(testnet = false) {
            this.testnet = testnet;
        }

        /**
         * Internal domain request
         * @param {string} domain
         * @returns {Promise<*>}
         * @private
         */
        async _requestDomain(domain) {
            return await request(`https://freeton.domains/queryPretty?domain=${encodeURIComponent(domain)}&testnet=${this.testnet ? 'true' : 'false'}`);

        }

        /**
         * Resolve domain endpoint address
         * @param {string} domain
         * @returns {Promise<string>}
         */
        async resolveAddress(domain) {
            let data = await this._requestDomain(domain);

            if(!data.whois.endpointAddress) {
                throw new Error('Domain not found');
            }

            if(data.whois.endpointAddress === '-') {
                throw new Error('Domain endpoint not specified');
            }

            return data.whois.endpointAddress;
        }

        /**
         * Returns all domain info
         * @param domain
         * @returns {Promise<*>}
         */
        async resolveDomainData(domain) {
            let data = await this._requestDomain(domain);

            if(data.result !== 'OK') {
                throw new Error('Domain not found');
            }

            return data.whois;
        }

    }

    if(isANodejs) {
        module.exports = DeNsResolver
    } else {
        window.DeNsResolver = DeNsResolver;
    }


})()
