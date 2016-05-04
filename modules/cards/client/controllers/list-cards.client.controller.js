(function () {
  'use strict';

  angular
    .module('cards')
    .controller('CardsListController', CardsListController);

  CardsListController.$inject = ['CardsHelper', 'CardsService', '$log'];

  function CardsListController(CardsHelper, CardsService, $log) {
    var vm = this;
    vm.hand = [];

    CardsService.query(function(cards) {
      vm.cards = cards;
      vm.deck = CardsHelper.buildDeck(cards);
      vm.hand = CardsHelper.buildHand(vm.deck, 5);
      $log.log('your hand is ', vm.hand);
    });

    vm.drawCard = function() {
      var draw = CardsHelper.drawCard(vm.deck);
      vm.deck = draw[1];
      vm.hand.push(draw[0]);
    };

  }
}());
