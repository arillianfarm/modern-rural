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
        .when("/petcare", {
            templateUrl : "landingPages/animalCare.html"
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
        scope.albumType = attrs.albumType;
    }
    return {
        link: link,
        templateUrl: 'directives/albumHeader.html'
    };
}]).directive('sectionThumbnails', [function(){
    function link(scope, element, attrs) {
        scope.thumbnails = [
            {
                href: "#!videos",
                src:"assets/hueyVidCap.png",
                view: 'Video Gallery'
            } ,
            {
                href: "#!recipes",
                src:"assets/recipes/pickledonions.png",
                view: 'Recipes'
            } ,
            {
                href: "#!pictures",
                src:"assets/pictures/butterflysunrise.png",
                view: 'Photo Gallery'
            } ,{
                href: "#!merch",
                src:"assets/arillianTshirt.png",
                view: 'Merchandise'
            },{
                href: "#!diying",
                src:"assets/diying/catio13.png",
                view: 'DIY Projects'
            },{
                href: "#!comics",
                src:"assets/comics/eyesAcrossTheSkies.png",
                view: 'Comics'
            },{
                href: "#!blog",
                src:"assets/blog/arsunrise.png",
                view: 'Blog'
            },
        ];
    }
    return {
        link: link,
        templateUrl: 'directives/sectionThumbnails.html'
    };
}]).directive('customBlog', [function(){
    function link(scope, element, attrs) {
        scope.blogData = JSON.parse(attrs.blogData);
    }
    return {
        link: link,
        templateUrl: 'directives/customBlog.html'
    };
}]).controller('mainController', function( $scope, $rootScope, dataService, $location, $anchorScroll){

    $rootScope.smallView = window.innerWidth <= 400;
    $rootScope.windowHeight = window.innerHeight;

    $scope.calculateAlbumContainerSize = function(){
        return $rootScope.smallView ? '25em' : '100%';
    };
    // UTILITY FUNCTIONS

    //function to test that ngclick events etc are firing
    $scope.sayClick = function(){
        console.log("click")
    };

    $scope.assembleAndCopyRecipeSummary = function(recipe){
        if (!recipe || !recipe.ingredients || !recipe.steps){
            return;
        }
        let ingredients = "INGREDIENTS: ";
        let instructions = " INSTRUCTIONS: ";
        for (let i =0; i< recipe.ingredients.length;i++){
            let ingredient = recipe.ingredients[i];
            ingredients += ` ${ingredient}`
            if (i < (recipe.ingredients.length -1)){
                ingredients += ",";
            }
        }
        for (let i =0; i< recipe.steps.length;i++){
            let step = recipe.steps[i];
            let stepNumber = i+1;
            instructions += `(${stepNumber}) ${step.instruction}`
        }
        let summary = `${ingredients} ${instructions}`;
        $scope.copyForClipboard(summary);
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

    // The URL to embed a YouTube video is https://www.youtube.com/embed/VIDEO_ID (instead of /short or whatever).
    $scope.getIframeSrcForYouTube = function (videoId) {
        return 'https://www.youtube.com/embed/' + videoId;
    };

    //scroll to a specific entry on a specific view
    $scope.scrollToHash = function() {
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

    $rootScope.titleCaps = function(string){
        let splitStr = string.toLowerCase().split(' ');
        for (var i = 0; i < splitStr.length; i++) {
                splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
            }
        return splitStr.join(" ");
    };

    $scope.scrollToBlogItem = function(docName){
         $scope.featuredBlogEntry = $scope.blogEntriesRaw.find(item=>item.entry_subject==docName)
    }

    $rootScope.assembleIDattribute = function(docName){
        return docName.split(" ").join("-");
    }

    $scope.putHashLinkOnClipboard = function(nameTitleField){
        let preHash = $location['$$absUrl'];
        let postHash = $scope.assembleIDattribute(nameTitleField);
        let hashLink = `${preHash}#${postHash}`;
        $scope.copyForClipboard(hashLink);
    };

    $scope.goToAlbum = function(albumName, albumType){
        let filteredList = [];
        $scope.currentAlbum = albumName;
        switch (albumType){
            case 'videos':
                filteredList = albumName == 'all' ? $scope.videosRaw : $scope.videosRaw.filter((item)=>item.albums?.indexOf(albumName)>-1);
                $scope.videos = filteredList;
                break;
            case 'pictures':
                filteredList = albumName == 'all' ? $scope.picturesRaw : $scope.picturesRaw.filter((item)=>item.albums?.indexOf(albumName)>-1);
                $scope.pictures = filteredList;
                break;
            default:
                break;
        }
        //TODO: write function to put a hash location in and then have a view for video / pic album
    };

// VIDEO VIEW
    $scope.albumCovers = [
        {name: "All", thumbnail:"assets/beaky.png"},
        {name: "Chickens", thumbnail:"assets/favicons/android-chrome-192x192.png"},
        {name: "Dogs", thumbnail:"assets/faviconsXena/android-chrome-192x192.png"},
        {name: "Gardens", hide_video_view: true, thumbnail:"assets/faviconsArtichoke/android-chrome-192x192.png"},
        {name: "Goats", thumbnail:"assets/faviconsTotesMcGoats/android-chrome-192x192.png"},
        {name: "Sky", hide_video_view: true, thumbnail:"assets/pictures/sunsetsq.png"},
        {name: "Wildlife", thumbnail:"assets/pictures/butterflysunrise.png"}
    ];

// PICTURE VIEW

//DIY PROJECTS VIEW

// RECIPES VIEW

    $scope.searchRecipes = function(term){
        //todo: write this function!
    };

//BLOG VIEW
    $scope.expandTopBlogEntry = function(a){
        //todo: this function is depricated
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
            //initialize  sorts
            $scope.recipeSort = 'a2z';
            $scope.blogSort = 'n2o';
            $scope.currentAlbum = 'all';

            //pull in page data
            const promises = [
                dataService.getData('recipes', $scope),
                dataService.getData('videos', $scope),
                dataService.getData('pictures', $scope),
                dataService.getData('blogs', $scope),
                dataService.getData('projects', $scope)
            ];
            Promise.all(promises)
                .then(([recipesResponse, videosResponse, picturesResponse, blogsResponse, projectsResponse]) => {
                    // Assign data to scope variables
                    $scope.recipes = recipesResponse.data;
                    $scope.videosRaw = videosResponse.data;
                    $scope.videos = videosResponse.data;
                    $scope.picturesRaw = picturesResponse.data;
                    $scope.pictures = picturesResponse.data;
                    $scope.projects = projectsResponse.data;

                    // Process blogs data
                    $scope.blogEntriesRaw = blogsResponse.data.reduce((acc, item) => {
                        if (item.featured_blog) {
                            $scope.featuredBlogEntry = item;
                        }
                        acc.push(item);
                        return acc;
                    }, []);
                    $scope.sortBlogList();
                    $scope.blogEntries = angular.copy($scope.blogEntriesRaw);
                })
                .catch(error => {
                    // Handle any errors during data fetching
                    console.error('Error fetching data:', error);
                });

            // dataService.getData('recipes',$scope).then(function(jsonObj1) {
            //     $scope.recipes = jsonObj1.data;
            //     //initialize videos
            //     dataService.getData('videos',$scope).then(function(jsonObj2) {
            //         $scope.videosRaw = jsonObj2.data;
            //         $scope.videos = jsonObj2.data;
            //         //initialize pictures
            //         dataService.getData('pictures',$scope).then(function(jsonObj3) {
            //             $scope.picturesRaw = jsonObj3.data;
            //             $scope.pictures = jsonObj3.data;
            //             //initialize  blogs
            //             $scope.blogSort = 'n2o';
            //             dataService.getData('blogs',$scope).then(function(jsonObj4) {
            //                 $scope.blogEntriesRaw = jsonObj4.data.reduce((acc,item)=>{
            //                     if (item.featured_blog){
            //                         $scope.featuredBlogEntry = item;
            //                     }
            //                     acc.push(item);
            //                     return acc;
            //                 },[]);
            //                 $scope.sortBlogList();
            //                 $scope.blogEntries = angular.copy($scope.blogEntriesRaw);
            //                 //initialize projects
            //                 dataService.getData('projects',$scope).then(function(jsonObj5) {
            //                     $scope.projects = jsonObj5.data;
            //                 });
            //             });
            //         });
            //     });
            // });


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

