/** @type {import('@availity/workflow').WorkflowConfigFunction} */
export default (config) => {
  config.app.title = 'My Application';
  config.development.open = '#/?spaceId=48C607A70B5A46A3864A34E2BDDDEA04';

  // Coverage configuration — enabled automatically when --coverage flag is passed
  config.development.vitestOverrides = {
    ...config.development.vitestOverrides,
    coverage: {
      provider: 'istanbul',
      include: ['project/app/**/*.{js,jsx}'],
      exclude: ['project/app/**/index.{js,jsx}', '**/*.test.{js,jsx}', '**/*.d.ts', 'node_modules/'],
    },
  };

  return config;
};
