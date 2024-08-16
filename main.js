'use strict';

let app = angular.module("myApp", ["ngRoute"]);
app.config(function($routeProvider, $sceDelegateProvider) {
    //allow all videos from Youtube and google sheets to display
    $sceDelegateProvider.resourceUrlWhitelist(['self', '*://www.youtube.com/**', '*://docs.google.com/spreadsheets/**']);


    console.log("app loaded "+ Date.now())
    $routeProvider
        .when("/", {
            templateUrl : "landingPages/main.html"
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
        .when("/DIYing", {
            templateUrl : "landingPages/DIYing.html"
        })
        .when("/merch", {
            templateUrl : "landingPages/merch.html"
        })
}).directive('picBanner', ['$interval',  function($interval){
    function link(scope, element, attrs) {
        scope.headerPicFiles = [
            {name:"dogsPool.png"} ,
            {name:"sammyBomb.png", small_hide:true},
            {name:"Sunflower.png", small_hide:true},
            {name:"goatsLeaf.png"},
            {name:"waterGarden.png", small_hide:true},
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
}]).controller('mainController', function( $scope){
    $scope.headerPicFiles = [
        {name:"dogsPool.png"} ,
        {name:"sammyBomb.png", small_hide:true},
        {name:"Sunflower.png", small_hide:true},
        {name:"goatsLeaf.png"},
        {name:"waterGarden.png", small_hide:true},
        {name:"chickenSunrise.png", small_hide:true},
        {name:"prettyRadish.png"},
        {name:"skyChoke.png", small_hide:true},
        {name:"weldingArthur.png"},
    ];

}).controller('videoController', function( $scope){
// The URL to embed a YouTube video is https://www.youtube.com/embed/VIDEO_ID (instead of /short or whatever).
        $scope.videos = [
        {
            youtubeID: "3VR7YxoKQp8",
            //cz3icswXVF0 on arillian farm site goes public 8/30/24
            title: "McGoats Zoomies through the chicken coop"
        },
        {
            youtubeID: "NGgsXWeCsgI",
            //yKpOoAmH_YU? on arillian farm site goes public 8/30/24
            title: "Totes is king of the Coop"
        }
    ];

    $scope.getIframeSrc = function (videoId) {
        return 'https://www.youtube.com/embed/' + videoId;
    };
}).controller('pictureController', function( $scope){
    $scope.pictures = [
        {
            file: "hueyXena.png",
            caption: "Huey Loves Xexe bear!"
        }
    ];
}).controller('recipeController', function( $scope){
    $scope.recipes = [
        {
            name: "pickled onions",
            pic: "pickledonions.png",
            ingredients: [
                "1 onion",
                "3/4 cup beet juice",
                "3/4 cup white vinegar",
                "1 tsp dry mustard seed",
                "1/2 tbsp salt",
                "3/8 cup white sugar",
                "1 spring fresh rosemary"
            ],
            steps: [
                "Slice the onion into thin rings (I used a medium yellow onion, but I based this on ingredients from a jar of pickled purple onions so I suspect any bulbous onion is fine)",
                "put the onion slices and all other ingredients into a sterile mason jar",
                "seal the jar and shake until all sugar and salt are dissolved",
                "leave in fridge for at least three days to marinate"],
            notes: "great on sandwiches, salads or rice"
        }
    ];

    $scope.searchRecipes = function(term){

    };
}).controller('projectController', function( $scope){
    $scope.recipes = [
        {
            name: "pond",
            phases: [
                {
                    pics: [],
                    tools: [],
                    materials: [],
                    text: ""
                }
            ]
        }
    ];
}).controller('blogController', function( $scope){
    $scope.sortOldFirst = false;
    $scope.getIframeSrc = function (url) {
        return url;
    };

    $scope.blogEntriesRaw = [
        {
            entry_number: 1,
            entry_date: "August 9, 2024",
            entry_subject: "Do Folks Even Read Blogs?",
            entry_paragraphs: [
                    {
                        bold:false,
                        text:"So I’ve been working on this website for a few days now and I’ve been poking around the internet, checking out sites from authors who have content on the web (do people still say web?)"
                    },
                {
                    bold:false,
                    text: "I was checking out a few different authors that are doing direct marketing and cutting out social media platforms etc (which is what I want to do… develop my own brand and get folks to want to bother to come find my little nook on the web and throw a couple bucks my way if they enjoyed it) and I noticed everyone seems to have a blog. I don’t actually believe that people read blogs in this day and age (do people still say day and age? … is it day and age or day in age?), but I think that the more “content” I have and the more links there are to click, the better SEO my site will have… maybe. Okay, so now I think I’m going to put a task on my Kanban Board about reading some SEO articles. Byyyyyyeeeee."
                }
                ]
        },
        {
            entry_number: 2,
            entry_date: "August 9, 2024",
            entry_subject: "OMG I Love My Google Sheets Kanban",
            pic_file: "kanban1.png",
            link: "https://docs.google.com/spreadsheets/d/e/2PACX-1vQJC6WFdhJzehXvB2h_5yPAZsoQVBE7aT6oIhu1mrtGZ4G0hfzhyBuynwkqPvYJWYLfytprri2vwEqb/pubhtml",
            entry_paragraphs: [
                {
                    bold:false,
                text: 'When I decided (a few weeks ago) to make this site to get the Arillian Farm brand \"out there\", I decided to make (find a free template for) a Kanban board for myself like the one I used to use someone else was paying me to write software... and when I found a template and started throwing tasks on it... OMG it felt good!'
                },
                {
                    bold:false,
                    text: "It's like lifting thoughts out of my brain and putting them into a Pensive from Harry Potter or something. Having a place to jot down the millions of things I want to do in my life is such a relief! Being able to sort and search my dreams and acomplishments from my phone and my laptop is luxurious and oh goddamn the sweet sweet dopamine release when I change the status of a task to \"Finished\"... I've missed it. Doing things and keeping track of it is almost better than a puff of weed."
                }
            ]
        }
    ]

    $scope.expandTopEntry = function(a){
        if ($scope.sortOldFirst && a.entry_number === 1 ||  !$scope.sortOldFirst && a.entry_number === $scope.blogEntriesRaw.length){
            a.expanded = true
        } else {
            a.expanded = false;
        };
        return a;
    }

    $scope.toggleSortOldFirst = function(oldFirst){
        $scope.sortOldFirst = !oldFirst;
        $scope.sortBlogList();
    }

    $scope.sortBlogList = function(){
        return $scope.blogEntriesRaw.sort(function(a, b){
            a = $scope.expandTopEntry(a);
            return $scope.sortOldFirst ? a.entry_number - b.entry_number : b.entry_number - a.entry_number
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

    $scope.init = function(){
        $scope.blogEntries = $scope.sortBlogList();
    }
    $scope.init();
}).controller('booksController', function( $scope){
        $scope.unfettered_display_pages = ["frontCoverUnfet.jpg", "backCoverUnfet.jpg", "booksignunfet.png" ];
        $scope.hyperspear_display_pages = ["hyperspear1.png", "hyperspear2.png", "hyperspear3.png" ];

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
                   nextPage = currentIndex +1 <= ($scope.hyperspear_display_pages.length -1) ? $scope.hyperspear_display_pages[currentIndex +1] : $scope.hyperspear_display_pages[0];
                   $scope.hyperspear_display_page = nextPage;
                   break;
               default:
                currentIndex = pagesToUse.indexOf(displayPage);
                nextPage = currentIndex +1 <= ($scope.unfettered_display_pages.length -1) ? $scope.unfettered_display_pages[currentIndex +1] : $scope.unfettered_display_pages[0];
                $scope.unfettered_display_page = nextPage;
           }

        }


        $scope.init = function(){
            $scope.setNextDisplayPage();
            $scope.setNextDisplayPage('hyperspear');
        }
        $scope.init();
    })
$(document).ready(function(){
    console.log("document ready")



});

