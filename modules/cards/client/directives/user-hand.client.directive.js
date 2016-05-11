(function () {
  'use strict';

  angular
    .module('cards')
    .directive('userHand', userHand);

  userHand.$inject = ['$log', 'CardsService', 'CardsHelper'];

  function userHand($log, CardsService, CardsHelper) {
    return {
      template: '<div class="user-hand">' +
      '<div class="row">' +
        '<div ng-repeat="card in player.hand track by $index" class="col-sm-3 overlap" style="margin-bottom:12px;">' +
          '<div class="fullCard small" ng-if="card.source.type ==\'Action\'" ng-click="playCard(card)">' +
            '<img src="https://s3.amazonaws.com/gettattlemisc/harvest/backs/card_bg_action.jpg" style="width:100%; height:auto;"/>' +
            '<div class="cardLabel"><h1>{{card.source.label}}</h1></div>' +
            '<div class="cardImg"><img src="{{card.source.img}}" alt="{{card.source.label}}"></div>' +
            '<div class="cardCost">{{card.source.cost}}</div>' +
            '<div class="cardRequires">{{card.source.requires}}</div>' +
            '<div class="cardText">{{card.source.text}}</div>' +
          '</div>' +
          '<div class="fullCard small" ng-if="card.type ==\'Resource\'">' +
            '<img src="https://s3.amazonaws.com/gettattlemisc/harvest/backs/card_bg_resource.jpg" style="width:100%; height:auto;"/>' +
            '<div class="cardOverlay"><img src="{{card.source.img}}" alt="{{card.source.label}}"></div>' +
          '</div>' +
        '</div>' +
      '</div></div>',
      restrict: 'E',
      replace: true,
      scope: {
        player: '=',
        game: '='
      },
      link: function postLink(scope, element, attrs) {
        scope.drawHand = function() {
          scope.player.fillHand(scope.game.decks.drawables, 5);
          $log.log('your hand is ', scope.player.hand);
        };

        scope.playCard = function(card) {
          $log.log('attempting to play ', card, scope.player.magic);
          if (scope.player.playCard(card)) {
            scope.game.decks.drawables.discard(card);
          }
        }
      }
    };
  }
}());
