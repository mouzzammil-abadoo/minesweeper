(function() {
    angular
        .module('Minesweeper')
        .config(config);

    function config($stateProvider) {

        $stateProvider
            .state('home', {
                url: '',
                templateUrl: 'tpl/minesweeper.tpl.html',
                controller: 'MinesweeperController',
                controllerAs: 'vm'
            })


    }
})();