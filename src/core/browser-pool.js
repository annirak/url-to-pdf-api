const genericPool = require('generic-pool');
const logger = require('../util/logger')(__filename);
const puppeteer = require('puppeteer');
const config = require('../config');

const poolFactory = {
  create() {
    logger.info('Adding new page to pool');
    return puppeteer.launch({
      headless: !config.DEBUG_MODE,
      ignoreHTTPSErrors: false, // opts.ignoreHttpsErrors,
      args: ['--disable-gpu', '--no-sandbox', '--disable-setuid-sandbox'],
      sloMo: config.DEBUG_MODE ? 250 : undefined,
    }).then(browser => browser.pages().then(pages => (pages ? pages[0] : browser.newPage())));
  },
  destroy(client) {
    logger.info('Destroying page from pool');
    return client.browser().close();
  },
};

const poolOpts = {
  max: 40,
  min: 5,
  evictionRunIntervalMillis: 60 * 60000,
  // numTestsPerEvictionRun: 5,
  // softIdleTimeoutMillis: 1 * 60000,
};
logger.info(`creating pool ${JSON.stringify(poolOpts)}`);
const myPool = genericPool.createPool(poolFactory, poolOpts);

module.exports = myPool;
