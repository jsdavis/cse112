// nightwatch.js
const TRAVIS_JOB_NUMBER = process.env.TRAVIS_JOB_NUMBER;
const SCREENSHOT_PATH = './screenshots/';
const BINPATH = './node_modules/nightwatch/bin/';

module.exports = {
  'src_folders': [
    'test/e2e',
  ],
  'output_folder': 'test/reports',
  'selenium': {
    'start_process': false,
    'server_path': './node_modules/nightwatch/bin/selenium.jar',
    'host': '127.0.0.1',
    'port': 4444,
    'cli_args': {
      'webdriver.chrome.driver': './node_modules/nightwatch/bin/chromedriver',
    },
  },
  'test_workers': {
    'enabled': true,
    'workers': 'auto',
  },
  'test_settings': {
    'default': {
      'launch_url': 'http://localhost',
      'selenium_port': 80,
      'selenium_host': 'ondemand.saucelabs.com',
      'silent': true,
      'username': '${SAUCE_USERNAME}',
      'access_key': '${SAUCE_ACCESS_KEY}',
      'globals': {
        'waitForConditionTimeout': 10000,
      },
      'desiredCapabilities': {
        'build': 'build-${TRAVIS_JOB_NUMBER}',
        'tunnel-identifier': TRAVIS_JOB_NUMBER,
      },
    },
    'local': {
      'launch_url': 'http://localhost',
      'selenium_port': 4444,
      'selenium_host': '127.0.0.1',
      'silent': true,
      'globals': {
        'waitForConditionTimeout': 15000,
      },
      'desiredCapabilities': {
        'browserName': 'chrome',
        'javascriptEnabled': true,
      },
    },
    'chrome': {
      'desiredCapabilities': {
        'browserName': 'chrome',
        'javascriptEnabled': true,
      },
    },
    'chromemac': {
      'desiredCapabilities': {
        'browserName': 'chrome',
        'platform': 'OS X 10.11',
        'version': '47',
      },
    },
    'ie11': {
      'desiredCapabilities': {
        'browserName': 'internet explorer',
        'platform': 'Windows 10',
        'version': '11.0',
      },
    },
    'firefox': {
      'desiredCapabilities': {
        'platform': 'XP',
        'browserName': 'firefox',
        'version': '33',
      },
    },
    'internet_explorer_10': {
      'desiredCapabilities': {
        'platform': 'Windows 7',
        'browserName': 'internet explorer',
        'version': '10',
      },
    },
    'android_s4_emulator': {
      'desiredCapabilities': {
        'browserName': 'android',
        'deviceOrientation': 'portrait',
        'deviceName': 'Samsung Galaxy S4 Emulator',
        'version': '4.4',
      },
    },
    'iphone_6_simulator': {
      'desiredCapabilities': {
        'browserName': 'iPhone',
        'deviceOrientation': 'portrait',
        'deviceName': 'iPhone 6',
        'platform': 'OSX 10.10',
        'version': '8.4',
      },
    },
  },
};


/**
 * selenium-download does exactly what it's name suggests;
 * downloads (or updates) the version of Selenium (& chromedriver)
 * on your localhost where it will be used by Nightwatch.
 /the following code checks for the existence of `selenium.jar`
 *before trying to run our tests.
 */

require('fs').stat(BINPATH + 'selenium.jar', (err, stat) => { // got it?
  if (err || !stat || stat.size < 1) {
    require('selenium-download').ensure(BINPATH, (error) => {
      if (error) throw new Error(error); // no point continuing so exit!
 //     log.info('✔ Selenium & Chromedriver downloaded to:', BINPATH);
    });
  }
});

/**
 * pad left
 * @param {int} count
 * @return {string}
 **/
function padLeft(count) { // theregister.co.uk/2016/03/23/npm_left_pad_chaos/
  return count < 10 ? '0' + count : count.toString();
}

let FILECOUNT = 0; // "global" screenshot file count
/**
 * The default is to save screenshots to the root of your project even though
 * there is a screenshots path in the config object above! ... so we need a
 * function that returns the correct path for storing our screenshots.
 * While we're at it, we are adding some meta-data to the filename,specifically
 * the Platform/Browser where the test was run and the test (file) name.
 * @param {string} browser
 * @return {string}
 */
function imgpath(browser) {
  const a = browser.options.desiredCapabilities;
  const meta = [a.platform];
  meta.push(a.browserName ? a.browserName : 'any');
  meta.push(a.version ? a.version : 'any');
  meta.push(a.name); // this is the test filename so always exists.
  const metadata = meta.join('~').toLowerCase().replace(/ /g, '');
  return SCREENSHOT_PATH + metadata + '_' + padLeft(FILECOUNT++) + '_';
}

module.exports.imgpath = imgpath;
module.exports.SCREENSHOT_PATH = SCREENSHOT_PATH;
