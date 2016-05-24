'use strict';

angular.module('confusionApp')
        .constant("baseURL","http://localhost:3000/")

        .service('menuFactory', ['$resource', 'baseURL', function($resource, baseURL) {
            this.getDishes = function(){
                return $resource(baseURL+"dishes/:id", null, {'update': {method:'PUT'}});
            };
    
            this.getPromotion = function(){
//              return $resource(baseURL+"promotions/:id", null, {'update': {method:'PUT'}});
                return $resource(baseURL+"promotions/:id", null);
            };
                        
        }]);

        // Complete the corporateFactory to enable retrieval of information about all the leaders, 
        // or a selected leader (specified with a parameter)

        .factory('corporateFactory', ['$resource', 'baseURL', function($resource, baseURL) {    
            var corpfac = {};
            
            // get leaders from $resource
            corpfac.getLeaders = function() {
                return $resource(baseURL+"leadership/:id", null);
            }
            return corpfac;
        }])

;
