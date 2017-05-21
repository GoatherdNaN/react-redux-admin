/**
 * Created by edlan on 3/23 0023.
 */
let webpack = require("webpack");
let HtmlWebpackPlugin = require("html-webpack-plugin");
let path = require("./path");
module.exports = {
    //context:path.context,
    resolve:{
        extensions: ['.js', '.json', '.jsx'],
    },
    externals:{
        jquery:"jQuery"
    },
    module:{
        rules:[
            {
                test:/\.(js|jsx)$/,
                include:[
                    path.app
                ],
                exclude:[
                    path.node_modules
                ],
                use:{
                    loader:"babel-loader",
                    options:{
                        presets:[
                            ['es2015',{"modules":false}],
                            "stage-2",
                            'react'
                        ],
                        "plugins":[
                            'transform-runtime',
                            ["import",[{"libraryName":"antd", style:true}]],
                            "react-hot-loader/babel"
                        ]
                    }
                }
            },
            {
                test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
                use:{
                    loader:"url-loader",
                    options:{
                        limit:10000
                    }
                }
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            title:"my admin",
            inject:"body",
            filename:"index.html",
            template:path.html
        }),
        new webpack.ProvidePlugin({
            $:"jquery"
        }),
        new webpack.LoaderOptionsPlugin({
            options:{
                postcss:function () {
                    return [
                        require("autoprefixer")({
                            browsers: [
                                '>1%',
                                'last 4 versions',
                                'Firefox ESR',
                                'not ie < 9'
                            ]
                        })
                    ]
                }
            }
        })
    ]
};
