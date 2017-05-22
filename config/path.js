let path = require("path");
module.exports= {
    base:path.resolve("./"),
    app:path.resolve("./src"),
    index:path.resolve("./src/index.js"),
    html:path.resolve('./src/index.html'),
    dist:path.resolve("./dist"),
    node_modules:path.resolve("./node_modules"),
    config:path.resolve("./config"),
    antd:path.resolve("./node_modules/antd")
};
