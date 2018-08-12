type ToolbarProps = { 
  state: State;
};
type ToolbarState = { };

class Toolbar extends React.Component<ToolbarProps, State> {
  public static Toolbar: Toolbar;

  constructor(props: ToolbarProps) {
    super(props);

    Toolbar.Toolbar = this;

    console.log(props.state);

    this.setState({ 
      ...props.state,
    });
  }

  render() {
    return (
      <div>
        buttons: { this.state.buttons }
      </div>
    );
  }
}