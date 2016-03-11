'use strict';

/**
 * @ngdoc function
 * @name anyandgoApp.controller:PedidoEditCtrl
 * @description
 * # PedidoEditCtrl
 * Controller of the anyandgoApp
 */
angular.module('anyandgoApp')
  .controller('PedidoEditCtrl', function ($scope, $location, Restangular, pedido) {
  var original = pedido;
  $scope.pedido = Restangular.copy(original);
  

  $scope.isClean = function() {
    return angular.equals(original, $scope.pedido);
  }

  $scope.destroy = function() {
    original.remove().then(function() {
      if(navigator.userAgent.match(/Zombie/)) {
          document.location.hash = "#/crud/pedido";
      } else {
        $location.path('/crud/pedido');
      }
    });
  };

  $scope.save = function() {
    $scope.pedido.put().then(function() {
      if(navigator.userAgent.match(/Zombie/)) {
          document.location.hash = "#/crud/pedido";
      } else {
        $location.path('/crud/pedido');
      }
    });
  };
});
