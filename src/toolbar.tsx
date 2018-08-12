type ToolbarProps = { };
type ToolbarState = { };

class Toolbar extends React.Component<ToolbarProps, State> {
  public static Toolbar: Toolbar;

  constructor(props: ToolbarProps) {
    super(props);

    Toolbar.Toolbar = this;
  }

  render() {
    return (
      <div>
        buttons: { this.state.buttons }
      </div>
    );
  }
}