angular.module('app', [])
.service('AniSearch', function($http) {
        var func = {};
        func.myAniSearch = function(search, username, password) {
                return $http.post('/api/mal/anime/search',
                { q:search, uname:username, pword:password });
        }
        return func;
})
.controller('AnimeSearchCtrl', function($scope, AniSearch) {
        
        $scope.malSearch = function() {
                AniSearch.myAniSearch($scope.animeName, 'ConstObject', 'CENSORED')
                .success(function(data) {
                        $scope.MAL = data.anime.entry;
                })
        }
});
