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

  public static MAP_WIDTH_IN_TILES = 50;
  public static MAP_HEIGHT_IN_TILES = 50;

  public static MAP_TILE_SIZE = 16;

  public static WORLD_WIDTH = Constants.MAP_WIDTH_IN_TILES * Constants.MAP_TILE_SIZE;
  public static WORLD_HEIGHT = Constants.MAP_HEIGHT_IN_TILES * Constants.MAP_TILE_SIZE;

  public static TOOLBAR_HEIGHT = 16;

  public static MOUSE_SCROLL_DEADZONE = 40;
  public static MOUSE_SCROLL_SPEED = 3;

  public static DEBUG_FLAGS = {
    DEBUG_ADD_BUILDING: true,
    DEBUG_INITIAL_BUTTONS_COUNT: 22
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
      "Charlie",
      "Shadow",
      "Sunny",
      "Sushi",
      "Garligan",
      "Bluregard",
      "Noodle",
      "Patchwork",
      "Furrball",
      "Snowball",
      "Andrea",
      "Luna",
      "Nyanyanyanners",
      "Miya",
      "Tama",
      "Nitama",
      "Yontama",
      "Lardyclaws",
      "Baconator",
      "Mimi",
      "Inspector Whiskers",
      "Mr. Snuggles",
      "Sir Donnigan",
      "Archbishop Mannykins III",
      "Professor Fluffles"
    ],
    ERRORS: {
      "1": "You don't have enough resources to do that!"
    }
  };
}