(function (app) {
  'use strict';
  app.registerModule('games', ['core', 'chat', 'chat.routes', 'cards', 'cards.services', 'users.services']);
  app.registerModule('games.routes', ['ui.router', 'core.routes']);
}(ApplicationConfiguration));
