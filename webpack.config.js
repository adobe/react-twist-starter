/*
 *  Copyright 2018 Adobe Systems Incorporated. All rights reserved.
 *  This file is licensed to you under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License. You may obtain a copy
 *  of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software distributed under
 *  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 *  OF ANY KIND, either express or implied. See the License for the specific language
 *  governing permissions and limitations under the License.
 *
 */

const path = require('path');

const autoprefixer = require('autoprefixer');
const webpack = require('webpack');

const ReactTwistPlugin = require('@twist/react-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const IS_PRODUCTION = process.env.NODE_ENV === 'production';
const IS_TEST = process.env.NODE_ENV === 'test';
const BROWSER_TARGETS = 'last 2 versions';

const OUTPUT_PATH = path.join(__dirname, 'build');

const CSS_USE = [
    {
        loader: 'style-loader'
    },
    {
        loader: 'css-loader',
        options: {
            sourceMap: !IS_PRODUCTION,
            importLoaders: 1
        }
    },
    {
        loader: 'postcss-loader',
        options: {
            sourceMap: !IS_PRODUCTION,
            plugins: [autoprefixer(BROWSER_TARGETS)]
        }
    }
];

module.exports = {
    context: __dirname,
    entry: {
        app: ['./src/Main.jsx'],
        vendor: ['react', 'react-dom', '@twist/core', '@twist/react', 'babel-runtime/core-js', 'babel-runtime/regenerator']
    },
    devServer: {
        contentBase: OUTPUT_PATH,
        compress: false
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    output: {
        path: OUTPUT_PATH,
        filename: '[name].js'
    },
    devtool: IS_PRODUCTION ? 'source-map' : 'cheap-module-eval-source-map',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: CSS_USE
            },
            {
                test: /\.less$/,
                use: [
                    ...CSS_USE,
                    {
                        loader: 'less-loader',
                        options: {
                            sourceMap: !IS_PRODUCTION
                        }
                    }
                ]
            },
            {
                test: /\.(gif|png|jpg|svg|eot|woff|woff2|ttf|mp4|cur)$/,
                loader: 'file-loader'
            },
            {
                test: /\.(json|json5)$/,
                loader: 'json5-loader'
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }),
        new webpack.ProvidePlugin({
            React: 'react'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: Infinity
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: !IS_PRODUCTION
        }),
        new ReactTwistPlugin(),
        new HtmlWebpackPlugin({ title: 'starter-project' })
    ]
};
