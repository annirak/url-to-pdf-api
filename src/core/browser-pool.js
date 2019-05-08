const genericPool = require('generic-pool');
const logger = require('../util/logger')(__filename);
const puppeteer = require('puppeteer');
const config = require('../config');

const poolFactory = {
  create() {
    logger.info('Adding new browser to pool');
    return puppeteer.launch({
      headless: !config.DEBUG_MODE,
      ignoreHTTPSErrors: false, // opts.ignoreHttpsErrors,
      args: ['--disable-gpu', '--no-sandbox', '--disable-setuid-sandbox'],
      sloMo: config.DEBUG_MODE ? 250 : undefined,
    });
  },
  destroy(client) {
    logger.info('Destroying browser from pool');
    return client.close();
  },
};

const poolOpts = {
  max: 10,
  min: 4,
  // evictionRunIntervalMillis: 60 * 60000,
  // numTestsPerEvictionRun: 5,
  // softIdleTimeoutMillis: 1 * 60000,
};

const myPool = genericPool.createPool(poolFactory, poolOpts);

module.exports = myPool;
