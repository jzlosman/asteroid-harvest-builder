(function () {
  'use strict';

  angular.module('cards')
    .directive('game', game);

  game.$inject = ['$rootScope', '$timeout', '$interpolate', '$state','$log','CardsService','CardsHelper'];

  function game($rootScope, $timeout, $interpolate, $state, $log, CardsService, CardsHelper) {
    var directive = {
      retrict: 'E',
      link: link,
      scope: {
        cards: '='
      }
    };

    return directive;

    function link(scope, element) {
      function init(){
        getAllSourceCards();
      }
      scope.cards = {
        drawables: {
          pile: [],
          discard: []
        },
        resources: {
          pile: [],
          discard: []
        },
        asteroids: {
          pile: [],
          field: [],
          discard: []
        }
      }
      scope.source = [];
      
      function getAllSourceCards() {
        CardsService.query(function(cards){
          scope.source = cards;
          scope.cards.drawables.pile = CardsHelper.buildPartialDeck(scope.source,['Action'],[3])
          scope.cards.asteroids.pile = CardsHelper.buildPartialDeck(scope.source,['Asteroid'],[3])
          scope.cards.resources.pile = CardsHelper.buildPartialDeck(scope.source,['Resource'],[6])

          $log.log('drawables: ', scope.cards.drawables);
          $log.log('asteroids: ', scope.cards.asteroids);
          $log.log('resources: ', scope.cards.resources);

          scope.hand = CardsHelper.buildHand(scope.cards.drawables.pile,5);
          $log.log('your hand is ',scope.hand);
        });
      }

      function createAsteroidsPile(source){

      }

      function fillAsteroidField(field, deck){

      }

      function listener(event, toState) {
        var title = (getTitle($state.$current));
        $timeout(function () {
          element.text(title);
        }, 0, false);
      }

      function getTitle(currentState) {
        var applicationCoreTitle = 'MEAN.js';
        var workingState = currentState;
        if (currentState.data) {
          workingState = (typeof workingState.locals !== 'undefined') ? workingState.locals.globals : workingState;
          var stateTitle = $interpolate(currentState.data.pageTitle)(workingState);
          return applicationCoreTitle + ' - ' + stateTitle;
        } else {
          return applicationCoreTitle;
        }
      }
      init();
    }
  }
}());
