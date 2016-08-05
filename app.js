/*
 ** Dependencies
 */

// FILE GETTING TO BIG, USING CDNs FOR NOW
//require('angular');
//require('angular-ui-router');
//require('angular-material');
//require('angular-animate');
//require('angular-cookies');
//require('angular-messages');
//require('angular-aria');
//require('firebase');
//require('angularfire');
//require('./node_modules/angular-material/angular-material.css');

/*var FBconfig = {
    apiKey: "AIzaSyD5B_DssWCtBgWn_2-Cy0LhTZGeErAYAJE",
    authDomain: "100meter.firebaseapp.com",
    databaseURL: "https://100meter.firebaseio.com",
    storageBucket: "project-8799195801841300390.appspot.com",
};
firebase.initializeApp(FBconfig);*/

/*
 ** App
 */
var app = angular.module('app', ['ui.router', 'firebase', 'ngAnimate', 'ngMaterial']);

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
require('./src/app/Admin/Projects/Edit/DialogController')(app);
require('./src/app/Admin/Projects/Edit/EditProjectController')(app);
require('./src/app/Admin/Statistics/StatisticsController')(app);

/*
 ** Styles
 */
require("./src/styles/animations.css");
require("./src/styles/styles.css");
//require("./src/styles/styles.less");