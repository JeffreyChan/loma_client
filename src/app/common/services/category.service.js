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
            return $http.get("{0}/{1}".format(baseUrl, "api/category/root"));
        }

        var createCategoryFn = function (category) {
            return $http.post("{0}/{1}".format(baseUrl, "api/category"),
                category,
                { headers: { 'Content-Type': 'application/json' } });
        }

        var removeCategoryFn = function (entityId) {
            return $http.delete("{0}/{1}/{2}".format(baseUrl, "api/category", entityId));
        }

        var updateCategoryFn = function (category) {
            return $http.put("{0}/{1}/{2}".format(baseUrl, "api/category", category._id),
                category,
                { headers: { 'Content-Type': 'application/json' } });
        }

        return {
            getCategoryList: getCategoryListFn,
            getRootCategory: getRootCategoryFn,
            createCategory: createCategoryFn,
            removeCategory: removeCategoryFn,
            updateCategory: updateCategoryFn
        };
    }

})();