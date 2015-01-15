(function(){
    "use strict";

    angular.module('contacts.data', [])
        .factory('contactFactory',['$http', '$q', function($http, $q){
            var contacts = null;

            return {
                getContacts: function(){
                    return contacts || $http.get('http://api.randomuser.me/?results=10')
                            .then(function(response){
                                if(response.data.results){
                                    contacts = response.data.results.map(function(item){
                                        return item.user;
                                    });
                                }else{
                                    contacts = [];
                                }
                                return contacts;
                            })
                            .catch(function(){
                                alert('Cannot load contact list');
                            });
                },
                findById: function(id){
                    return $q.when(this.getContacts())
                        .then(function(result){
                            for(var i=0; i<result.length; i++){
                                if(result[i].username === id) {
                                    return result[i];
                                }
                            }
                        });
                }
            }
        }]);
})();

