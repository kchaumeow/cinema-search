const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  entry: "./src/index.tsx",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.svg$/,
        use: ["@svgr/webpack", "url-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  performance: {
    maxAssetSize: 500000, // in bytes, e.g., 500 KiB
    maxEntrypointSize: 500000, // in bytes, e.g., 500 KiB
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
    // The runtime describes every other chunk, so keeping it in main would
    // invalidate main.js on any change anywhere in the build.
    runtimeChunk: "single",
    splitChunks: {
      chunks: "all",
      minSize: 20000,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      automaticNameDelimiter: "~",
      name: false,
      cacheGroups: {
        // React and the router change only on upgrades, so they get their own
        // long-lived chunk.
        framework: {
          test: /[\\/]node_modules[\\/](react|react-dom|scheduler|react-router|react-router-dom|@remix-run)[\\/]/,
          name: "framework",
          priority: 20,
        },
        // Chakra pulls framer-motion in for every animated component, so the
        // two are inseparable and together are the bulk of the vendor weight.
        ui: {
          test: /[\\/]node_modules[\\/](@chakra-ui|@emotion|framer-motion|motion-dom|motion-utils|stylis|color2k|lodash\.mergewith)[\\/]/,
          name: "ui",
          priority: 10,
        },
        // Deliberately unnamed: naming this group would pull dependencies that
        // only lazy chunks use (autocomplete, the carousel) back into an
        // initial chunk and undo the route splitting.
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
  output: {
    filename: "[name].js",
    chunkFilename: "[name].chunk.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "public/index.html",
      favicon: "src/favicon.ico",
      manifest: "public/manifest.json",
    }),
    new ForkTsCheckerWebpackPlugin(),
    new webpack.DefinePlugin({
      "process.env.TOKEN": JSON.stringify(process.env.TOKEN || ""),
    }),
  ],
  devServer: {
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, "dist"),
    },
    client: {
      overlay: {
        warnings: false,
        errors: true,
      },
    },
    compress: true,
    port: 7070,
    open: true,
    hot: true,
  },
};
