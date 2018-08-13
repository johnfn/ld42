type InspectorProps = { 
  state: State;
};
type InspectorState = { };

class Inspector extends React.Component<InspectorProps, State> implements IEntity {
  public static Instance: Inspector;

  constructor(props: InspectorProps) {
    super(props);

    Inspector.Instance = this;

    this.state = props.state;
  }

  update(state: State) {
    this.setState(state);
  }

  render() {
    if (this.state.selection.type === "none") {
      return null;
    }

    if (this.state.selection.type === "cat") {
      let description = "";

      const cat = this.state.selection.cat;
      const activity = cat.state.activity;

      if (activity === "waiting") {
        description = "Doing nothing in particular";
      } else if (activity === "falling") {
        description = "Ahhhh!!!";
      } else if (activity === "living") {
        description = "Hanging out in its cat room";
      } else if (activity === "finding-room") {
        description = "Going to find a place to live."
      }

      return (
        <div>
          <h2>Cat Informyation</h2>

          <div>Name: { cat.info.name } </div>
          <div>Happiness: { cat.info.happiness } / { Cat.maxHappiness } </div>
          <div>Favorite activity: { cat.info.favoriteActivity } </div>
          <div>Housing Status: { cat.info.room ? "Housed!" : "Homeless" } </div>
          <div>Destination: { (cat.state.activity === 'finding-room' && cat.state.destination) ? cat.state.destination.worldRect.x : "None" } </div>

          <div
            style={{
              paddingTop: "20px"
            } } />

          <div>
            { description }
          </div>
        </div>
      );
    }

    if (this.state.selection.type === "room") {
      const occupants = this.state.selection.room.occupants;
      return (
        <div>
          <h2>Room Inspecturr</h2>
          <div>Catpacity: { occupants } / { this.state.selection.room.capacity } </div>
          <div>Revenue: { this.state.selection.room.rent * occupants } buttons per day </div>
        </div>
      );
    }
  }
}