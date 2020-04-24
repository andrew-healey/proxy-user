# proxy-user

## Automatically cycle proxy servers. Built with `request` in mind, but usable in any context.

## Usage:

```js
const {proxify} = require("@sesamestrong/proxy-user");
const request = require("request-promise");

const proxyRotate = proxify(10); // 10 requests per proxy
const options = {
    method:"GET",
    headers:{
        "Referer":"https://bing.com"
    }
};

(async ()=>{
    for(let i=0;i<50;i++){ // 50 requests in total
        await request("https://www.google.com",await proxyRotate(options));
    }
    // 5 proxies are used, with 10 requests per proxy
})();

``
