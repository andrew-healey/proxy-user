const request = require("request-promise");
const promiseProxy = require("./pubproxy");

const POSTBIN_URL = "http://postb.in/1560552860304-0136323836632";

/**
 *
 * @param {Number} requestsPerProxy An integer representing the number of requests that each proxy can handle.
 */
const proxify = (requestsPerProxy = 5) => {
    let proxyList = [];
    let i = requestsPerProxy;
    let newRequest = async options => {
        if (i >= requestsPerProxy) {
            proxyList.shift();
            if (proxyList.length < 1) {
                console.log("Nothing in list, trying");
                proxyList = await promiseProxy();
                console.log("Hum");
            }
            i = 0;
            return await newRequest(options);
        }
        i++;
        // console.log(proxyList);
        return {
            ...options,
            proxy: `http://${proxyList[0].ipPort}`
        };
    };
    return newRequest;
};

console.log("\n".repeat(5));

module.exports={pubProxy};
