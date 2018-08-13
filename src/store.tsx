type StoreItemProps = {
  buildingName: RoomName;
  selected: boolean;
};

type StoreItemState = {
  mouseOver: boolean;
};

class StoreItem extends React.Component<StoreItemProps, StoreItemState> {
  constructor(props: StoreItemProps) {
    super(props);

    this.state = {
      mouseOver: false,
    };

  }
  render() {
    const price = RoomTypes[this.props.buildingName].cost.buttons;
    const canAfford = price <= State.Instance.buttons;
    const building = RoomTypes[this.props.buildingName];

    let item = (
      <span>
        { building.name }
      </span>
    );

    if (this.props.selected) {
      item = (
        <strong>{ item }</strong>
      );
    } 

    return (
      <div
        onClick={ () => { if (canAfford) { State.Instance.selectedBuilding = this.props.buildingName } } }
        onMouseOver={ () => this.setState({ mouseOver: true })}
        onMouseOut={ () => this.setState({ mouseOver: false })}
        style={{
          color: canAfford ? 'white' : 'gray',
        }}
      >
        { item }{' '}
        {
          this.state.mouseOver &&
            <>
              <span className="buy-cost">
                Cost: { price } buttons
              </span>{' '}
              {
                !canAfford &&
                  <span className="buy-cant-afford">
                    Can't afford!
                  </span>
              }
            </>
        }{' '}
      </div>
    );
  }
}

type StoreProps = { 
  state: State;
};

type StoreState = { };

class Store extends React.Component<StoreProps, State> implements IEntity {
  public static Instance: Store;

  constructor(props: StoreProps) {
    super(props);

    Store.Instance = this;

    this.state = props.state;
  }

  update(state: State) {
    this.setState(state);
  }

  renderBuildings(): JSX.Element[] {
    const buildingNames = Object.keys(RoomTypes) as (keyof typeof RoomTypes)[];
    const results: JSX.Element[] = [];

    for (const key of buildingNames) {
      results.push(
        <StoreItem
          key={ key }
          buildingName={ key }
          selected={ this.state.selectedBuilding === key }
        />
      );
    }

    return results;
  }

  render() {
    return (
      <div>
        <h2>Building Selector</h2>

        { this.renderBuildings() }
      </div>
    )
  }
}