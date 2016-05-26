(function () {

    angular
        .module('lomaApp')
        .service('categoryService', categoryService);

    categoryService.$inject = ['$http'];


    function categoryService($http) {
        var baseUrl = "http://localhost:2000";
        var getCategoryList = function () {
            return $http.get(baseUrl + '/api/category');
        };
        var getRootCategory = function () {
            return $http.get(baseUrl + '/api/category/root');
        }
        return {
            getCategoryList: getCategoryList,
            getRootCategory : getRootCategory
        };
    }

})();