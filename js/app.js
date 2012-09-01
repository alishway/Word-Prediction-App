var module = angular.module('myApp', []);

module.directive('chosen',function(){
    var linker = function(scope,element,attr) {
        scope.$watch('wordsList',function(){
            element.trigger('liszt:updated');
        })
        element.chosen();
    };

    return {
        restrict:'A',
        link: linker
    }
})


function WordsController($scope,$http) {
    $scope.url = 'words.json';
    $scope.wordsList = [];

    $scope.fetchWords = function() {
        $http.get($scope.url).then(function(result){
            $scope.wordsList = result.data;
        });
    }

    $scope.say = function(words){
   
        if (words !== undefined){
            sentence = "";
            for (word in words){
                sentence = sentence + words[word].name + ' ';
            }

            var audioword = new Audio("http://imedia-ventures.com/taptospeak/test.php?q=" + sentence);

            audioword.play();
        };
    }

    $scope.fetchWords();
}