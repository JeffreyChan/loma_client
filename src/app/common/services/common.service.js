(function () {

    angular
        .module('lomaApp')
        .service('commonService', commonService);

    commonService.$inject = ["_"];

    function commonService(_) {
        var isEmptyOrNull = function (entity) {
            return _.isEmpty(entity) || entity === null || _.isUndefined(entity);
        }
        return {
            isEmptyOrNull: isEmptyOrNull
        };
    }

})();