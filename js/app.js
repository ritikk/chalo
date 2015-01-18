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
    
    .state('welcome', {
      url: '/welcome',
      templateUrl: 'page3.html',
      controller: 'WelcomeCtrl'
    })
    
    .state('signup-name', {
      url: '/signup/name',
      templateUrl: 'page5.html',
      controller: 'SignupNameCtrl'
    })
    
    .state('signup-phone', {
      url: '/signup/phone',
      templateUrl: 'page7.html',
      controller: 'SignupPhoneCtrl'
    })
    
    .state('chalo', {
      url: '/chalo',
      templateUrl: 'page9.html',
      controller: 'ChaloCtrl'
    })
    
    .state('chalo-advanced', {
      url: '/chalo/advanced',
      templateUrl: 'page10.html'
    })
    
    .state('contacts', {
      url: '/chalo/contacts/{opName}',
      templateUrl: 'page11.html',
      controller: 'ContactsCtrl'
    })
    ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/welcome');
  
})

.controller('ContactsCtrl', function($scope, $cordovaContacts, $state, $stateParams, $cordovaSocialSharing, $user){
	$scope.selectedContacts = [];
    console.log('contacts controller: ' + $stateParams.opName);
	$scope.addContact = function () {
	    $cordovaContacts.pickContact().then(function(contact){
	        console.log("selected contact: " + JSON.stringify(contact));
	        if(contact.phoneNumbers) {
	            contact.selectedNumber = contact.phoneNumbers[0].value;
	            $scope.selectedContacts.push(contact);
	        } else {
	            alert("Sorry this contact has no phone numbers");
	            console.log("contact " + contact.name.formatted + " has no phone numbers");
	        }
        }, function(error){
            console.log(error);
        });
	};

	$scope.addContact();

	$scope.cancel = function() {
	    $state.go('chalo');
	};

	$scope.sendChalo = function() {
        var number = "";
	    for(i = 0; i < $scope.selectedContacts.length; i++) {
            if(number>0) {
                number = number + ",";
            }
            number = number + $scope.selectedContacts[i].selectedNumber;
	    }
	    console.log("Number: " + number);
	    var message = $user.getFullName() + " says CHALO! Let's Go!. To get the app visit "
	        + "https://build.phonegap.com/apps/1258277/install/NxQi1A9jR14KzDEL6yM2";
         $cordovaSocialSharing
            .shareViaSMS(message, number)
            .then(function(result) {
              console.log('message to ' + number + ' sent successfully. ' + result);
              $state.go('chalo');
            }, function(e) {
              console.log('message to ' + number + ' not sent. Err: ' + e);
              alert(e);
            }
        );

	};

})

.controller('ChaloCtrl', function($scope, $state) {

    $scope.selectContacts = function(op) {
        $state.go('contacts',{opName : op});
    };

    $scope.showAdvanced = function() {
        $state.go('chalo-advanced');
    }
})

.controller('SignupNameCtrl', function($scope, $user, $state){

    $scope.setFullName = function(fullName) {
        $user.setFullName(fullName);
        $state.go('signup-phone');
    };

})

.controller('SignupPhoneCtrl', function($scope, $user, $state){
    $scope.setPhone = function(phone) {
        $user.setPhone(phone);
        $state.go('chalo');
    };
})

.controller('WelcomeCtrl', function($scope, $user, $state) {

    if($user.getPhone()) {
        $state.go('chalo');
    }

    $scope.getGoing = function () {
        if($user.getPhone()) {
            $state.go('chalo');
        } else {
            $state.go('signup-name');
        }
    }
})

.factory('$storage', ['$window', function(win) {
    return win.localStorage;
}])

.factory('$user', ['$storage', function(storage){
    var user = {
        fullName: null,
        phone: null
    };
    var key = "currentUser";
    if(storage.getItem(key)) {
        user = JSON.parse(storage.getItem(key));
        console.log('User parsed: ' + storage.getItem(key));
    }
    return {
        getFullName : function() {
            return user.fullName;
        },
        setFullName : function(fullName) {
            user.fullName = fullName;
            storage.setItem(key, JSON.stringify(user));
            console.log('saved user:' + JSON.stringify(user));
        },
        getPhone : function() {
            return user.phone;
        },
        setPhone : function(phone) {
            user.phone = phone;
            storage.setItem(key, JSON.stringify(user));
            console.log('saved user:' + JSON.stringify(user));
        }
    };
}])
;

