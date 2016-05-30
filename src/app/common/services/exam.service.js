(function () {

    angular
        .module('lomaApp')
        .service('examService', examService);

    examService.$inject = ['$http',"LOMA_CONFIG"];


    function examService($http, LOMA_CONFIG) {
        
        this.getQuestionsByCategory = function(categoryId){
            return $http.get("{0}/{1}/{2}".format(LOMA_CONFIG.rootUrl, "api/exam/question", categoryId));
        }        
    }

})();