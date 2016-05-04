(function () {
  'use strict';

  angular.module('cards')
    .directive('asteroidField', asteroidField);

  asteroidField.$inject = ['$rootScope', '$timeout', '$interpolate', '$state', '$log', 'CardsService', 'CardsHelper'];

  function asteroidField($rootScope, $timeout, $interpolate, $state, $log, CardsService, CardsHelper) {
    var directive = {
      retrict: 'E',
      link: link,
      scope: {
        cards: '='
      },
      template: "ASTEROID FIELD" +
      "<button ng-click='buildField()'>Build Asteroid Field</button><div class='row'>" +
      "<div class='col-xs-4' ng-repeat='card in field track by $index'><div class='asteroid'><h1>{{card.label}}</h1> <strong>Mineable resources remaining: {{card.amount}}</strong><br/><div class='energies'><span class='label' ng-repeat='energy in energies'>{{energy}}</span></div></div></div>" +
      "</div>"
    };

    return directive;

    function link(scope, element) {
      scope.field = [];

      scope.$watch('cards', function() {
        if (scope.cards !== undefined) {
          scope.buildField();
        }
      });

      scope.buildField = function() {
        var results = CardsHelper.buildHand(scope.cards, 6);
        scope.field = results.hand;
        scope.cards = results.deck;
        $log.log('asteroids deck is now ', scope.cards);
      };
    }
  }
}());
