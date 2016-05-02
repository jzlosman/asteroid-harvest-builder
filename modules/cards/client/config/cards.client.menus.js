(function () {
  'use strict';

  angular
    .module('cards')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('topbar', {
      title: 'Cards',
      state: 'cards',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'cards', {
      title: 'List Cards',
      state: 'cards.list'
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'cards', {
      title: 'Create Card',
      state: 'cards.create',
      roles: ['user']
    });
  }
}());
