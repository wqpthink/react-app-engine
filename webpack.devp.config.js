const path = require("path");
const webpack = require("webpack");
// const CleanWebpackPlugin = require("clean-webpack-plugin");
const entry_conf = require("./src/conf/entry-conf");
const html_conf = require("./src/conf/html-conf");


module.exports = {
    mode: "development",
    entry: entry_conf(process.cwd() + "\\src\\component", ["style.js"]),
    output: {
        path: path.resolve(__dirname, "devp"),
        filename: "[name].js",
        publicPath: "/devp/"
    },
    module: {
        rules: [
            {
                test: /\.(jsx|js)$/,
                exclude: /(node_modules)/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.(png|jpg|gif|woff|eot|svg|ttf)$/,
                use: {
                    loader: "url-loader"
                }
            },
            {
                test: /\.css$/,
                use: [
                    {loader: "style-loader"},
                    {loader: "css-loader"}
                ]
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        // new CleanWebpackPlugin(["dist", "build", "devp"]),
        ...html_conf(process.cwd() + "\\src\\component", ["index.js","style.js"])
    ],
    devtool: 'inline-source-map',
    devServer: {
        open: "Chrome",
        host: "localhost",
        port: 8080,
        inline: true,
        contentBase: path.join(__dirname, "/"),
        compress: true,
        // publicPath: path.resolve(__dirname, "./devp"),
        hot: true
    }
};
