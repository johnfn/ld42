const BuildingTypes = {
  condo: {
    name     : "Condo 1",
    capacity : 5,
    occupancy: 0,

    cost: {
      buttons: 10,
    },
  },

  catLabratory: {
    name: "Cat Laboratailory",

    cost: {
      buttons: 200,
    },
  },

  yarnEmporium: {
    name: "Yarn Empurrrrrrium",

    cost: {
      buttons: 20,
    },
  },
};

type BuildingName = keyof typeof BuildingTypes;

type StoreItemProps = {
  buildingName: BuildingName;
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
    const price = BuildingTypes[this.props.buildingName].cost.buttons;
    const canAfford = price <= State.Instance.buttons;
    const building = BuildingTypes[this.props.buildingName];

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
              <span
                style={{
                  color: 'gray',
                }}
              >
                Cost: { price } buttons
              </span>{' '}
              {
                !canAfford &&
                  <span
                    style={{
                      color: 'red',
                    }}
                  >
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
    const buildingNames = Object.keys(BuildingTypes) as (keyof typeof BuildingTypes)[];
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