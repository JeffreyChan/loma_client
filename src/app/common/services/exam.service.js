(function () {

    angular
        .module('lomaApp')
        .service('examService', examService);

    examService.$inject = ['$http', "LOMA_CONFIG"];


    function examService($http, LOMA_CONFIG) {

        this.getQuestionsByCategory = function (categoryId) {
            return $http.get("{0}/{1}/{2}".format(LOMA_CONFIG.rootUrl, "api/exam/question", categoryId));
        }
        this.createExamRecord = function (examRecord) {
            return $http.post("{0}/{1}".format(LOMA_CONFIG.rootUrl, "api/exam/record"),
                examRecord,
                { headers: { 'Content-Type': 'application/json' } });
        }
        
        this.getExamRecords = function (page, size) {
            page = page || 1;
            size = size || 10;
            return $http.get("{0}/{1}?page={2}&size={3}".format(LOMA_CONFIG.rootUrl, "api/exam/record", page, size));
        };
        
        this.getReviewRcord = function(recordId){
            return $http.get("{0}/{1}/{2}".format(LOMA_CONFIG.rootUrl, "api/exam/review", recordId));
        }
    }

})();