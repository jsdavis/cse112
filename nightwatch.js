// nightwatch.js
const TRAVIS_JOB_NUMBER = process.env.TRAVIS_JOB_NUMBER;

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
