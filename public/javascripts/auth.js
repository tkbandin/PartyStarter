angular.module('myApp')
.service('Auth', function($http, $q) {

  var currentUser = null;

  this.getCurrentUser = function() {
    return $http.get('/me')
    .then(res => {
      currentUser = res.data;
    })
    .catch(err => {
      console.log('ERROR:', err);
      return $q.reject(err.data);
    });
  };

  this.getCurrentUserSync = function() {
    return currentUser;
  };

  this.getCurrentUserParties = function(partyId) {
    return $http.get('/mypartydata/' + partyId)
    .then(res => {
      return res.data;
    })
    .catch(err => {
      console.log('ERROR:', err);
      return $q.reject(err.data);
    });
  };

  this.isLoggedIn = function() {
    return currentUser ? currentUser.email !== '' : false;
  };

  this.login = function(credentials) {
    return $http.post('/login', credentials)
    .then(res => {
      currentUser = res.data;
    })
    .catch(err => {
      console.log('ERROR:', err);
      return $q.reject(err.data);
    });
  };

  this.logout = function() {
    return $http.get('/logout')
    .then( res => {
      currentUser = null;
    });
  };

  this.createUser = function(user) {
    return $http.post('/signup', user)
    .then(res => {
      currentUser = res.data;
    })
    .catch(err => {
      console.log('ERROR:', err);
      return $q.reject(err.data);
    });
  };

  this.updateUser = function(user) {
    return $http.put('/' + user._id, user);
  };

  this.getCurrentUser();
});
