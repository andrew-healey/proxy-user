

(async function () {
    const proxy = await proxify(10);
    const options = {
        uri: POSTBIN_URL || "http://blockyjump.me/",
        // protocol:"http:"
    }
    for (let i = 0; i < 20; i++) {
        const newOptions = await proxy(options);
        request(newOptions).then(() => console.log(i)).catch(err => console.error(err));
    }
    console.log("Done");
})();
