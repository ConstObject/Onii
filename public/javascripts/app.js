angular.module('app', [])
.service('AniSearch', function($http) {
        var func = {};

        $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

        func.myAniSearch = function(search, username, password) {
                return $http.post('/api/mal/anime/search',
                       { q:search, uname:username, pword:password });
        };
        func.crAniSearch = function(search) {
                return $http.post('/api/cr/anime/search?test=ACBD',
                       { q:search, test:'ABCDEFG' });
        };
        return func;
})
.controller('AnimeSearchCtrl', function($scope, AniSearch) {
        
        $scope.malSearch = function() {
                
                $scope.MAL = "";
                $scope.ErrorMSG = "";
                
                AniSearch.myAniSearch($scope.animeName, 'ConstObject', 'CENSORED')
                .success(function(data) {
                        if(data.anime !== undefined) {
                            $scope.MAL = data.anime.entry;
                            crSearch(data.anime.entry.english);
                        }
                        else
                            $scope.ErrorMSG = data.Error;
                })
                .error(function(data) {
                        $scope.ErrorMSG = "An unknown error has accrued";
                });
        };

        function crSearch(englishAnimeName) {
                AniSearch.crAniSearch(englishAnimeName)
                .success(function(crData) {
                        if(crData.anime !== undefined)
                            $scope.CR = crData.anime;
                        else 
                            $scope.ErrorMSG = "No crunchyroll results";
                });
        }
});
