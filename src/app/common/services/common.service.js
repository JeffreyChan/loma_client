(function () {

    angular
        .module('lomaApp')
        .service('commonService', commonService);

    commonService.$inject = ['$http', "_"];

    function commonService($http, _) {
        var isEmptyOrNull = function (entity) {
            return _.isEmpty(entity) || entity === null || _.isUndefined(entity);
        }
        return {
            isEmptyOrNull: isEmptyOrNull
        };
    }

})();