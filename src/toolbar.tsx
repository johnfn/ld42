type ToolbarProps = { 
  state: State;
};
type ToolbarState = { };

class Toolbar extends React.Component<ToolbarProps, State> implements IEntity {
  public static Instance: Toolbar;

  constructor(props: ToolbarProps) {
    super(props);

    Toolbar.Instance = this;

    this.state = props.state;
  }

  tick = 0;

  update(state: State) {
    this.setState(state);
  }

  getTime(): string {
    return `${ this.state.time.hour }:${ Util.Pad(String(this.state.time.minute), 2) }`;
  }

  render() {
    return (
      <div
        style={{
          color: 'white',
          font: 'Arial',
        }}
      >
        <span
          style={{
            paddingLeft: "10px",
          }}
        >
          Buttons: { this.state.buttons }
        </span>

        <span
          style={{
            paddingLeft: "10px",
          }}
        >
          Time: { this.getTime() }
        </span>
      </div>
    );
  }
}