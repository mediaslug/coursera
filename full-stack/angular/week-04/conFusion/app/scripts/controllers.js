'use strict';

angular.module('confusionApp')

        .controller('MenuController', ['$scope', 'menuFactory', function($scope, menuFactory) {
            
            $scope.tab = 1;
            $scope.filtText = '';
            $scope.showDetails = false;
            
            // don't try to show menu by default
            $scope.showMenu = false;
            $scope.message = "Loading ..."; 
            
            menuFactory.getDishes().query(
                function(response) {
                    $scope.dishes = response;
                    $scope.showMenu = true;
                },
                function(response) {
                    $scope.message = "Error: " + response.status + " " + response.statusText;
                }
            );
                        
            $scope.select = function(setTab) {
                $scope.tab = setTab;
                
                if (setTab === 2) {
                    $scope.filtText = "appetizer";
                }
                else if (setTab === 3) {
                    $scope.filtText = "mains";
                }
                else if (setTab === 4) {
                    $scope.filtText = "dessert";
                }
                else {
                    $scope.filtText = "";
                }
            };

            $scope.isSelected = function (checkTab) {
                return ($scope.tab === checkTab);
            };
    
            $scope.toggleDetails = function() {
                $scope.showDetails = !$scope.showDetails;
            };
        }])

        .controller('ContactController', ['$scope', function($scope) {

            $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
            
            var channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];
            
            $scope.channels = channels;
            $scope.invalidChannelSelection = false;
                        
        }])

        .controller('FeedbackController',  ['$scope', 'feedbackFactory', function($scope, feedbackFactory) {
            
            $scope.sendFeedback = function() {                
                if ($scope.feedback.agree && ($scope.feedback.mychannel == "")) {
                    $scope.invalidChannelSelection = true;
                    console.log('incorrect');
                }
                else {
                    $scope.invalidChannelSelection = false;
                    feedbackFactory.getFeedback().save($scope.feedback);
                    console.log($scope.feedback);
                    $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
                    $scope.feedback.mychannel="";
                    $scope.feedbackForm.$setPristine();
                }
            };
        }])

        .controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function($scope, $stateParams, menuFactory) {
           // var dish= menuFactory.getDish(parseInt($stateParams.id,10));
            $scope.showDish = false;
            $scope.message="Loading ...";
            
            $scope.dish = menuFactory.getDishes().get({id:parseInt($stateParams.id,10)}).$promise.then(
                function(response) {
                    $scope.dish = response;
                    $scope.showDish = true;
                }, 
                
                function(response) {
                    $scope.message = "Error: "+response.status + " " + response.statusText;
                }
            );
        }])

        .controller('DishCommentController', ['$scope', 'menuFactory',function($scope, menuFactory) {
            
            $scope.mycomment = {rating:5, comment:"", author:"", date:""};
            
            $scope.submitComment = function () {
                
                $scope.mycomment.date = new Date().toISOString();
                console.log($scope.mycomment);

                $scope.dish.comments.push($scope.mycomment);
                menuFactory.getDishes().update({id:$scope.dish.id}, $scope.dish);
                $scope.commentForm.$setPristine();

                // reset the form
                $scope.mycomment = {rating:5, comment:"", author:"", date:""};
            }
        }])

        // Implement the IndexController required for home.html

        .controller('IndexController', ['$scope', 'menuFactory', 'corporateFactory', function($scope, menuFactory,      
        corporateFactory) {
            
            /* show the promotion */
            $scope.showPromotion = false;
            $scope.message="Loading ...";
            
            // this works as well. not sure what the correct implementation is:
            // $scope.promotion = menuFactory.getPromotion().query();
            // opted to go with the get method, since i know i only want one dish
            menuFactory.getPromotion().get({id:0}).$promise.then(
                function(response) {
                    $scope.promotion = response;
                    $scope.showPromotion = true;
                }, 
                
                function(response) {
                    $scope.message = "Error: "+response.status + " " + response.statusText;
                }
            );
            
            /* show the featured dish */
            $scope.showDish = false;   
            menuFactory.getDishes().get({id:0}).$promise.then(   
                function(response) {
                    $scope.featuredDish = response;
                    $scope.showDish = true;
                }, 
                
                function(response) {
                    $scope.message = "Error: "+response.status + " " + response.statusText;
                }
            );
            
            /* show the executive chef */
            $scope.showChef = false;
            corporateFactory.getLeaders().get({id:3}).$promise.then(
                function(response) {
                    $scope.showChef = true;
                     $scope.leader = response;
                },
                function(response) {
                    $scope.message = "Error: "+response.status + " " + response.statusText;
                }
            );
        }])

        // Implement the AboutController required for aboutus.html

        .controller('AboutController', ['$scope', 'corporateFactory', function($scope, corporateFactory) {
            $scope.showLeadership = false;
            corporateFactory.getLeaders().query().$promise.then(
                function(response) {
                   $scope.leadership = response;
                   $scope.showLeadership = true;
                },
                
                function(response) {
                    $scope.message = "Error: "+response.status + " " + response.statusText;
                }
            );
        }])


;
