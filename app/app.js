(function(){
    "use strict";

    angular.module('contacts',['ngRoute', 'contacts.list', 'contacts.detail'])
        .config(['$routeProvider', function($routeProvider) {
            $routeProvider.otherwise({redirectTo: '/list'});
        }])
        .directive('loadingIndicator', [function () {
            return {
                restrict: 'C',
                link: function(scope, element){
                    
                    var timer = null;
                    element.css('display', 'none');
                    
                    scope.$on('$routeChangeStart', function() {

                        clearTimeout(timer);
                        
                        timer = setTimeout(function(){
                            scope.$apply(function(){
                                element.css('display', 'block');        
                            });
                        }, 100);
                        
                    });
                    
                    var hideLoading = function(){
                        clearTimeout(timer);
                        element.css('display', 'none');
                    }
                    
                    scope.$on('$routeChangeSuccess',hideLoading);  
                    scope.$on('$routeChangeError', hideLoading);
                }
            }
        }])

})();