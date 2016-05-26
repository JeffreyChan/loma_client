(function () {

    angular
        .module('lomaApp')
        .service('categoryService', categoryService);

    categoryService.$inject = ['$http'];


    function categoryService($http) {
        var baseUrl = "http://localhost:2000";
        var getCategoryListFn = function () {
            return $http.get(baseUrl + '/api/category');
        };
        var getRootCategoryFn = function () {
            return $http.get(baseUrl + '/api/category/root');
        }

        var createCategoryFn = function (category) {
            console.log("go,go");
            return $http.post(baseUrl + "/api/category", category,
                {headers: {'Content-Type': 'application/json'}});
        }

        return {
            getCategoryList: getCategoryListFn,
            getRootCategory: getRootCategoryFn,
            createCategory: createCategoryFn
        };
    }

})();