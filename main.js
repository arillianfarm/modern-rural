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
            templateUrl : "landingPages/videos.html",
            controller: "mainController"
        })
        .when("/main", {
            templateUrl : "landingPages/videos.html"
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
        .when("/hype123", {
            templateUrl : "landingPages/hyperspearch1to3.html"
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
                href: "https://www.zazzle.com/collections/fall_2024-119118606070157890",
                src:"assets/shopPic.png",
                view: 'merch',
                name: 'Merchandise'
            },{
                href: "#!projects",
                src:"assets/projects/catioF.png",
                view: 'projects',
                name: 'DIY Projects'
            },{
                href: "#!comics",
                src:"assets/comics/eyesAcrossTheSkies.png",
                view: 'comics',
                name: 'Comics'
            },{
                href: "#!books",
                src:"assets/books/hyperCover1.png",
                view: 'books',
                name: 'Books'
            },{
                href: "#!blog",
                src:"assets/blog/arsunrise.png",
                view: 'blog',
                name: 'Blog'
            }
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
}]).controller('mainController', function( $scope, $rootScope, dataService, $location, $anchorScroll, $timeout){

    $rootScope.smallView = window.innerWidth <= 400;
    $rootScope.windowHeight = window.innerHeight;

    $rootScope.data = {
        loading: false,
        recipes: null,
        projects: null,
        blog: null,
        pictures: null,
        videos: null,
        blogEntries: null,
        featuredBlogEntry: null,
        hyperspear_display_pages: null,
        hyperspear_display_page: null,
        unfettered_display_pages: null,
        unfettered_display_page: null,
        selected_chapters_pdf: null,
        collapse_nav_scroll: true
    };

    $scope.calculateAlbumContainerSize = function(){
        return $rootScope.smallView ? '25em' : '100%';
    };


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
        if (string && length){
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


    //put text into clipboard
    $scope.copyForClipboard = function(text) {
        navigator.clipboard.writeText(text).then(() => {
            console.log('Text copied to clipboard:' + text);
        })
        .catch(err => {
            console.error('Failed to copy text:  ', err);
        });
    };


    $rootScope.chokeweekvids = [
        {
            "youtubeID": "nU0Z_lkOx40",
            "title": "Growing Artichokes From Seeds in LaCroix Boxes (Crafting With Trash Ep 3)"
        },
        {
            "youtubeID": "Ug6_yLQvA0E",
            "title": "All choked up - Pruning Artichokes for quantity VS size of flower heads"
        },
        {
            "youtubeID": "ODRSl6mnIIA",
            "title": "Halve a Heart: Marinated Artichokes from Yard to Table"
        },
        {
            "youtubeID": "zHCYx1gUdu0",
            "title": "Goats, Totes & McGoats Eat Artichokes ‘cause They’ve Got High High Hopes"
        },
        {
            "youtubeID": "u1fo9vt0S9g",
            "title": "Will She Or Wont She? Leghorn hen thinks about jumping over to our dog's side of the fence"
        },
        {
            "youtubeID": "P1SMOgI1tas",
            "title": "Chicken treats our garden like her personal salad bar - Meh Monday"
        },
        {
            "youtubeID": "axsl0sfhCwo",
            "title": "Quick Desert Vegetable Garden Tour - Starting Over After a Scorching Summer - November 2024"
        }
    ];


    $rootScope.titleCaps = function(string){
        if (!string || !string.length){
            console.error("function $rootScope.titleCaps failed");
            return;
        }
        let allCapsWords = {
            "ai":"AI",
            "ai's":"AI's",
            "rpg":"RPG",
            "gg": "GG",
            "mib": "MIB",
            "az,": "AZ,",
            "az": "AZ"
        };

        let splitStr = string.toLowerCase().split(' ');
        for (var i = 0; i < splitStr.length; i++) {
            let currentWord = splitStr[i];
             if( allCapsWords[currentWord]){
                 splitStr[i] = allCapsWords[currentWord];
             } else {
                 splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
             }
            }
        return splitStr.join(" ");
    };


    //scroll to a specific entry on a specific view
    $scope.scrollToHashOrTop = function() {
        let locationHash = $location.hash();
        //handle case where second # in url has been encoded to %23
        let encodedURI = window.location.href;
        if ( /%23/.test(encodedURI) ){
            locationHash = encodedURI.split('%23')[1]
        }
        if (locationHash) {
            let view = ($location.path()||'projects').replace('/','');
            let featuredItemType = 'featuredProject';
            let rawCollection = 'projectsRaw'
            let fieldName = 'name';
            switch(view){
                case 'blog':
                    featuredItemType = 'featuredBlogEntry'
                    rawCollection = 'blogEntriesRaw'
                    fieldName = 'entry_subject';
                    break;
                case 'recipes':
                    featuredItemType = 'featuredRecipe'
                    rawCollection = 'recipesRaw'
                    break;
            }
            let matchingDoc = ($scope[rawCollection]||[]).find((item)=>{
                let hashName = $rootScope.assembleIDattribute(item[fieldName]);
                if (hashName === locationHash){
                    return true;
                };
            });
            $scope.data[featuredItemType] = matchingDoc;
            globalThis.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        } else {
            globalThis.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        }
    };

    $scope.scrollToBlogItem = function(docName){
        let hashLink = $scope.assembleIDattribute(docName);
        $location.hash(hashLink);
        let blogEntries =$scope.blogEntriesRaw && $scope.blogEntriesRaw.length ? $scope.blogEntriesRaw : $rootScope.data.blogEntries||[];
        $rootScope.data.featuredBlogEntry = blogEntries.find(item=>item.entry_subject==docName);
        $rootScope.data.collapse_nav_scroll = true;
        globalThis.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }

    $rootScope.assembleIDattribute = function(docName){
        return docName.split(" ").join("-").replace("'","").toLowerCase();
    }

    $scope.getBaseUrl = function() {
        let url = new URL(window.location.href);
        url.hash = "";
        return url.toString();
    }

    $scope.assembleHashLink = function(nameTitleField){
        let baseUrl = $scope.getBaseUrl()+"#!"+$location.path();
        let postHash = $scope.assembleIDattribute(nameTitleField);
        let hashLink = baseUrl+"#"+postHash;
        return hashLink;
    }

    $scope.putHashLinkOnClipboard = function(nameTitleField){
        let hashLink = $scope.assembleHashLink(nameTitleField);
        $scope.copyForClipboard(hashLink);
    };

    $scope.goToAlbum = function(albumName, albumType){
        $rootScope.data.loading = true;
        $timeout(function(){
            let albumNameTemp = albumName.toLowerCase();
            let filteredList = [];
            $scope.currentAlbum = albumName.toLowerCase();
            switch (albumType){
                case 'videos':
                    filteredList = $scope.videosRaw.filter((item)=>item.albums?.indexOf(albumNameTemp)>-1);
                    $rootScope.data.videos = filteredList;
                    break;
                case 'pictures':
                    filteredList = $scope.picturesRaw.filter((item)=>item.albums?.indexOf(albumNameTemp)>-1);
                    $rootScope.data.pictures = filteredList;
                    break;
                default:
                    break;
            }
            $rootScope.data.loading = false;
        },10);
    };

// VIDEO VIEW
    $scope.albumCovers = [
        {name: "new", thumbnail:"assets/headerPictures/android-chrome-192x192.png"},
        {name: "chickens", thumbnail:"assets/favicons/android-chrome-192x192.png"},
        {name: "dogs", thumbnail:"assets/faviconsXena/android-chrome-192x192.png"},
        {name: "gardens", hide_video_view: true, thumbnail:"assets/faviconsArtichoke/android-chrome-192x192.png"},
        {name: "goats", thumbnail:"assets/faviconsTotesMcGoats/android-chrome-192x192.png"},
        {name: "sky", hide_video_view: true, thumbnail:"assets/android-chrome-192x192.png"},
        {name: "wildlife", thumbnail:"assets/pictures/android-chrome-192x192.png"}
    ];

// PICTURE VIEW


//DIY PROJECTS VIEW
    $scope.setFeaturedProject = function(docName){
        let hashLink = $scope.assembleIDattribute(docName);
        $location.hash(hashLink);
        let projectList = $scope.projectsRaw?.length ? $scope.projectsRaw : $rootScope.data.projects || [];

        $rootScope.data.featuredProject = projectList.find(item=>item.name==docName);
        $rootScope.data.collapse_nav_scroll = true;
        globalThis.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }

// RECIPES VIEW
    $scope.setFeaturedRecipe = function(docName){
        let hashLink = $scope.assembleIDattribute(docName);
        $location.hash(hashLink);
        let recipeList = $scope.recipesRaw?.length ? $scope.recipesRaw : $rootScope.data.recipes || [];
        $rootScope.data.featuredRecipe = recipeList.find(item=>item.name==docName);
        $rootScope.data.collapse_nav_scroll = true;
        $timeout(()=>{
            globalThis.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        },25)
    }

    $scope.searchRecipes = function(term){
        //todo: write this function!
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
        let summary = `Recipe For ${recipe.name} ${ingredients} ${instructions}  Courtesy of Arillian Farm ${$scope.assembleHashLink(recipe.name)}`;
        $scope.copyForClipboard(summary);
    };


//BLOG VIEW
    $scope.assembleBlogSummary = function(blogEntry){
        let sumString = blogEntry.feature_section_1?.caption||((blogEntry?.sections||[{}])[0].paragraphs||[{}])[0]?.text || "";
        return $scope.trunc(sumString, 80);
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
            var pagesToUse = $rootScope.data.unfettered_display_pages;
            var displayPage = $rootScope.data.unfettered_display_page||"";
            var currentIndex;
            var nextPage;
            switch(book){
               case 'hyperspear':
                   pagesToUse = $rootScope.data.hyperspear_display_pages;
                   displayPage = $rootScope.data.hyperspear_display_page||"";
                   currentIndex = pagesToUse.indexOf(displayPage);
                   nextPage = currentIndex < 2 ? $rootScope.data.hyperspear_display_pages[currentIndex +1] : $rootScope.data.hyperspear_display_pages[0];
                   $rootScope.data.hyperspear_display_page = nextPage;
                   break;
               default:
                currentIndex = pagesToUse.indexOf(displayPage);
                nextPage = currentIndex < 2 ? $rootScope.data.unfettered_display_pages[currentIndex +1] : $rootScope.data.unfettered_display_pages[0];
                $rootScope.data.unfettered_display_page = nextPage;
           }

        }

    $rootScope.initializeView = function(view){
        let viewType = view.toLowerCase();
        let uninitializedViews = ['merch', 'about', 'comics', 'hype123'];
        if (viewType == '' || viewType == 'main'){
            viewType = 'videos';
        }
        if (uninitializedViews.indexOf(viewType) > -1){
            $scope.scrollToHashOrTop();
            return;
        }
        if (viewType == 'books'){
            $rootScope.data.unfettered_display_pages = ["frontCoverUnfet.jpg", "backCoverUnfet.jpg", "booksignunfet.png" ];
            $rootScope.data.unfettered_display_page = $rootScope.data.unfettered_display_pages[0];
            $rootScope.data.hyperspear_display_pages = ["hyperCover1.png", "hyperspear2.png", "hyperspear3.png" ];
            $rootScope.data.hyperspear_display_page = $rootScope.data.hyperspear_display_pages[0];
            $scope.scrollToHashOrTop();
            return;
        }
        $rootScope.data.loading = true;
        dataService.getData(viewType,$scope).then(function(dataArr) {
            if (['blog','pictures', 'videos', 'recipes'].indexOf(viewType) == -1){
                $rootScope.data[view] = dataArr;
            }
            switch(viewType){
                case 'recipes':
                    $scope.recipeSort = 'n2o';
                    $scope.recipesRaw = dataArr.reduce((acc, item) => {
                        if (item.featured) {
                            $rootScope.data.featuredRecipe = item;
                        }
                        //todo: this jankly handles entries where I forgot to put a pub date
                        item.published = item.pub_date ? new Date (item.pub_date) : new Date();
                        acc.push(item);
                        acc.sort((a, b) => b.published - a.published);
                        return acc;
                    }, []);
                    $scope.data.recipes = angular.copy($scope.recipesRaw);
                    break;
                case 'videos':
                case 'main':
                        $scope.videosRaw = dataArr;
                        $scope.goToAlbum('new', viewType);
                    break;
                    case 'pictures':
                        $scope.picturesRaw = dataArr;
                        $scope.goToAlbum('new', viewType);
                    break;
                case 'blog':
                    $scope.blogSort = 'n2o';
                    // Process blogs data
                    $scope.blogEntriesRaw = dataArr.reduce((acc, item) => {
                        if (item.featured_blog) {
                            $rootScope.data.featuredBlogEntry = item;
                        }
                        acc.push(item);
                        return acc;
                    }, []);
                    $scope.sortBlogList();
                    $rootScope.data.blogEntries = angular.copy($scope.blogEntriesRaw);
                    break;
                case 'projects':
                    $scope.projSort = 'n2o';
                    // Process blogs data
                    $scope.projectsRaw = dataArr.reduce((acc, item) => {
                        if (item.featured) {
                            $rootScope.data.featuredProject = item;
                        }
                        acc.push(item);
                        return acc;
                    }, []);
                    break;
                default:

            }
            $rootScope.data.loading = false;
            $scope.scrollToHashOrTop();
        });
    }
    $scope.init = function(){
        let viewType = ($location.path()).replace("/","");
        $scope.initializeView(viewType);
    };
    $scope.init();
    })
$(document).ready(function(){
    console.log("document ready")
});

