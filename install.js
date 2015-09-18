/*eslint-disable */

var prompt = require('prompt');
var chalk = require('chalk');
var fs = require('fs');
var path = require('path');
var spawn = require('child_process').spawn;
var configFile = path.join(__dirname, 'app/js/modules/config.js');

console.log(chalk.cyan('This utility will walk you through setting up the Kinvey AngularJS Social Connect App.'));
console.log(chalk.cyan('Please refer to http://devcenter.kinvey.com/angularjs for more information. Defaults are shown next to the question.'))
console.log(chalk.cyan('Press ^C at any time to quite.'));
console.log('');

// Customize the prompt
prompt.message = '';
prompt.delimiter = '';

// Start the prompt
prompt.start();

// Get appKey, appSecret, and redirectUri
prompt.get({
  properties: {
    appKey: {
      description: 'What is your app key?',
      required: true
    },
    appSecret: {
      description: 'What is your app secret?',
      required: true
    },
    apiHostname: {
      description: 'What is the API hostname?',
      default: 'https://baas.kinvey.com'
    },
    facebookAppId: {
      description: 'What is your Facebook applications app id?',
    }
  }
}, function(err, result) {
  if (err) {
    console.log(chalk.red(err));
    return;
  }

  result.facebookAppId = result.facebookAppId || '';

  var configFileData = '' +
    'var module = angular.module(\'config\', []);\n' +
    'module.constant(\'kinveyConfig\', {\n' +
    '  appKey: \'' + result.appKey + '\',\n' +
    '  appSecret: \'' + result.appSecret + '\',\n' +
    '  apiHostName: \'' + result.apiHostname + '\'\n' +
    '});'\'\n' +
    'window.facebookAppId = \'' + result.facebookAppId + '\'\n';

  // Write config file
  fs.writeFile(configFile, configFileData, function(err) {
    if (err) {
      console.log(chalk.red(err));
      return;
    }
  });
});
