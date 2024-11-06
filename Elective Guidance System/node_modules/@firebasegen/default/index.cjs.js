const { getDataConnect, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'default',
  service: 'Elective Guidance System',
  location: 'us-central1'
};
exports.connectorConfig = connectorConfig;

