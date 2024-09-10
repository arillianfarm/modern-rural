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
        .when("/projects", {
            templateUrl : "landingPages/projects.html"
        })
        .when("/merch", {
            templateUrl : "landingPages/merch.html"
        })
        .otherwise( {
            redirectTo : "/"
        })
}).factory('dataService', ['$http', function($http) {
    //factory to retrieve data from Json Files for each landing page
        return {
            getData: function(category, scope) {
                if (!category || !scope){
                    return;
                }
                if (scope[category]) {
                    return Promise.resolve(scope[category]);
                 } else {
                    let filename = `pageData/${category}.json`;
                    return $http.get(filename).then(function(response) {
                        return Promise.resolve(response.data?.data);
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
        templateUrl: 'directives/picBanner.html',
    };
}]).directive('topMenu', [ function(){
    function link(scope, element, attrs) {

    }
    return {
        link: link,
        templateUrl: 'directives/topMenu.html'
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
                view: 'videos',
                name: 'Video Gallery'
            } ,
            {
                href: "#!recipes",
                src:"assets/recipes/hueyLovesPotatoeSalad.png",
                view: 'recipes',
                name: 'Recipes'
            } ,
            {
                href: "#!pictures",
                src:"assets/pictures/butterflysunrise.png",
                view: 'pictures',
                name: 'Photo Gallery'
            } ,{
                href: "https://www.zazzle.com/store/arillianfarm",
                src:"assets/shopPic.png",
                view: 'merch',
                name: 'Merchandise'
            },{
                href: "#!projects",
                src:"assets/projects/catio13.png",
                view: 'projects',
                name: 'DIY Projects'
            },{
                href: "#!comics",
                src:"assets/comics/eyesAcrossTheSkies.png",
                view: 'comics',
                name: 'Comics'
            },{
                href: "#!blog",
                src:"assets/blog/arsunrise.png",
                view: 'lbog',
                name: 'Blog'
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

    $rootScope.data = {
        recipes: null,
        projects: null,
        blog: null,
        pictures: null,
        videos: null,
        blogEntries: null,
        featuredBlogEntry: null
    };

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
        let summary = `Recipe For ${recipe.name} ${ingredients} ${instructions}  (courtesy of Arillian Farm ${$scope.assembleHashLink(recipe.name)})`;
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
    $scope.scrollToHashOrTop = function() {
        var hash = $location.hash();
        if (hash) {
            $anchorScroll();
            return;
        }
        $anchorScroll();
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
        if (!string || !string.length){
            console.error("function $rootScope.titleCaps failed");
            return;
        }

        let splitStr = string.toLowerCase().split(' ');
        for (var i = 0; i < splitStr.length; i++) {
                splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
            }
        return splitStr.join(" ");
    };

    $scope.scrollToBlogItem = function(docName){
         $scope.data.featuredBlogEntry = $scope.blogEntriesRaw.find(item=>item.entry_subject==docName)
    }

    $rootScope.assembleIDattribute = function(docName){
        return docName.split(" ").join("-").replace("'","");
    }

    $scope.assembleHashLink = function(nameTitleField){
        let preHash = $location['$$absUrl'];
        let postHash = $scope.assembleIDattribute(nameTitleField);
        let hashLink = `${preHash}#${postHash}`;
        return hashLink;
    }

    $scope.putHashLinkOnClipboard = function(nameTitleField){
        let hashLink = $scope.assembleHashLink(nameTitleField);
        $scope.copyForClipboard(hashLink);
    };

    $scope.goToAlbum = function(albumName, albumType){
        let albumNameTemp = albumName.toLowerCase();
        let filteredList = [];
        $scope.currentAlbum = albumName.toLowerCase();
        switch (albumType){
            case 'videos':
                filteredList = albumNameTemp == 'all' ? $scope.videosRaw : $scope.videosRaw.filter((item)=>item.albums?.indexOf(albumNameTemp)>-1);
                $scope.videos = filteredList;
                break;
            case 'pictures':
                filteredList = albumNameTemp == 'all' ? $scope.picturesRaw : $scope.picturesRaw.filter((item)=>item.albums?.indexOf(albumNameTemp)>-1);
                $scope.pictures = filteredList;
                break;
            default:
                break;
        }
        //TODO: write function to put a hash location in and then have a view for video / pic album
    };

// VIDEO VIEW
    $scope.albumCovers = [
        {name: "all", thumbnail:"assets/pictures/washingBeets.png"},
        {name: "chickens", thumbnail:"assets/favicons/android-chrome-192x192.png"},
        {name: "dogs", thumbnail:"assets/faviconsXena/android-chrome-192x192.png"},
        {name: "gardens", hide_video_view: true, thumbnail:"assets/faviconsArtichoke/android-chrome-192x192.png"},
        {name: "goats", thumbnail:"assets/faviconsTotesMcGoats/android-chrome-192x192.png"},
        {name: "sky", hide_video_view: true, thumbnail:"assets/pictures/sunsetsq.png"},
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
                   nextPage = currentIndex < 2 ? $scope.hyperspear_display_pages[currentIndex +1] : $scope.hyperspear_display_pages[0];
                   $scope.hyperspear_display_page = nextPage;
                   break;
               default:
                currentIndex = pagesToUse.indexOf(displayPage);
                nextPage = currentIndex < 2 ? $scope.unfettered_display_pages[currentIndex +1] : $scope.unfettered_display_pages[0];
                $scope.unfettered_display_page = nextPage;
           }

        }

    $rootScope.initializeView = function(view){
        let viewType = view.toLowerCase();
        let uninitializedViews = ['merch','main', 'about', 'comics', ''];
        if (uninitializedViews.indexOf(viewType) > -1){
            $scope.scrollToHashOrTop();
            return;
        }
        if (viewType == 'books'){
            $scope.unfettered_display_pages = ["frontCoverUnfet.jpg", "backCoverUnfet.jpg", "booksignunfet.png" ];
            $scope.unfettered_display_page = $scope.unfettered_display_pages[0];
            $scope.hyperspear_display_pages = ["hyperCover1.png", "hyperspear2.png", "hyperspear3.png" ];
            $scope.hyperspear_display_page = $scope.hyperspear_display_pages[0];
            $scope.scrollToHashOrTop();
            return;
        }
        dataService.getData(viewType,$scope).then(function(dataArr) {
            if (viewType != 'blog') {
                $rootScope.data[view] = dataArr;
            }
            switch(viewType){
                case 'recipes':
                    $scope.recipeSort = 'a2z';
                    break;
                case 'videos':
                    $scope.videosRaw = dataArr;
                    $scope.currentAlbum = 'all';
                    break;
                    case 'pictures':
                    $scope.currentAlbum = 'all';
                    $scope.picturesRaw = dataArr;
                    break;
                case 'blog':
                    $scope.blogSort = 'n2o';
                    // Process blogs data
                    $scope.blogEntriesRaw = dataArr.reduce((acc, item) => {
                        if (item.featured_blog) {
                            $scope.data.featuredBlogEntry = item;
                        }
                        acc.push(item);
                        return acc;
                    }, []);
                    $scope.sortBlogList();
                    $rootScope.data.blogEntries = angular.copy($scope.blogEntriesRaw);
                    break;
                case 'projects':
                    break;
                default:

            }
            $scope.scrollToHashOrTop();
        });
    }
    $scope.init = function(){
        let viewType = ($location.path()).replace("/","");

        $scope.initializeView(viewType);
        $scope.scrollToHashOrTop();
    };
    $scope.init();
    })
$(document).ready(function(){
    console.log("document ready")
});

