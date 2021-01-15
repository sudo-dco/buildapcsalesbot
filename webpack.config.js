const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const path = require("path");

module.exports = {
    entry: "./src/index.js",
    mode: "development",
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                loader: "babel-loader",
            },
        ],
    },
    resolve: {
        extensions: ["*", ".js", ".jsx"],
        fallback: {
            path: require.resolve("path-browserify"),
            fs: false,
            net: false,
        },
    },
    output: {
        path: path.resolve(__dirname, "public/"),
        publicPath: "/public/",
        filename: "bundle.js",
    },
    plugins: [new NodePolyfillPlugin()],
};
