'use strict';

let app = angular.module("myApp", ["ngRoute"]);
app.config(function($routeProvider,$locationProvider, $sceDelegateProvider) {
    //allow all videos from You tube and google sheets to display
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
        .otherwise( {
            redirectTo : "/"
        })
}).directive('picBanner', ['$interval',  function($interval){
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
}]).controller('mainController', function( $scope){
    console.log("main controller loaded")

    // UTILITY FUNCTIONS
    $scope.getIframeSrc = function (url) {
        return url;
    };
    
    // The URL to embed a YouTube video is https://www.youtube.com/embed/VIDEO_ID (instead of /short or whatever).
    $scope.getIframeSrcForYouTube = function (videoId) {
        return 'https://www.youtube.com/embed/' + videoId;
    };

// VIDEO VIEW

    $scope.videos = [
        {
            youtubeID: "cz3icswXVF0",
            title: "McGoats Zoomies through the chicken coop"
        },
        {
            youtubeID: "yKpOoAmH_YU",
            title: "Totes takes the ramp instead"
        },
        {
            youtubeID: "Uo8EC0U5iCo",
            title: "Chicks (a few weeks old) start exploring the world outside theyr brooding tent"
        },
        {
            youtubeID: "Ey92lBEr-Wc",
            title: "newly emerged from chrysalis, a Giant Swallow Tail stretches its wings "
        },
        {
            youtubeID: "8uWjOiXSEO4",
            title: "Peach Faced Love Bird Parrots Eating My Mammoth Sunflowers"
        },
        {
            youtubeID: "hfUF5UTryYE?",
            title: "Sammy, my Ayam Cemani Rooster and Leggy Leghorn throwin' back swigs of water"
        }
    ];

// PICTURE VIEW

    $scope.pictures = [
        {
            file: "hueyXena.png",
            caption: "Huey Loves Xexe bear!"
        }
    ];

//DIY PROJECTS VIEW

    $scope.projects = [
        {
            name: "Catio",
            header_pic: "catio13.png",
            about: "",
            tools: [],
            materials: [],
            //1 phase = 1 google slide
            phases: [
                {
                    pic: "catio2.png",
                    text: ""
                },
                {
                    pic: "catio3.png",
                    text: ""
                },{
                    pic: "catio5.png",
                    text: ""
                },{
                    pic: "catio6.png",
                    text: ""
                },{
                    pic: "catio7.png",
                    text: ""
                },{
                    pic: "catio8.png",
                    text: ""
                },{
                    pic: "catio9.png",
                    text: ""
                },{
                    pic: "catio10.png",
                    text: ""
                },{
                    pic: "catio11.png",
                    text: ""
                },{
                    pic: "catio12.png",
                    text: ""
                },
            ]
        }
    ];

// RECIPES VIEW

    $scope.recipes = [
        {
            name: "pickled onions",
            header_pic: "pickledonions.png",
            servings: "1 jar of pickled onions",
            ingredients: [
                "1 onion",
                "3/4 cup beet juice",
                "3/4 cup white vinegar",
                "1 tsp dry mustard seed",
                "1/2 tbsp salt",
                "3/8 cup white sugar",
                "1 spring fresh rosemary"
            ],
            steps: [{
                    pic: "",
                    instruction:"Slice the onion into thin rings or rainbows (I used a medium yellow onion, but I based this on ingredients from a jar of pickled purple onions so I suspect any bulbous onion is fine)"
                },
                {pic: "",
                    instruction:"put the onion slices and all other ingredients into a sterile mason jar"
                },{
                    pic: "",
                    instruction:"seal the jar and shake until all sugar and salt are dissolved"
                },{
                    pic: "",
                    instruction: "leave in fridge for at least three days to marinate"
            }],
            notes: "great on sandwiches, salads or rice"
        },
        {
            name: "creamy avocado, pickled onion wontons",
            header_pic: "wontons6.png",
            servings: "1 wonton",
            ingredients: [
                "pinch of pickled onions",
                "1 wonton wrapper",
                "3-5 chunks of fresh avocado",
                "a bit of chopped walnut (optional)",
                "1 healthy glob of cream cheese",
                "oil (to coat wonton wrapper)"
            ],
            steps: [{
                pic: "wontons1.png",
                instruction:"coat the outside of wonton wrapper with oil then put all ingredients on un-oiled side"
            },
                {
                    instruction:"fold wonton wrapper around filling and put into a muffin tray, silicon muffin cup or directly onto the rack of an air frier"
                },{
                    instruction:"set temp to 385 and air fry for 4-6 minutes or until outside is browned"
                },{
                    pic: "wontons4.png",
                    instruction: "let cool and enjoy"
                }],
            notes: "Pairs nicely with your favorite nugget dipping sauces"
        },
        {
            name: "creamy banana walnut wonton",
            header_pic: "wontons5.png",
            servings: "1 wonton",
            ingredients: [
                "a bit of chopped walnut (optional)",
                "a slice of banana",
                "1 wonton wrapper",
                "1 healthy glob of cream cheese",
                "oil (to coat wonton wrapper)",
                "a few pinches of brown sugar",
            ],
            steps: [{
                pic: "wontons3.png",
                instruction:"coat the outside of wonton wrapper with oil then put all ingredients on un-oiled side"
            },
                {
                    instruction:"fold wonton wrapper around filling and put into a muffin tray, silicon muffin cup or directly onto the rack of an air frier"
                },{
                    instruction:"set temp to 385 and air fry for 4-6 minutes or until outside is browned"
                },{
                    pic: "wontons4.png",
                    instruction: "let cool and enjoy"
                }],
            notes: "this dish is bananas"},
        {
            name: "Baked egg in a cheese basket",
            header_pic: "becb.png",
            servings: "1 egg basket",
            ingredients: [
                "1/4 cup shredded cheese",
                "1 pad of butter",
                "1 egg",
                "salsa (optional)",
                "Greek yogurt and/or Sour Cream (optional)",
                "Chopped Green onions (optional)"
            ],
            steps: [{
                pic: "becb1.png",
                instruction:"put a pad of butter in a silicone or tin muffin cup then crack an egg on top of it"
            },
                {
                    pic: "becb2.png",
                    instruction:"sprinkle shredded cheese in a circle on a silicone tray or similar"
                },{
                    pic: "becb3.png",
                    instruction:"microwave the cheese for a few seconds, bake or airfry at 385F for about 2 min --or until cheese is melted"
                },{
                    pic: "becb4.png",
                    instruction: "let the cheese cool and peel if of baking mat, then drape it over the back of a muffin cup, pop the egg and butter muffin cup in the air frier or ove and or bake or airfry (at 385) for another 3-5 minutes --until egg yolk is cooked to desired yolkiness and cheese is crisp, but not burnt"
                },{
                    pic: "becb.png",
                    instruction: "put egg in cheese basket and top with desired toppings"
                }],
            notes: "high fat low carb mmmm"}
    ];

    $scope.searchRecipes = function(term){
        //todo: write this function!
    };

//BLOG VIEW

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
    ];

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
            //init recipes
            $scope.recipeSort = 'a2z';
            //init blogs
            $scope.blogSort = 'n2o';
            $scope.blogEntries = $scope.sortBlogList();
            //init books
            $scope.setNextDisplayPage();
            $scope.setNextDisplayPage('hyperspear');
        }
        $scope.init();
    })
$(document).ready(function(){
    console.log("document ready")



});

