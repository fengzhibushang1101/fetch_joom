/**
 * Created by jyq on 2017/12/21.
 */

var webpack = require('webpack');
var path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

var publicPath = '/';
var hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';

var devConfig = {
    entry: {
        joom: ['./fe/js/joom', hotMiddlewareScript],
    },
    output: {
        filename: './javascripts/[name]/bundle.js',
        path: path.resolve('./public'),
        publicPath: publicPath
    },
    devtool: 'eval-source-map',
    module: {
        loaders: [{
            test: /\.css$/,
            use: [{
                    loader: 'style-loader',
                }, {
                    loader: 'css-loader',
                    options: {
                        minimize: true,
                        '-autoprefixer': true,
                    }
                }, {
                    loader: 'postcss-loader',
                    options: {
                        config: {
                            path: 'postcss.config.js'
                        }
                    }
                }
            ]
        }, {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: [['es2015', {loose: true}]],
                    plugins: ["transform-runtime"]
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        css: {
                            use: [{
                                loader: 'style-loader',
                            }, {
                                loader: 'css-loader',
                                options: {
                                    minimize: true,
                                    '-autoprefixer': true,
                                }
                            }, {
                                loader: 'postcss-loader',
                                options: {
                                    config: {
                                        path: 'postcss.config.js'
                                    }
                                }
                            }],
                            fallback: 'vue-style-loader'
                        },
                        less: {
                            use: [{
                                loader: 'style-loader',
                            }, {
                                loader: 'css-loader',
                                options: {
                                    minimize: true,
                                    '-autoprefixer': true,
                                }
                            }, {
                                loader: 'postcss-loader',
                                options: {
                                    config: {
                                        path: 'postcss.config.js'
                                    }
                                }
                            }, 'less-loader'],
                            fallback: 'vue-style-loader'
                        }
                    },
                }
            }, {
                test: /\.less$/,
                use: [{
                        loader: 'style-loader'
                    }, {
                        loader: 'css-loader',
                        options: {
                            minimize: true,
                            '-autoprefixer': true,
                        },
                    }, {
                        loader: 'postcss-loader',
                        options: {
                            config: {
                                path: 'postcss.config.js'
                            }
                        }
                    }, {
                        loader: 'less-loader'
                    }
                ]
            }, {
                // 文件加载器，处理文件静态资源
                test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader?limit=8192&name=./fonts/[name].[ext]'
            }, {
                // 图片加载器，雷同file-loader，更适合图片，可以将较小的图片转成base64，减少http请求
                // 如下配置，将小于8192byte的图片转成base64码
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader?limit=8192&name=./images/[name].[ext]'
            }]
    },
    resolve: {
        alias: {
            vue$: 'vue/dist/vue.common.js', // webpack下vue配置
        }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        // new ExtractTextPlugin('[name]/bundle.css')
    ]
};

module.exports = devConfig;