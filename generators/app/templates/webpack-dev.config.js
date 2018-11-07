const path = require('path');
const process = require('process');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const findIWARoot = (dirName) => {
  const cwd = dirName || process.cwd();
  const packagePath = path.join(cwd, 'package.json');
  if (fs.existsSync(packagePath)) {
    const package = require(packagePath);
    if (package.workspaces) {
      // We reached the root package.json, so we cannot find the IWA entrypoint
      throw 'Unable to determine the IWA to build, make sure you run build from the IWA directory.'
    } else {
      return cwd;
    }
  } else {
    return findIWARoot(path.dirname(cwd));
  }
}

const loadTheme = () => {
  if (iwaPkg.theme && typeof (iwaPkg.theme) === 'string') {
    let cfgPath = iwaPkg.theme;
    // relative path
    if (cfgPath.charAt(0) === '.') {
      cfgPath = path.resolve(iwaRoot, cfgPath);
    }
    const getThemeConfig = require(cfgPath);
    return getThemeConfig();
  } else if (iwaPkg.theme && typeof (iwaPkg.theme) === 'object') {
    return iwaPkg.theme;
  }
  return {};
}

const iwaRoot = findIWARoot();
const packagesRoot = path.dirname(iwaRoot);
const iwaPkg = require(path.join(iwaRoot, 'package.json'));
const projectRoot = path.resolve(__dirname);


module.exports = {
  entry: [
    `${iwaRoot}/src/index.js`,
  ],
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(iwaRoot, 'dist'),
    hot: true
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx']
  },
  module: {
    rules: [
      {
        test: /jsx?$/,
        include: packagesRoot,
        exclude: [
          /node_modules/,
        ],
        use: {
          loader: "babel-loader",
          options: {
            configFile: path.join(projectRoot, '.babelrc')
          }
        }
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'less-loader',
            options: {
              modifyVars: loadTheme(),
              javascriptEnabled: true
            }
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 32768, // 32kb
              fallback: 'file-loader'
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 32768, // 32kb
              fallback: 'file-loader'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: (iwaPkg.iwa && iwaPkg.iwa.title) || 'Liquid State IWA',
      template: path.join(iwaRoot, 'public', 'index.html')
    }),
    new webpack.HotModuleReplacementPlugin(),
  ]
}
