type TerrainTypes = "sky" | "grass" | "dirt" | "water";

// Eventually I might put something in here.
const catActivities = {
  Yarn: {},
  Milk: {},
  Eating: {},
  Sleeping: {},
};

type FavoriteCatActivities = keyof typeof catActivities;

class Constants {
  // all dims measured in pix
  public static TOOLBAR_HEIGHT = 16;

  public static MOUSE_SCROLL_DEADZONE = 40;
  public static MOUSE_SCROLL_SPEED = 3;

  public static SCREEN_WIDTH = 600;
  public static SCREEN_HEIGHT = 600;

  public static MAP_TILE_SIZE = 16;

  public static MAP_WIDTH_IN_TILES = 72;
  public static MAP_HEIGHT_IN_TILES = 60;
  public static WORLD_WIDTH = Constants.MAP_WIDTH_IN_TILES * Constants.MAP_TILE_SIZE;
  public static WORLD_HEIGHT = Constants.MAP_HEIGHT_IN_TILES * Constants.MAP_TILE_SIZE;

  public static SKY_HEIGHT_IN_TILES = 40;
  public static LEFT_WATER_WIDTH_IN_TILES = 4;
  public static INITIAL_BUILDER_LOCATIONX_IN_TILES = 20;
  public static GROUND_LOCATION_Y = Constants.SKY_HEIGHT_IN_TILES * Constants.MAP_TILE_SIZE;

  public static DEBUG_FLAGS = {
    DEBUG_ALL_CATS_LIKE_YARN: true,
    DEBUG_INITIAL_BUTTONS_COUNT: 50,
    SHORT_ACTIVITIES: true,
  };

  public static ROOM_WIDTH_IN_TILES  = 10;
  public static ROOM_HEIGHT_IN_TILES = 7;


  public static MAX_HOMELESS_CATS = 5;

  public static INITIAL_BUTTONS_COUNT = 12;

  public static CAT_ACTIVITIES = catActivities;

  public static TERRAIN_INFO: { 
    [key in TerrainTypes]: {
      collides: boolean;
    }
  } = {
    sky: {
      collides: false,
    },
    grass: {
      collides: true,
    },
    dirt: {
      collides: true,
    },
    water: {
      collides: true,
    },
  };

  public static EVENTS = {
    mouseover: 'mouseover',
    mouseout: 'mouseout'
  };

  public static COLORS = {
    SKY: 0x7ED2E4,
    WATER: 0x85B7E3,
    ELEVATOR: 0xBDFACE,
    CONDO: 0xd07fd0,
  }

  public static ROOM_TYPES = {
    condo: {
      name     : "Condo 1",
      capacity : 5,
      occupancy: 0,
      rent     : 5,
  
      cost: {
        buttons: 10,
      },
    },
  
    catLabratory: {
      name: "Cat Laboratailory",
      capacity : 0,
      occupancy: 0,
      rent     : 0,
  
      cost: {
        buttons: 200,
      },
    },
  
    yarnEmporium: {
      name: "Yarn Empurrrrrrium",
      capacity : 3,
      occupancy: 0,
      rent     : 0,
  
      cost: {
        buttons: 20,
      },
    },
  
    emptyRoom: {
      name: "Empty space",
      capacity : 0,
      occupancy: 0,
      rent     : 0,
  
      cost: {
        buttons: 1,
      },
    },
  };


  public static Strings = {
    CAT_NAMES: [
      // Fairly common cat names
      "Bread",
      "Cookie",
      "Buffy",
      "Banjo",
      "Billie Jean",
      "Bitsy",
      "Dot",
      "Dixie",
      "Daisy",
      "Dora",
      "Emma",
      "Jinx",
      "Jojo",
      "Lulu",
      "Luna",
      "Holly",
      "Mai Tai",
      "Patches",
      "Pearl",
      "Olive",
      "Mitsy",
      "Mimi",
      "Tabitha",
      "Sadie",
      "Sadie Mae",
      "Tiger",
      "Whiskers",
      "Fluffles",
      "Snickers",
      "Hersheys",
      "Zuzu",
      "Mew Mew",
      "Spencer",
      "Roosevelt",
      "Harris",
      "Snail",
      "Peter",

      "Charlie",
      "Tiger",
      "Shadow",
      "Sunny",
      "Sushi",
      "Blooregard",
      "Noodle",
      "Patchwork",
      "Furrball",
      "Andrea",
      "Puss",
      "Oscar",

      // Japanese names
      "Maru",
      "Miya",
      "Tama",
      "Niitama",
      "Yontama",
      "Nekomata",
      "Nabeneko",
      "Manzoku",
      "Shiro",
      "Kuro",
      "Tora",
      "Momo",
      "Koko",
      "Nabi",

      // Pop culture references
      "Shinji",
      "Asuka",
      "Naruto",
      "Ichigo",
      "Carly Rae",
      "Aang",
      "Zuko",
      "Seinfield",
      "Cloud",
      "Strife",
      "Bjork",
      "Drake",
      "Chance",
      "Gordon",
      "Ramsey",
      "Sam Smith",
      "Pocahontas",
      "Elvis",
      "Ariana",
      "Swift",
      "Zedd",
      "Sheeran",
      "Shawn",
      "Mendes",
      "Camila",
      "Gambino",
      "Weezer",

      // Neko Atsume references
      "Tubs",
      "Jeeves",
      "Pumpkin",
      "Lexy",
      "Snowball",
      "Xerxes",
      
      // Real names nyan-ified and puns
      "Danyiel",
      "Alexnyander",
      "Siennya",
      "Hannyah",
      "Connyor",
      "Franyk",
      "Annya",
      "Eleanyor",
      "Abenya",
      "Adannya",
      "Anyan",
      "Electro-cute",

      // Chips
      "Garligan",
      "Daisu",

      // Figures
      "Jobs",
      "Aivi",
      
      // Cats from media
      "Diana", // Sailor Moon, black
      "Jiji", // Kiki's Delivery Service, black
      "Maomolin", // Ranma 1/2
      "Sakamoto", // nichijou
      "Meowth",
      "Espeon",
      "Raikou",
      "Skitty",
      "Delcatty",
      "Shinx",
      "Luxio",
      "Luxray",
      "Glameow",
      "Purrloin",
      "Litleo",
      "Espurr",
      "Shamisen", // Haruhi
      "Mr. Mew", // The World Ends With You

      // Cat-like creatures/ catpeople from media
      "Rengar", // League of Legends
      "Asebi",    // Dungeon Meshi
      "Leo",      // Fairy Tail
      "Shampoo", // Ranma 1/2
      "Azusa", // K-On
      "Azunyan", // K-On
      "Chitori", // Gurren Lagann
      "Yoruichi", // Bleach
      "Pantha", // Teen Titans
      "Black", // "Black Cat", Spiderman
      "Ava Ayala", // Avengers Academy
      "Selina", // Catwoman/Batman
      "Kyle",
      "Ms. Fortune", // Skullgirls
      "Ghostrick", // "Ghostrick Catgirl", Yugioh
      "Thunder Nyan Nyan", // Yugioh
      "Roll", // Megaman (in some depictions)
      "Gotmott", // Xenoblade Chronicles 2
      "Stella", // VA-11 HALL-A
      "Kyuubey", // Madoka
      "Gyuuki", // YuYuYu
      "Nekobasu", // totoro
      "Hanekawa", // Monogatari
      "Puck",
      "Nyanta",
      "Tigger", // Pooh
      "Hobbes", // Calvin

      // Other people's cats
      "Zinc", // Aivi/surasshu's
      "Hobac", // Hanna Cha's
      "Biffy", // Holly's cat 



      // Stupid names
      "Nyanyanyanners",
      "Lardyclaws",
      "Baconator",
      "Sir Donnigan",
      "Inspector Whiskers",
      "Mr. Snuggles",
      "Archbishop Mannykins III",
      "Professor Fluffles",

      // Foods
      "Meatball",
      "Meatloaf",
      "Muffin",
      "Scone",
      "Cupcake",
      "Pepper",
      "Paprika",
      "Sugar",
      "Honey",
      "Pizza",
      "Tofu",
      "Cheddar",

      // CLothing
      "Mittens",
      "Snuggie",
      "Muff",
      
      // Historical Figures
      "Bismarck",
      "Winston",
      "Sibelius",
      "Dumbledore",
      "Albus",
      "Napoleon",
      "Alexander",
      "Caesar"



    ],
  };
}