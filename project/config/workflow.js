const path = require('path');

const modifyWebpackConfig = (webpackConfig, settings) => {
// ... Any other webpackConfig modifications go here
if (settings.isServer) {
webpackConfig.externals = ["@tanstack/react-query", ...webpackConfig.externals];
}
const reactQuery = path.resolve(require.resolve("@tanstack/react-query"), "../../../")
webpackConfig.resolve.alias = {}; webpackConfig.resolve.alias['@tanstack/react-query'] = reactQuery
webpackConfig.resolve.alias['@tanstack/react-query/devtools'] = path.resolve(reactQuery, "devtools")
return webpackConfig;
};

module.exports = (config) => {
  config.development.open = '#/?spaceId=12345';

  config.modifyWebpackConfig = modifyWebpackConfig;

  return config;
};
