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
        cards: '=',
        field: '=',
        move: '&'
      },
      template: "" +
      "<button ng-click='buildField()'>Build Asteroid Field</button><div class='row'>" +
      "<div class='col-xs-4' ng-repeat='card in field track by $index'><div class='asteroid' ng-class='{\"occupied-you\":card.properties.occupied == 1, \"occupied-them\":card.properties.occupied == 2}' ng-click='move({position:$index, isYou:true})'>" +
      "<div class='pull-right'><strong><img src='https://s3.amazonaws.com/gettattlemisc/harvest/icons/crushing-ground.svg' style='width:24px;height:auto'/>x{{card.source.amount}}</strong></div>"+
      "<div class='pull-left energies'><span class='label label-default {{energy | energyToLabel}}' ng-repeat='energy in card.source.energies'>{{energy}}</span></div></div></div>" +
      "</div>"
    };

    return directive;

    function link(scope, element) {
      scope.buildField = function() {
        var results = CardsHelper.buildHand(scope.cards, 6);
        scope.field = results.hand;
        scope.cards = results.deck;
        $log.log('asteroids deck is now ', scope.cards);
      };
    }
  }
}());
