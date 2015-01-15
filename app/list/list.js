(function(){
    "use strict";

    angular.module('contacts.list',['ngRoute', 'contacts.data'])
        .config(['$routeProvider', function($routeProvider) {
            $routeProvider.when('/list', {
                templateUrl: 'app/list/list.html',
                controller: 'ListController',
                resolve: {
                    contacts: ['contactFactory', function(contactFactory){
                        return contactFactory.getContacts();
                    }]
                }
            });
        }])
        .controller('ListController', ['$scope', 'contacts', function($scope, contacts) {
            $scope.contacts = contacts;
        }])
        .directive('listItem', [function(){
            return{
                restrict: 'E',
                scope: {
                    contact: '='
                },
                templateUrl: 'app/list/listItem.html',
                link: function(scope){
                    scope.name = scope.contact.name.first + ' ' + scope.contact.name.last;
                }
            }
        }]);
})();