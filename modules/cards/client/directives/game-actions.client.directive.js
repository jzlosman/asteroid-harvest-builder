(function () {
  'use strict';

  angular
    .module('cards')
    .directive('gameActions', gameActions);

  gameActions.$inject = [/*Example: '$state', '$window' */];

  function gameActions(/*Example: $state, $window */) {
    return {
      template: ''+
      '<div>'+
        '<strong>{{drawables.length}} cards</strong> in draw pile'+
        ''+
      '</div>',
      restrict: 'E',
      scope: {
        drawables: '=',
        resources: '=',
        field: '=',
        user: '='
      },
      link: function postLink(scope, element, attrs) {

      }
    };
  }
})();
