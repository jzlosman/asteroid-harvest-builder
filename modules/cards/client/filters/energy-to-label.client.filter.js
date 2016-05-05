(function () {
  'use strict';

  angular
    .module('cards')
    .filter('energyToLabel', energyToLabel);

  energyToLabel.$inject = [/*Example: '$state', '$window' */];

  function energyToLabel(/*Example: $state, $window */) {
    return function (input) {
      // Energy to label directive logic
      // ...
      return input.toLowerCase();
    };
  }
})();
