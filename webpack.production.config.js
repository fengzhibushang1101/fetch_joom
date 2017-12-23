/**
 * Created by jyq on 2017/12/23.
 */

const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');


const productionConfig = {
    entry: {
        joom: ['./fe/js/joom']
    },
    output: {
        filename: './javascripts/[name]/bundle.js',
        path: path.resolve(__dirname, './public'),
        publicPath: '/'
    },
    module: {
        loaders: [{
            test: /\.css$/,
            use: [{
                loader: 'style-loader'
            }, {
                loader: 'css-loader',
                options: {
                    minimize: true,
                    '-autoprefixer': true
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
                presets: [['es2015', { loose: true }]],
                plugins: ['transform-runtime']
            }
        }, {
            test: /\.vue$/,
            loader: 'vue-loader',
            options: {
                loaders: {
                    css: {
                        use: [{
                            loader: 'style-loader'
                        }, {
                            loader: 'css-loader',
                            options: {
                                minimize: true,
                                '-autoprefixer': true
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
                            loader: 'style-loader'
                        }, {
                            loader: 'css-loader',
                            options: {
                                minimize: true,
                                '-autoprefixer': true
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
                }
            }
        }, {
            test: /\.less$/,
            use: [{
                loader: 'style-loader'
            }, {
                loader: 'css-loader',
                options: {
                    minimize: true,
                    '-autoprefixer': true
                }
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
            vue$: 'vue/dist/vue.common.js' // webpack下vue配置
        }
    },
    plugins: [
        new CleanWebpackPlugin(['public'])
    ]
};

module.exports = productionConfig;
