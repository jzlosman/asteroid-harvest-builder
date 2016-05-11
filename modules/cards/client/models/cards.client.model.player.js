(function() {
  'use strict';


  angular
    .module('cards.services')
    .factory('Player', PlayerService);

  PlayerService.$inject = ['$log', 'Socket'];

  function PlayerService($log, Socket) {

    var Player = function() {
      this.magic = [2, 0];
      this.hand = [];
      this.first = true;
      this.health = 8;
      this.defense = 0;
      this.attack = 0;
      this.buffs = [0, 0];
      $log.log('player constructor');
    };

    Player.prototype = {

      setHero: function(card) {
        this.hero = card;
      },

      setUser: function(user) {
        this.user = user;
      },

      setHand: function(cards) {
        this.hand = cards;
      },

      addCard: function(card) {
        this.hand.push(card);
      },

      buff: function(attack, defense) {
        this.buffs = [attack, defense];
        this.attack = this.hero.attack + attack;
        this.defense = this.hero.defense + defense;
      },

      takeDamage: function(damage) {
        this.health -= damage;
        if (this.health <= 0) {
          this.down = true;
        }
        return this.down;
      },

      revive: function() {
        this.health = this.hero.health;
        this.down = false;
      },

      fillHand: function(deck, x) {
        var vm = this;
        _.times(x, function(i) {
          vm.hand.push(deck.draw());
        });
      },

      playCard: function(card) {
        if (this.magic[0] - this.magic[1] >= card.source.requires) {
          this.magic[1] += card.source.requires;
          Socket.emit('chatMessage', { type: 'play', text: "I just played " + card.source.label + " using " + card.source.requires + " magic!" });
          Socket.emit('chatMessage', { type: 'update', text: "I now have " + (this.magic[0]-this.magic[1]) + " magic remaining." });
        } else {
          $log.log('you do not have enough magic stored for this');
        }
      },

      beginTurn: function(deck) {
        if (this.first) {
          this.fillHand(deck, 5);
          this.first = false;
        } else {
          this.magic[0] += 1;
          this.magic[1] = 0;
          if (this.hand.length < 5) {
            this.addCard(deck.draw());
          }
        }
      }
    };

    return {
      create: function() {
        return new Player();
      }
    };
  }
}());
