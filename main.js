'use strict';

let app = angular.module("myApp", ["ngRoute"]);
app.config(function($routeProvider,$locationProvider, $sceDelegateProvider) {
    //allow all videos from YouTube and google sheets to display
    $sceDelegateProvider.resourceUrlWhitelist(['self', '*://www.youtube.com/**', '*://docs.google.com/spreadsheets/**']);
    // $locationProvider.hashPrefix("");
    //$locationProvider.html5Mode(true);
    console.log("app loaded "+ Date.now())
    $routeProvider
        .when("/", {
            templateUrl : "landingPages/main.html",
            controller: "mainController"
        })
        .when("/main", {
            templateUrl : "landingPages/main.html"
        })
        .when("/pets", {
            templateUrl : "landingPages/animalCare.html"
        })
        .when("/about", {
            templateUrl : "landingPages/about.html"
        })
        .when("/books", {
            templateUrl : "landingPages/books.html"
        })
        .when("/comics", {
            templateUrl : "landingPages/comics.html"
        })
        .when("/recipes", {
            templateUrl : "landingPages/recipes.html"
        })
        .when("/blog", {
            templateUrl : "landingPages/blog.html"
        })
        .when("/videos", {
            templateUrl : "landingPages/videos.html"
        })
        .when("/pictures", {
            templateUrl : "landingPages/pictures.html"
        })
        .when("/diying", {
            templateUrl : "landingPages/diying.html"
        })
        .when("/merch", {
            templateUrl : "landingPages/merch.html"
        })
        .when("/album", {
            templateUrl : "landingPages/album.html"
        })
        .when("/archive", {
            templateUrl : "landingPages/archive.html"
        })
        .otherwise( {
            redirectTo : "/"
        })
}).factory('dataService', ['$http', function($http) {
    //factory to retrieve data from Json Files for each landing page
        return {
            getData: function(category, $scope) {
                if ($scope[category]) {
                    return Promise.resolve($scope[category]);
                 } else {
                    let filename = `pageData/${category}.json`;
                    return $http.get(filename).then(function(response) {
                        //data = response.data;
                        return response.data;
                    });
                }
            }
        };
    }]).directive('picBanner', [ function(){
    function link(scope, element, attrs) {
        scope.headerPicFiles = [
            {name:"dogsPool.png"} ,
            {name:"sammyBomb.png", small_hide:true},
            {name:"Sunflower.png", small_hide:true},
            {name:"waterGarden.png", small_hide:true},
            {name:"cooking.png",small_hide:true},
            {name:"goatsLeaf.png"},
            {name:"chickenSunrise.png", small_hide:true},
            {name:"prettyRadish.png"},
            {name:"skyChoke.png", small_hide:true},
            {name:"weldingArthur.png"},
        ];
    }
    return {
        link: link,
        templateUrl: 'directives/picBanner.html'
    };
}]).directive('clickIcons', [function(){
    function link(scope, element, attrs) {
    }
    return {
        link: link,
        templateUrl: 'directives/clickIcons.html'
    };
}]).directive('contentSearch', [function(){
    function link(scope, element, attrs) {
    }
    return {
        link: link,
        templateUrl: 'directives/contentSearch.html'
    };
}]).directive('albumHeader', [function(){
    function link(scope, element, attrs) {
    }
    return {
        link: link,
        templateUrl: 'directives/albumHeader.html'
    };
}]).controller('mainController', function( $scope, dataService,$location, $anchorScroll){
    console.log("main controller loaded")

    // UTILITY FUNCTIONS

    //function to test that ngclick events etc are firing
    $scope.sayClick = function(){
        console.log("click")
    };

    $scope.toCaps = function(string, truncateLength){
        let newString;
        if (truncateLength){
            newString = (string.length > truncateLength ? `${string.substring(0,truncateLength)}...` : string);
        }
        return newString.toUpperCase();
    }

    $scope.trunc = function(string, length){
        let newString;
        if (length){
            newString = (string.length > length ? `${string.substring(0,length)}...` : string);
        }
        return newString;
    }


    //to route to an external url need to use this function
    $scope.getIframeSrc = function (url) {
        return url;
    };

    //scroll to a specific entry on a specific view
    $scope.scrollToHash = function() {
        //todo, will it be a problem that I include all views on the main page?
        var hash = $location.hash();
        if (hash) {
            $anchorScroll();
        }
    };

    //put text into clipboard
    $scope.copyForClipboard = function(text) {
        navigator.clipboard.writeText(text).then(() => {
            console.log('Text copied to clipboard:' + text);
        })
        .catch(err => {
            console.error('Failed to copy text:  ', err);
        });
    };

    $scope.scrollToBlogItem = function(docName){
        let newHash= `${docName.split(" ").join("-")}`;
        let hash = $location.hash(newHash);
        if (hash) {
            $anchorScroll();
        }
    }

    $scope.assembleIDattribute = function(docName){
        return docName.split(" ").join("-");
    }

    $scope.putHashLinkOnClipboard = function(nameTitleField){
        let preHash = $location['$$absUrl'];
        let postHash = $scope.assembleIDattribute(nameTitleField);
        let hashLink = `${preHash}#${postHash}`;
        $scope.copyForClipboard(hashLink);
    };

    $scope.copyToClipboard = function(){

    };

    // The URL to embed a YouTube video is https://www.youtube.com/embed/VIDEO_ID (instead of /short or whatever).
    $scope.getIframeSrcForYouTube = function (videoId) {
        return 'https://www.youtube.com/embed/' + videoId;
    };

    $scope.goToAlbum = function(){
        //TODO: write function to put a hash location in and then have a view for video / pic album
    };


// VIDEO VIEW
    $scope.albumCovers = [
        {name: "all", thumbnail:"assets/pictures/washbeetssq.png"},
        {name: "arillian Skies", thumbnail:"assets/pictures/sunsetsq.png"},
        {name: "chickens", thumbnail:"assets/faviconsSammy1/android-chrome-192x192.png"},
        {name: "dogs", thumbnail:"assets/faviconsXena/android-chrome-192x192.png"},
        {name: "gardens", thumbnail:"assets/faviconsArtichoke/android-chrome-192x192.png"},
        {name: "goats", thumbnail:"assets/faviconsTotesMcGoats/android-chrome-192x192.png"},
        {name: "wildlife", thumbnail:"assets/pictures/butterflysunrise.png"}
    ];

// PICTURE VIEW

//DIY PROJECTS VIEW

// RECIPES VIEW

    $scope.searchRecipes = function(term){
        //todo: write this function!
    };

//BLOG VIEW
    $scope.expandTopBlogEntry = function(a){
        if ($scope.blogSort === 'o2a' && a.entry_number === 1 || a.entry_number === $scope.blogEntriesRaw.length){
            a.expanded = true
        } else {
            a.expanded = false;
        };
        return a;
    };

    $scope.setBlogSortAndReorderList = function(sortType){
        let newSort = sortType || ((!$scope.blogSort || ($scope.blogSort === 'o2n')) ? 'n2o' : 'o2n');
        $scope.blogSort = newSort;
        $scope.sortBlogList();
    }

    $scope.sortBlogList = function(){
        return $scope.blogEntriesRaw.sort(function(a, b){
            a = $scope.expandTopBlogEntry(a);
            return $scope.blogSort === 'o2n' ? a.entry_number - b.entry_number : b.entry_number - a.entry_number;
        });
    };

    $scope.searchBlogs = function(term){
        if (term && term.toLowerCase){
            let lowTerm = term.toLowerCase();
            $scope.blogEntries = $scope.blogEntriesRaw.filter(function(item, index, arr) {
                let paragraphs = item.entry_paragraphs.reduce(function(acc, p){
                    return `${acc} ${p.text}`;
                },"");
                return paragraphs.toLowerCase().indexOf(lowTerm) > -1
            });
        }
    }

// BOOKS VIEW
        $scope.setNextDisplayPage = function(book){
            var pagesToUse = $scope.unfettered_display_pages;
            var displayPage = $scope.unfettered_display_page||"";
            var currentIndex;
            var nextPage;
            switch(book){
               case 'hyperspear':
                   pagesToUse = $scope.hyperspear_display_pages;
                   displayPage = $scope.hyperspear_display_page||"";
                   currentIndex = pagesToUse.indexOf(displayPage);
                   nextPage = currentIndex +1 >= ($scope.hyperspear_display_pages.length -1) ? $scope.hyperspear_display_pages[currentIndex +1] : $scope.hyperspear_display_pages[0];
                   $scope.hyperspear_display_page = nextPage;
                   break;
               default:
                currentIndex = pagesToUse.indexOf(displayPage);
                nextPage = currentIndex +1 >= ($scope.unfettered_display_pages.length -1) ? $scope.unfettered_display_pages[currentIndex +1] : $scope.unfettered_display_pages[0];
                $scope.unfettered_display_page = nextPage;
           }

        }

        $scope.init = function(){
            //initialize  recipes
            $scope.recipeSort = 'a2z';
            dataService.getData('recipes',$scope).then(function(jsonObj) {
                $scope.recipes = jsonObj.data;
            });

            //initialize videos
            dataService.getData('videos',$scope).then(function(jsonObj) {
                $scope.videos = jsonObj.data;
                $scope.currentVideoAlbum = 'all';
            });

            //initialize pictures
            dataService.getData('pictures',$scope).then(function(jsonObj) {
                $scope.pictures = jsonObj.data;
                $scope.currentPhotoAlbum = 'all';
            });

            //initialize  blogs
            $scope.blogSort = 'n2o';
            dataService.getData('blogs',$scope).then(function(jsonObj) {
                $scope.blogEntriesRaw = jsonObj.data;
                $scope.blogEntries = $scope.sortBlogList();
            });

            //initialize projects
            dataService.getData('projects',$scope).then(function(jsonObj) {
                $scope.projects = jsonObj.data;
            });

            //initialize  books
            $scope.unfettered_display_pages = ["frontCoverUnfet.jpg", "backCoverUnfet.jpg", "booksignunfet.png" ];
            $scope.hyperspear_display_pages = ["hyperspear1.png", "hyperspear2.png", "hyperspear3.png" ];
            $scope.setNextDisplayPage();
            $scope.setNextDisplayPage('hyperspear');

            $scope.scrollToHash();
        }
    $scope.init();
    })
$(document).ready(function(){
    console.log("document ready")



});

