(function () {
  'use strict';

  angular
    .module('cards')
    .controller('CardsController', CardsController);

  CardsController.$inject = ['$scope', '$state', 'cardResolve', '$window', 'Authentication'];

  function CardsController($scope, $state, card, $window, Authentication) {
    var vm = this;

    vm.card = card;
    vm.authentication = Authentication;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    vm.options = {
      types: ['Action', 'Asteroid', 'Resource', 'Character', 'Contract']
    };

    // Remove existing Article
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.card.$remove($state.go('cards.list'));
      }
    }

    // Save Article
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.articleForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.card._id) {
        vm.card.$update(successCallback, errorCallback);
      } else {
        vm.card.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('cards.view', {
          cardId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
