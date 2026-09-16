/** @type {import('@availity/workflow').WorkflowConfigFunction} */
export default (config) => {
  config.app.title = 'ID Card Viewer';
  config.development.open = '#/?spaceId=12345';

  return config;
};
