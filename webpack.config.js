const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const miniCss = require('mini-css-extract-plugin');

module.exports = {
    mode: 'development',
    entry: '/public/index.js',

    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
        publicPath: '/',
    },

    module: {
        rules: [
            {
                test: /\.hbs$/,
                loader: 'handlebars-loader',
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.(s*)css$/,
                use: [
                    miniCss.loader,
                    'css-loader',
                    'sass-loader',
                ],
            },
        ],
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: '/public/index.hbs',
        }),

        new CopyPlugin({
            patterns: [
                {from: path.resolve(__dirname, 'public/static/images'), to: 'static/images'},
                {from: path.resolve(__dirname, 'public/sw.js'), to: ''},
            ],
        }),

        new miniCss({
            filename: 'style.css',
        }),

        new FaviconsWebpackPlugin(path.resolve(__dirname, 'public/static/images/favicon.svg')),
    ],

    devServer: {
        port: 8083,
        hot: true,
        compress: true,
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        historyApiFallback: true,
    },
};
