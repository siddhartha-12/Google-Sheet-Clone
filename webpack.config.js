var path = require("path");
  module.exports = {
    entry: './src/index.ts',
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "bundle.js",
      publicPath: '/dist/'
    },
    devtool: "source-map",
    resolve: {
      // Add `.ts` and `.tsx` as a resolvable extension.
      extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
    },
    module: {
      loaders: [
        // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
        {
          test: /\.tsx?$/,
          loader: 'ts-loader'
        }
      ],
      preLoaders: [{
        test: /\.js$/,
        loader: "source-map-loader"
      }]
    }
  }