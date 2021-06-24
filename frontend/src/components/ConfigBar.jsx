import React, { Component } from "react";
import { Dropdown } from "semantic-ui-react";
import "../css/ConfigBar.css";

class ConfigBar extends Component {
  render() {
    return (
      <div className="config-bar">
        <Dropdown
          className="dropdown"
          placeholder="Theme"
          selection
          options={this.props.themes}
          onChange={(e, data) => this.props.handleOnChange(e, data)}
          defaultValue={this.props.themes[8].value}
        />
        <Dropdown
          className="dropdown"
          placeholder="Language"
          selection
          options={this.props.languages}
          onChange={(e, data) => this.props.handleOnChange(e, data)}
          defaultValue={this.props.defaultMode}
        />
        <Dropdown
          className="dropdown"
          placeholder="Font Size"
          selection
          options={this.props.fontSizes}
          onChange={(e, data) => this.props.handleOnChange(e, data)}
          defaultValue={this.props.fontSizes[4].value}
        />
      </div>
    );
  }
}

export default ConfigBar;
