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

  render() {
    return (
      <div
        style={{
          color: 'white',
          font: 'Arial',
        }}
      >
        buttons: { this.state.buttons }
      </div>
    );
  }
}