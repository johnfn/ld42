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
  public static SCREEN_WIDTH = 600;
  public static SCREEN_HEIGHT = 600;

  public static SKY_HEIGHT_IN_TILES = 30;

  public static MAP_WIDTH_IN_TILES = 70;
  public static MAP_HEIGHT_IN_TILES = 40;

  public static MAP_TILE_SIZE = 16;

  public static MAX_HOMELESS_CATS = 5;

  public static WORLD_WIDTH = Constants.MAP_WIDTH_IN_TILES * Constants.MAP_TILE_SIZE;
  public static WORLD_HEIGHT = Constants.MAP_HEIGHT_IN_TILES * Constants.MAP_TILE_SIZE;

  public static TOOLBAR_HEIGHT = 16;

  public static MOUSE_SCROLL_DEADZONE = 40;
  public static MOUSE_SCROLL_SPEED = 3;

  public static DEBUG_FLAGS = {
    DEBUG_ADD_BUILDING: true,
    DEBUG_INITIAL_BUTTONS_COUNT: 500
  };

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
    WATER: 0x85B7E3
  }

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

      // Japanese names
      "Miya",
      "Tama",
      "Niitama",
      "Yontama",
      "Nekomata",
      "Nabeneko",
      "Manzoku",

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
      "Jobs",
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
      "Aivi",
      
      // Cats from media
      "Diana", // Sailor Moon, black
      "Jiji", // Kiki's Delivery Service, black
      "Maomolin", // Ranma 1/2
      "Meowth",
      "Persian",
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

      // Cat-like creatures/ catpeople from media
      "Rengar", // League of Legends
      "Izutsumi", // Dungeon Meshi
      "Asebi",    // Dungeon Meshi
      "Leo",      // Fairy Tail
      "Shampoo", // Ranma 1/2
      "Azusa", // K-On
      "Chitori", // Gurren Lagann
      "Yoruichi", // Bleach
      "Catseye", // X-Men
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

      // Other people's cats
      "Zinc", // Aivi/surasshu's
      "Hobac", // Hanna Cha's

      // Misc
      "Charlie",
      "Shadow",
      "Sunny",
      "Sushi",
      "Sir Donnigan",
      "Blooregard",
      "Noodle",
      "Patchwork",
      "Furrball",
      "Andrea",
      "Luna",
      "Nyanyanyanners",
      "Lardyclaws",
      "Baconator",
      "Inspector Whiskers",
      "Mr. Snuggles",
      "Archbishop Mannykins III",
      "Professor Fluffles"
    ],
    ERRORS: {
      "1": "You don't have enough resources to do that!"
    }
  };
}