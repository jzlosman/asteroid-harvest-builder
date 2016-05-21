(function () {
  'use strict';

  // Games controller
  angular
    .module('games')
    .controller('GamesController', GamesController);

  GamesController.$inject = ['$scope', '$log', '$state', '$stateParams', 'Authentication', 'gameResolve', 'Socket', 'CardsService', 'CardsHelper', 'Game'];

  function GamesController ($scope, $log, $state, $stateParams, Authentication, game, Socket, CardsService, CardsHelper, Game) {
    var vm = this;

    vm.authentication = Authentication;
    vm.game = game;
    vm.session = null;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    vm.messages = [];
    init();

    function init() {
      if (!Authentication.user) {
        $state.go('home');
      }
      var hero = { name: Authentication.user.first };
      $log.log('user is ', Authentication.user);
      $log.log('game from server is ', vm.game);
      if (!vm.game._id) {
        return;
      }
      vm.session = Game.create();
      vm.session.joinGame(vm.game_id, hero);

      CardsService.query(function(cards) {
        vm.source = cards;
        vm.session.prepareGame(cards);
        $log.log('user is ', Authentication.user);
        if (_.findWhere(vm.game.players, { _id: Authentication.user._id }) === undefined) {
          vm.game.players.push({ user: Authentication.user._id, hero: hero.name });
          vm.game.$update();
        }
        _.each(vm.game.players, function(player) {
          vm.session.addPlayer(player.user, player.hero);
        });
        vm.session.startGame();
      });

      // Make sure the Socket is connected
      if (!Socket.socket) {
        Socket.connect();
      }

      Socket.on('join', function (message) {
        $log.log('someone joined');
      });

      Socket.on('move', function(message) {
        if (Authentication.user.username !== message.username) {
          $log.log('receiving move');
          vm.movePlayer(message.position, false);
        }
      });
      // Add an event listener to the 'chatMessage' event
      Socket.on('chatMessage', function (message) {
        vm.messages.unshift(message);
      });

      // Remove the event listener when the controller instance is destroyed
      $scope.$on('$destroy', function () {
        Socket.removeListener('chatMessage');
      });
    }

    // Remove existing Game
    function remove() {
      if (confirm('Are you sure you want to delete?')) {
        vm.game.$remove($state.go('games.list'));
      }
    }

    function saveGame() {
      vm.game.$update(function(success) {
        $log.log('saved successfully');
      }, function(err) {
        $log.log('error saving game', err);
      });
    }

    // Save Game
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.gameForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.game._id) {
        vm.game.$update(successCallback, errorCallback);
      } else {
        $log.log('game setup ', vm.game);
        vm.game.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('games.view', {
          gameId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
