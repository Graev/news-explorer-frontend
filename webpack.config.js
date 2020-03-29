// webpack.config.js
const webpack = require("webpack");
// new webpack.DefinePlugin({
//     'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
// })

const path = require("path");
// Подключили к проекту плагин
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// Плагин для hot reload
const HtmlWebpackPlugin = require("html-webpack-plugin");
// плагин для хеширования
const WebpackMd5Hash = require("webpack-md5-hash");
// подключаем path к конфигу вебпак
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const ghpages = require("gh-pages");
const fs = require("fs");

const isDev = process.env.NODE_ENV === "development";

console.log("isDev", isDev);

const publicPathT = "/";
// создаем переменную для development-сборки
module.exports = {
  entry: { main: "./src/index.js", lk: "./src/saved-articles/index.js" },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/[name].[chunkhash].js"
    // publicPath: publicPathT
  },
  module: {
    rules: [
      {
        // тут описываются правила
        test: /\.js$/, // регулярное выражение, которое ищет все js файлы
        use: { loader: "babel-loader" }, // весь JS обрабатывается пакетом babel-loader
        exclude: /node_modules/ // исключает папку node_modules
      },
      {
        test: /\.css$/,
        use: [
          isDev
            ? "style-loader"
            : {
                loader: MiniCssExtractPlugin.loader,
                options: {
                  publicPath: "../"
                }
              },
          "css-loader",
          "postcss-loader"
        ],
        exclude: /node_modules/ // исключает папку node_modules
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        loader: "file-loader?name=./vendor/[name].[ext]",
        exclude: /node_modules/ // исключает папку node_modules
      },
      {
        test: /\.(gif|ico)$/,
        use: [
          "file-loader?name=./images/[name].[ext]", // указали папку, куда складывать изображения
          {
            loader: "image-webpack-loader",
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              // optipng.enabled: false will disable optipng
              optipng: {
                enabled: false
              },
              pngquant: {
                quality: [0.65, 0.9],
                speed: 4
              },
              gifsicle: {
                interlaced: false
              },
              // the webp option will enable WEBP
              webp: {
                quality: 75
              }
            }
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        loader: "file-loader",
        options: {
          name(file) {
            if (!isDev) {
              return "[name].[ext]";
            }

            return "[contenthash].[ext]";
          },
          outputPath: "images"
        }
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: isDev ? "style/[name].[contenthash].css" : "style/[name].css",
      chunkFilename: isDev
        ? "style/[name].[contenthash].css"
        : "style/[name].css"
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require("cssnano"),
      cssProcessorPluginOptions: {
        preset: ["default"]
      },
      canPrint: true
    }), // подключите плагин после MiniCssExtractPlugin

    new HtmlWebpackPlugin({
      inject: false,
      template: "./src/index.html",
      filename: "index.html"
    }),
    new HtmlWebpackPlugin({
      inject: false,
      template: `./src/lk.html`,
      filename: "lk.html"
    }),
    new WebpackMd5Hash(),
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(process.env.NODE_ENV)
    })
  ]
};
