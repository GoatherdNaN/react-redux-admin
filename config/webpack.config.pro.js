/**
 * Created by edlan on 3/23 0023.
 */
let webpack = require("webpack");
let merge = require("webpack-merge");
let ExtractTextPlugin = require("extract-text-webpack-plugin");
let cleanWebpackPlugin = require("clean-webpack-plugin");
let ExtractTextPlugin = require("extract-text-webpack-plugin");
let config = require("./webpack.config");
let path = require("./path");
module.exports  = merge(config,{
    entry:{
        index:[path.index]
    },
    output:{
        path:path.dist,
        filename:"[name]_[hash:5].js",
        crossOriginLoading:"anonymous",
    },
    devtool:"cheap-module-source-map",
    plugins:[
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({//压缩 必须是production环境
            compress:{
                warnings:false,
                drop_console:false
            }
        }),
        new cleanWebpackPlugin(['dist'],{
            root:path.base,
            "verbose": true,
        }),
        new ExtractTextPlugin({
            filename:"[name].[contenthash:5].css",

        })
    ],
    module:{
        rules:[
            {
                test: /\.css$/,
                include:[
                    path.app
                ],
                use:ExtractTextPlugin.extract({
                    fallback:"style-loader",
                    use:[
                        {
                            loader:'css-loader',
                            options:{
                                modules:true,
                                importLoaders:1,
                                sourceMap: true,
                                minimize:true,
                                localIdentName:"[name]_[local]_[hash:base64:5]"
                            }
                        },
                        {
                            loader:"postcss-loader"
                        }
                    ]
                }),
            },
            {
                test:/\.less$/,
                include:[
                    path.app
                ],
                exclude:[
                    path.node_modules
                ],
                use:ExtractTextPlugin.extract({
                    fallback:"style-loader",
                    use:[
                        {
                            loader:'css-loader',
                            options:{
                                importLoaders:1,
                                module:true,
                                sourceMap: true,
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
                }),
            },
            {
                test:/\.less$/,
                include:[
                    path.antd
                ],
                use:ExtractTextPlugin.extract({
                    fallback:"style-loader",
                    use:[
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
                }),
            }
        ]
    }
});
