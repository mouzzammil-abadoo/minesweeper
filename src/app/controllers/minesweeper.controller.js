(function() {
    angular
        .module('Minesweeper')
        .controller('MinesweeperController', MinesweeperController)
        .directive('disableRightClick', function() {
            return {
                restrict: 'A',
                link: function(scope, element, attr) {
                    element.bind('contextmenu', function(e) {
                        e.preventDefault();
                    })
                }
            }
        });

    /* @ngInject */
    function MinesweeperController($scope) {
        var vm = this;

        vm.gridLength = parseInt(localStorage.gridLength) || 10;
        vm.minesNum = parseInt(localStorage.minesNum) || 10;

        vm.handleClick = handleClick;
        vm.uncoverSpot = uncoverSpot;
        vm.reset = init;

        init();

        function init() {
            vm.coordinates = [];
            vm.isWinMessageVisible = false;
            vm.hasLostMessageVisible = false;
            localStorage.gridLength = vm.gridLength;
            localStorage.minesNum = vm.minesNum;
            vm.minefield = {
                rows: []
            };

            for (var i = 0; i < vm.gridLength; i++) {
                var row = {
                    spots: []
                };
                for (var j = 0; j < vm.gridLength; j++) {
                    var spot = {};
                    spot.isCovered = true;
                    row.spots.push(spot);

                    var pos = {
                        row: i,
                        column: j

                    }
                    vm.coordinates.push(pos);
                }
                vm.minefield.rows.push(row);
            }

            vm.coordinates = _.shuffle(vm.coordinates);

            setMines();
            setNumbers();
        }

        function getSpot(row, column) {
            return vm.minefield.rows[row].spots[column];
        }


        function setMines() {
            for (var y = 0; y < vm.minesNum; y++) {
                if (vm.coordinates[y]) {
                    var spot = getSpot(vm.coordinates[y].row, vm.coordinates[y].column);
                    if (spot.content != 'mine')
                        spot.content = "mine";
                }
            }
        }

        function setNumbers() {
            for (var y = 0; y < vm.gridLength; y++) {
                for (var x = 0; x < vm.gridLength; x++) {
                    setSpotNum(x, y);
                }
            }
        }

        function setSpotNum(row, column) {
            var thisSpot = getSpot(row, column);

            if (thisSpot.content == 'mine')
                return;

            checkNeighbour(thisSpot, row - 1, column - 1);
            checkNeighbour(thisSpot, row - 1, column);
            checkNeighbour(thisSpot, row - 1, column + 1);
            checkNeighbour(thisSpot, row, column - 1);
            checkNeighbour(thisSpot, row, column + 1);
            checkNeighbour(thisSpot, row + 1, column - 1);
            checkNeighbour(thisSpot, row + 1, column);
            checkNeighbour(thisSpot, row + 1, column + 1);
        }

        function checkNeighbour(thisSpot, row, column) {
            if (vm.minefield.rows[row] && vm.minefield.rows[row].spots[column]) {
                if (vm.minefield.rows[row].spots[column].content == 'mine')
                    if (thisSpot.content)
                        thisSpot.content++;
                    else
                        thisSpot.content = 1;
            }
        }

        function handleClick(event, spot) {
            if (event.which == 3) {
                spot.isFlagged = !spot.isFlagged;
            }
        }

        function uncoverSpot(spot, x, y) {
            spot.isCovered = false;
            if (spot.content == "mine") {
                vm.hasLostMessageVisible = true;
                uncoverAllSpots();
            } else {
                if (!spot.content) {
                    revealAllBlanks(x, y);
                }
                if (hasWon()) {
                    vm.isWinMessageVisible = true;
                    uncoverAllSpots();
                }
            }
        }


        function hasWon() {
            for (var y = 0; y < vm.gridLength; y++) {
                for (var x = 0; x < vm.gridLength; x++) {
                    var spot = getSpot(y, x);
                    if (spot.isCovered && spot.content != "mine") {
                        return false;
                    }
                }
            }
            return true;
        }

        function uncoverAllSpots() {
            for (var y = 0; y < vm.gridLength; y++) {
                for (var x = 0; x < vm.gridLength; x++) {
                    vm.minefield.rows[x].spots[y].isCovered = false;
                }
            }
        }

        function revealAllBlanks(row, column) {
            revealBlank(row - 1, column - 1);
            revealBlank(row - 1, column);
            revealBlank(row - 1, column + 1);
            revealBlank(row, column - 1);
            revealBlank(row, column + 1);
            revealBlank(row + 1, column - 1);
            revealBlank(row + 1, column);
            revealBlank(row + 1, column + 1);

        }

        var nums = [1, 2, 3, 4, 5, 6, 7, 8];

        function revealBlank(row, column) {
            if (vm.minefield.rows[row] && vm.minefield.rows[row].spots[column]) {
                if (vm.minefield.rows[row].spots[column].isCovered && (!vm.minefield.rows[row].spots[column].content || nums.includes(vm.minefield.rows[row].spots[column].content))) {
                    vm.minefield.rows[row].spots[column].isCovered = false;
                    if (!vm.minefield.rows[row].spots[column].content) {
                        revealAllBlanks(row, column);
                    }
                }
            }
        }


    }
})();