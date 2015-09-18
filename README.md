## Social Connect
A sample application demonstrating how to connect social identities with a Kinvey user.

### Features

* Login a user using a username and password.
* Login a user using a social identity.

### Setup
1. Create a user using the [Kinvey Console](http://console.kinvey.com) for your Kinvey application.
2. Setup social connect for your application. Please refer to the [Setup Social Connect Guide](http://devcenter.kinvey.com/angular/tutorials/how-to-implement-safe-signin-via-oauth).

### Install

1. Clone the repo.
2. Excecute `npm install` and follow the instructions.

### Start
1. Execute `npm start`.

### Troubleshooting

__Why I am not able to login using a username and password?__

1. Make sure you have created a user using the [Kinvey Console](http://console.kinvey.com) for your Kinvey application.
2. Make sure you are entering the correct username and password.

__Why I am not able to login with Facebook?__

1. Check that your browser is not blocking popups. If it is, please allow it to show popups for this application.
2. Make sure the `App Domain` and `Site URL` in the settings for your Facebook application match the url in your web browser when you are viewing this sample application.
3. Make sure your Facebook `App Id` is correct. You can find it in `src/js/modules/config.js` and change it if it is not.

__Why I am not able to login with Twitter?__

1. Check that your browser is not blocking popups. If it is, please allow it to show popups for this application.
2. Make sure you are accessing the application at a domain other then `localhost` and that you have correctly setup your Twitter application to allow this domain.
3. Make sure you setup your Twitter application in the [Kinvey Console](http://console.kinvey.com). Please refer to the [Setup Social Connect Guide](http://devcenter.kinvey.com/angular/tutorials/how-to-implement-safe-signin-via-oauth) on how to setup your Twitter application.
