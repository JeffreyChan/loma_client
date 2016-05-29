(function () {

    angular
        .module('lomaApp')
        .service('categoryService', categoryService);

    categoryService.$inject = ['$http',"LOMA_CONFIG"];


    function categoryService($http, LOMA_CONFIG) {
        var getCategoryListFn = function (page, size) {
            page = page || 1;
            size = size || 10;
            return $http.get("{0}/{1}?page={2}&size={3}".format(LOMA_CONFIG.rootUrl,"api/category", page, size));
        };
        var getRootCategoryFn = function () {
            return $http.get("{0}/{1}".format(LOMA_CONFIG.rootUrl, "api/category/root"));
        }
        
        var getchildCategoryFn = function () {
            return $http.get("{0}/{1}".format(LOMA_CONFIG.rootUrl, "api/category/child"));
        }

        var createCategoryFn = function (category) {
            return $http.post("{0}/{1}".format(LOMA_CONFIG.rootUrl, "api/category"),
                category,
                { headers: { 'Content-Type': 'application/json' } });
        }

        var removeCategoryFn = function (entityId) {
            return $http.delete("{0}/{1}/{2}".format(LOMA_CONFIG.rootUrl, "api/category", entityId));
        }

        var updateCategoryFn = function (category) {
            return $http.put("{0}/{1}/{2}".format(LOMA_CONFIG.rootUrl, "api/category", category._id),
                category,
                { headers: { 'Content-Type': 'application/json' } });
        }

        return {
            getCategoryList: getCategoryListFn,
            getRootCategory: getRootCategoryFn,
            createCategory: createCategoryFn,
            removeCategory: removeCategoryFn,
            updateCategory: updateCategoryFn,
            getchildCategory: getchildCategoryFn
        };
    }

})();