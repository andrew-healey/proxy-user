const request=require("request-promise");
async function getProxy(){
    const html=await request("http://pubproxy.com/api/proxy?type=http&limit=15&https=true");
    return JSON.parse(html).data;
};
module.exports=getProxy;
