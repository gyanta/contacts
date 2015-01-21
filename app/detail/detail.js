(function(){
    "use strict";

    angular.module('contacts.detail',['ngRoute', 'contacts.data'])
        .config(['$routeProvider', function($routeProvider) {
            $routeProvider.when('/detail/:id', {
                templateUrl: 'detail/detail.html',
                controller: 'DetailController',
                resolve: {
                    contact: ['contactFactory', '$route', function(contactFactory, $route){
                        return contactFactory.findById($route.current.params.id);
                    }]
                }
            });
        }])
        .controller('DetailController',['$scope','contact', '$location', function($scope, contact, $location){
            if(!contact){
                $location.path( "/" );
            }
            $scope.contact = contact;
        }]);
})();