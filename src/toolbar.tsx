type ToolbarProps = { 
  state: State;
};
type ToolbarState = { };

class Toolbar extends React.Component<ToolbarProps, State> {
  public static Toolbar: Toolbar;

  constructor(props: ToolbarProps) {
    super(props);

    Toolbar.Toolbar = this;

    this.state = props.state;
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