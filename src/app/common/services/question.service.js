(function () {

    angular
        .module('lomaApp')
        .service('questionService', questionService);

    questionService.$inject = ['$http',"LOMA_CONFIG"];


    function questionService($http, LOMA_CONFIG) {
        this.getQuestionList = function (page, size) {
            page = page || 1;
            size = size || 10;
            return $http.get("{0}/{1}?page={2}&size={3}".format(LOMA_CONFIG.rootUrl, "api/question", page, size));
        };

        this.getRootCategory = function () {
            return $http.get("{0}/{1}".format(baseUrl, "api/category/root"));
        }

        this.createCategoryFn = function (category) {
            return $http.post("{0}/{1}".format(baseUrl, "api/category"),
                category,
                { headers: { 'Content-Type': 'application/json' } });
        }

        this.removeCategoryFn = function (entityId) {
            return $http.delete("{0}/{1}/{2}".format(baseUrl, "api/category", entityId));
        }

        this.updateCategoryFn = function (category) {
            return $http.put("{0}/{1}/{2}".format(baseUrl, "api/category", category._id),
                category,
                { headers: { 'Content-Type': 'application/json' } });
        }
    }

})();