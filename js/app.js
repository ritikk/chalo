// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('chalo', ['ionic','ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    console.log('console.log works just fine');
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
    .state('page3', {
      url: '/welcome',
      templateUrl: 'page3.html'
    })
    
    .state('page5', {
      url: '/signup/name',
      templateUrl: 'page5.html'
    })
    
    .state('page6', {
      url: '/signup/email',
      templateUrl: 'page6.html'
    })
    
    .state('page7', {
      url: '/signup/phone',
      templateUrl: 'page7.html'
    })
    
    .state('page8', {
      url: '/signup/contacts',
      templateUrl: 'page8.html'
    })
    
    .state('page9', {
      url: '/chalo',
      templateUrl: 'page9.html'
    })
    
    .state('page10', {
      url: '/chalo/advanced',
      templateUrl: 'page10.html'
    })
    
    .state('page11', {
      url: '/chalo/contacts',
      templateUrl: 'page11.html',
      controller: 'ContactsCtrl'
    })
    ;

  // if none of the above states are matched, use this as the fallback
  
  $urlRouterProvider.otherwise('/welcome');
  
})

.controller('ContactsCtrl', function($scope, $cordovaContacts){
	$scope.selectedContacts = [];
    console.log('contacts controller');
	$scope.addContact = function () {
	    $cordovaContacts.pickContact(function(contact){
	        console.log("selected contact: " + JSON.stringify(contact));
	        $scope.$apply(function() {
	            $scope.selectedContacts.push(contact.clone());
	        });
        }, function(error){
            console.log("error");
        });
	};

	$scope.addContact();

});

