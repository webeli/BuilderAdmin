/*
 ** Dependencies
 */
//var angular = require('angular');
var uirouter = require('angular-ui-router');
//var angularcookies = require('angular-cookies');
//var firebase = require('firebase');
//var angularfire = require('angularfire');
//var angularanimate = require('angular-animate');
//require('angular-moment');

/*
 ** App
 */
//var app = angular.module('app', ['ui.router', 'firebase', 'ngAnimate', 'angularMoment']);
var app = angular.module('app', ['ui.router']);

/*
 ** Run & Config
 */
require('./src/app/app.run.js')(app);
require('./src/app/app.config.js')(app);

/*
 ** Services
 */
require('./src/services/FirebaseService')(app);

/*
 ** Controllers
 */
require('./src/app/Login/LoginController')(app);
require('./src/app/Admin/AdminController')(app);
require('./src/app/Admin/Dashboard/DashboardController')(app);
require('./src/app/Admin/Projects/ProjectsController')(app);
require('./src/app/Admin/Projects/EditProjectController')(app);

/*
 ** Styles
 */
require("./src/styles/animations.css");
require("./src/styles/styles.css");
//require("./src/styles/styles.less");