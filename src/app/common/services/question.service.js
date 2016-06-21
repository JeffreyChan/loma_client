(function () {

    angular
        .module('lomaApp')
        .service('questionService', questionService);

    questionService.$inject = ['$http',"LOMA_CONFIG"];


    function questionService($http, LOMA_CONFIG) {
        
        this.getQuestionById = function(entityId){
            return $http.get("{0}/{1}/{2}".format(LOMA_CONFIG.rootUrl, "api/question", entityId));
        }
        
        this.getQuestionList = function (title, page, size) {
            page = page || 1;
            size = size || 10;
            return $http.get("{0}/{1}?page={2}&size={3}&title={4}".format(LOMA_CONFIG.rootUrl, "api/question", page, size, title));
        };

        this.createQuestion = function (question) {
            return $http.post("{0}/{1}".format(LOMA_CONFIG.rootUrl, "api/question"),
                question,
                { headers: { 'Content-Type': 'application/json' } });
        }

        this.updateOption = function (questionOption) {
             return $http.put("{0}/{1}/{2}".format(LOMA_CONFIG.rootUrl, "api/question/option", questionOption._id),
                questionOption,
                { headers: { 'Content-Type': 'application/json' } });
        }

        this.updateQuestion = function (question) {
            return $http.put("{0}/{1}/{2}".format(LOMA_CONFIG.rootUrl, "api/question", question._id),
                question,
                { headers: { 'Content-Type': 'application/json' } });
        }
        
        this.removeQuestion = function (entityId) {
            return $http.delete("{0}/{1}/{2}".format(LOMA_CONFIG.rootUrl, "api/question", entityId));
        }
    }

})();