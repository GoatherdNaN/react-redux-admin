let webpack = require("webpack");
let HtmlWebpackPlugin = require("html-webpack-plugin")
let path = require("./path");
let merge = require("webpack-merge");
let config = require("./webpack.config");
module.exports = merge(config, {
    entry:[
        'react-hot-loader/patch',
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/only-dev-server',
        path.app
    ],
    output:{
        path:path.dist,
        filename:"[name]_[hash:5].js",
        crossOriginLoading:"anonymous",
        publicPath:"/"
    },
    module:{
        rules:[
            {
                test: /\.css$/,
                include:[
                    path.app
                ],
                use:[
                    {
                        loader:"style-loader"
                    },
                    {
                        loader:'css-loader',
                        options:{
                            modules:true,
                            importLoaders:1,
                            sourceMap: true,
                            localIdentName:"[name]_[local]_[hash:base64:5]"
                        }
                    },
                    {
                        loader:"postcss-loader"
                    }
                ],
            },
            {
                test:/\.less$/,
                include:[
                    path.app
                ],
                exclude:[
                    path.node_modules
                ],
                use:[
                    {
                        loader:"style-loader"
                    },
                    {
                        loader:'css-loader',
                        options:{
                            importLoaders:1,
                            module:true,
                            localIdentName:"[name]_[local]_[hash:base64:5]"
                        }
                    },
                    {
                        loader:"postcss-loader"
                    },
                    {
                        loader:"less-loader"
                    }
                ]
            },
            {
                test:/\.less$/,
                include:[
                    path.antd
                ],
                use:[
                    {
                        loader:"style-loader"
                    },
                    {
                        loader:'css-loader'
                    },
                    {
                        loader:"postcss-loader"
                    },
                    {
                        loader:"less-loader"
                    }
                ]
            }
        ]
    },
    devtool:"inline-source-map",
    devServer:{
        open:true,
        //port:8080,
        hot:true,
        inline:true,
        contentBase:path.dist,
        publicPath:"/",
        quiet:true,
        historyApiFallback:true,
        proxy:{
            "/api/":{
                target:"http://localhost:2620",
                secure: false,
                changeOrigin:true
            }
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "my admin",
            inject: "body",
            filename: "index.html",
            template: path.html,
        }),
        new webpack.HotModuleReplacementPlugin(),

        new webpack.NamedModulesPlugin()
    ]
});
