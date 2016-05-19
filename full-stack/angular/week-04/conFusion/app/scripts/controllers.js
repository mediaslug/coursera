'use strict';

angular.module('confusionApp')

        .controller('MenuController', ['$scope', 'menuFactory', function($scope, menuFactory) {
            
            $scope.tab = 1;
            $scope.filtText = '';
            $scope.showDetails = false;
            
            // don't try to show menu by default
            $scope.showMenu = false;
            $scope.message = "Loading ...";
            
            
            $scope.dishes= [];
            menuFactory.getDishes()
            .then(
                
                // if success
                function(response) {
                    
                    $scope.dishes = response.data;
                    
                    // received response so, yes show menu
                    $scope.showMenu = true;

                }, 
                
                // if failure
                function(response) {
                    // set the message to the response error 
                    $scope.message = "Error: "+response.status + " " + response.statusText;
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

        .controller('FeedbackController', ['$scope', function($scope) {
            
            $scope.sendFeedback = function() {
                
                console.log($scope.feedback);
                
                if ($scope.feedback.agree && ($scope.feedback.mychannel == "")) {
                    $scope.invalidChannelSelection = true;
                    console.log('incorrect');
                }
                else {
                    $scope.invalidChannelSelection = false;
                    $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
                    $scope.feedback.mychannel="";
                    $scope.feedbackForm.$setPristine();
                    console.log($scope.feedback);
                }
            };
        }])

        .controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function($scope, $stateParams, menuFactory) {

            var dish= menuFactory.getDish(parseInt($stateParams.id,10));
            
            $scope.dish = {};
            $scope.showDish = false;
            $scope.message="Loading ...";
            
            menuFactory.getDish(parseInt($stateParams.id,10))
            .then(
                
                // success
                function(resposne) {
                    $scope.dish = resposne.data;
                    $scope.showDish = true;
                },
                
                // failure
                function(response) {
                    $scope.message = "Error: "+response.status + " " + response.statusText;
                }
            );
            
        }])

        .controller('DishCommentController', ['$scope', function($scope) {
            
            $scope.mycomment = {rating:5, comment:"", author:"", date:""};
            
            $scope.submitComment = function () {
                
                $scope.mycomment.date = new Date().toISOString();
                console.log($scope.mycomment);

                $scope.dish.comments.push($scope.mycomment);

                $scope.commentForm.$setPristine();

                $scope.mycomment = {rating:5, comment:"", author:"", date:""};
            }
        }])

        // Implement the IndexController required for home.html

        .controller('IndexController', ['$scope', 'menuFactory', 'corporateFactory', function($scope, menuFactory,      
        corporateFactory) {
            
            $scope.promotion = menuFactory.getPromotion(0);
            
            $scope.featuredDish = {};
            $scope.showDish = false;
            $scope.message="Loading ...";
            
            menuFactory.getDish(0)
            .then(
                function(response) {
                    $scope.featuredDish = response.data;
                    $scope.showDish = true;
                }, 
                
                function(response) {
                    $scope.message = "Error: "+response.status + " " + response.statusText;
                }
            );
            
            $scope.leader = corporateFactory.getLeader(3);
        }])

        // Implement the AboutController required for aboutus.html

        .controller('AboutController', ['$scope', 'corporateFactory', function($scope, corporateFactory) {
            $scope.leadership = corporateFactory.getLeaders();
        }])


;
