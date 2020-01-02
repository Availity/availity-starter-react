module.exports = config => {
  config.development.open = '/?spaceId=48C607A70B5A46A3864A34E2BDDDEA04';

  config.development.hotLoader = {
    enabled: true,
    experimental: true,
  };

  return config;
};
