const request = require("request-promise");
const ProxyLists = require("proxy-lists");

const POSTBIN_URL="https://postb.in/1560395860481-9741234353277";

const options = {
    countries: ['us', 'ca'],
    sourcesBlackList: [
        "bitproxies",
        "kingproxies",
        "blackhatworld"
    ],
    protocols:[
        "http",
        "http"
    ]
    // sourceOptions:{
        // bitproxies:{
            // apiKey:"r2L3rRjXM5uXixhjHxzRn9gKQssLSDuP"
        // }
    // }
};
const promiseProxy=()=>{
    return new Promise((resolve,reject)=>{
        const findingProxies=ProxyLists.getProxies(options);
        findingProxies.on('data',proxies=>resolve(proxies));
        findingProxies.on('error',err=>reject(err));
    });
}
/**
 * 
 * @param {Number} period An integer representing the number of requests that each proxy can handle.
 */
const proxify = (period=5) => {
    let proxyList = [];
    let i=0;
    let newRequest = async options => {
        if(i>=period){
            proxyList.shift();
            if(proxyList.length<1){
                console.log("Nothing in list");
                proxyList=await promiseProxy();
            }
            i=0;
            return await newRequest(options);
        }
        i++;
        return {...options,proxy:proxyList[0]};
    };
    return newRequest;
};

console.log("\n".repeat(10));

(async function(){
    const proxy=await proxify();
    proxy();
    const options={
        uri:POSTBIN_URL||"http://pubproxy.com/api/proxy"
    }
    // console.log("bluh",JSON.stringify(await proxy(options)));
    for(let i=0;i<50;i++){
        try{
            let res=await request(await proxy(options));
            console.log(i);
        }
        catch(err){
            console.error(err);
            break;
        }
    }
    console.log("Done");
})();