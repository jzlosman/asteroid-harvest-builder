(function () {
  'use strict';

  angular
    .module('cards')
    .directive('gameActions', gameActions);

  gameActions.$inject = [/*Example: '$state', '$window' */];

  function gameActions(/*Example: $state, $window */) {
    return {
      template: '' +
      '<div>' +
        '<strong>{{scope.game.decks.drawables.pile.length}} cards</strong> in draw pile' +
        '' +
      '</div>',
      scope: {
        game: '='
      },
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
      }
    };
  }
}());
