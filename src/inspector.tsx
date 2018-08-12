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
      return (
        <div>
          <h2>Cat Inspector</h2>
          <div>Name: { this.state.selection.info.name } </div>
          <div>Favorite activity: { this.state.selection.info.favoriteActivity } </div>
          <div>Housing Status: { this.state.selection.info.room ? "Housed!" : "Homeless" } </div>
        </div>
      );
    }

    if (this.state.selection.type === "room") {
      return (
        <div>
          <h2>Room Inspector</h2>
          <div>Catpacity: { this.state.selection.info.occupants } / { this.state.selection.info.capacity } </div>
        </div>
      );
    }
  }
}