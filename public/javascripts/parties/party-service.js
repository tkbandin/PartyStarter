angular.module('myApp')
.service('partyService', function($http) {

  this.getParties = function() {
    return $http.get('/parties');
  };

  this.getTodo = function(id) {
    return $http.get('/parties/' + id);
  };

  this.toggle = function(party) {
    return $http.get('/parties/' + party._id + '/toggle');
  };

  this.create = function(party) {
    return $http.post('/parties', party);
  };

  this.update = function(party) {
    return $http.put('/parties/' + party._id, party);
  };

  this.delete = function(party) {
    return $http.delete('/parties/' + party._id);
  };
});
