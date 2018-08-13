type IslandStatusProps = { 
  state: State;
};
type IslandStatusState = { };

class IslandStatus extends React.Component<IslandStatusProps, State> implements IEntity {
  public static Instance: IslandStatus;

  constructor(props: IslandStatusProps) {
    super(props);

    IslandStatus.Instance = this;

    this.state = props.state;
  }

  update(state: State) {
    this.setState(state);
  }

  render() {
    const allCats = State.Instance.getCats();
    const allRooms = State.Instance.getRooms();

    const catCount = allCats.length;
    const housedCatCount = allCats.filter(c => c.info.livingRoom).length;
    const totalCatpacity = allRooms.map(r => r.capacity).reduce((pv, cv) => pv + cv, 0);
    const yarnDemand = allCats.filter(c => c.info.favoriteActivity === "Yarn").length;
    const happinessAvg = Math.floor(allCats.reduce((pv, cv) => pv + cv.info.happiness, 0) / allCats.length);

    return (
      <div>
        <h2>Island Status</h2>

        <div>
          Population: { catCount }
        </div>

        <div>
          Housed: { housedCatCount } (Catpacity: { totalCatpacity })
        </div>

        <div>
          Yarn Demand: { yarnDemand }
        </div>

        <div>
          Happiness: { isNaN(happinessAvg) ? "???" : happinessAvg }
        </div>
      </div>
    );
  }
}