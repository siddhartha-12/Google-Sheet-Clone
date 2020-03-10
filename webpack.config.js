var path = require('path');

module.exports = {
   entry: './src/index.ts',
   resolve: {
     extensions: ['.webpack.js', '.web.js', '.ts', '.js']
   },
   module: {
     rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
   },
   output: {
     filename: 'bundle.js',
     path: path.resolve(__dirname, 'dist')
   }
 }