(function () {
  'use strict';

  angular
    .module('cards.services')
    .factory('Game', GameService);

  GameService.$inject = ['$log', 'Player', 'Deck', 'Socket'];

  function GameService($log, Player, Deck, Socket) {
    var Game = function() {
      this.rounds = 0;
      this.decks = {};
      this.players = [];
      this.board = [];
      this.turn = 0;
    };

    Game.prototype = {
      joinGame: function(id) {
        Socket.emit('join', id);
      },

      prepareGame: function(sourceCards) {
        this.decks.drawables = Deck.create(sourceCards, ['Action'], [4]);
        this.decks.resources = Deck.create(sourceCards, ['Resource'], [2]);
        this.decks.drawables.build();
        this.decks.resources.build();
        $log.log('game prepped', this.decks);
      },

      addPlayer: function(user, hero) {
        var player = Player.create();
        player.setUser(user);
        player.setHero(hero);
        this.players.push(player);
      },

      startGame: function() {
        if (this.players.length < 2) {
          $log.log('need more players');
        }
        this.startedAt = moment();
        Socket.emit('chatMessage', { type: 'host',  text: this.players[this.turn].hero.name + " it is your turn!" });
        $log.log('game ready ', this);
        this.players[this.turn].beginTurn(this.decks.drawables);
      },

      endTurn: function() {
        this.turn = (this.turn === 1) ? 0 : 1;
        this.players[this.turn].beginTurn(this.decks.drawables);
        Socket.emit('chatMessage', { type: 'host', text: this.players[this.turn].hero.name + " it is your turn!" });
      }

    };

    var model = {
      create: create
    };

    return model;
    function create() {
      return new Game();
    }
  }
}());
