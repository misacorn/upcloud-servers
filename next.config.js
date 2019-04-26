const fs = require('fs');
const path = require('path');
const withTypescript = require('@zeit/next-typescript');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

// read some options from tsconfig.json
const tsConfig = JSON.parse(fs.readFileSync('./tsconfig.json', 'utf-8'));
const tsConfigCompilerOptions = tsConfig.compilerOptions;
const baseUrl = tsConfigCompilerOptions.baseUrl || './';
const aliases = Object.keys(tsConfigCompilerOptions.paths || {});

const tsConfigCompilerPaths = aliases.reduce(
  (acc, alias) => ({
    ...acc,
    [alias]: path.resolve(baseUrl, tsConfigCompilerOptions.paths[alias][0]),
  }),
  {},
);

module.exports = withTypescript({
  webpack(config, options) {
    // make "import 'components/Foo';" etc. work
    config.resolve = {
      ...config.resolve,
      alias: {
        ...(config.resolve.alias || {}),
        ...tsConfigCompilerPaths,
      },
      modules: [path.resolve(__dirname, baseUrl), ...config.resolve.modules],
    };

    // do TypeScript type checking in a separate thread in dev
    if (options.isServer) {
      config.plugins.push(new ForkTsCheckerWebpackPlugin());
    }

    return config;
  },
});
