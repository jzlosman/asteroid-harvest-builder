(function () {
  'use strict';

  angular
    .module('cards')
    .directive('userHand', userHand);

  userHand.$inject = ['$log','CardsService', 'CardsHelper'];

  function userHand($log, CardsService, CardsHelper) {
    return {
      template: '<div class="user-hand"><button ng-click="drawHand()">Draw hand</button>'+
      '<div class="row">'+
        '<div ng-repeat="card in hand track by $index" class="col-sm-3 overlap" style="margin-bottom:12px;">'+
          '<div class="fullCard small" ng-if="card.type ==\'Action\'">'+
            '<img src="https://s3.amazonaws.com/gettattlemisc/harvest/backs/card_bg_action.jpg" style="width:100%; height:auto;"/>'+
            '<div class="cardLabel"><h1>{{card.label}}</h1></div>'+
            '<div class="cardImg"><img src="{{card.img}}" alt="{{card.label}}"></div>'+
            '<div class="cardCost">{{card.cost}}</div>'+
            '<div class="cardRequires">{{card.requires}}</div>'+
            '<div class="cardText">{{card.text}}</div>'+
          '</div>'+
          '<div class="fullCard small" ng-if="card.type ==\'Resource\'">'+
            '<img src="https://s3.amazonaws.com/gettattlemisc/harvest/backs/card_bg_resource.jpg" style="width:100%; height:auto;"/>'+
            '<div class="cardOverlay"><img src="{{card.img}}" alt="{{card.label}}"></div>'+
          '</div>'+
        '</div>'+
      '</div></div>',
      restrict: 'E',
      replace:true,
      scope: {
        pile: '=',
        hand: '='
      },
      link: function postLink(scope, element, attrs) {
        scope.drawHand = function(){
          var results = CardsHelper.buildHand(scope.pile,5);
          scope.pile = results.deck;
          scope.hand = results.hand;
          $log.log('your hand is ', scope.hand);
        };
      }
    };
  }
})();
