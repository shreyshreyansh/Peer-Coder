import React, { Component } from "react";
import ConfigBar from "./ConfigBar";
import AceEditor from "react-ace";
import SplitPane from "react-split-pane";
import { languageToEditorMode } from "../config/mappings";
import "ace-builds/webpack-resolver";

import "ace-builds/src-noconflict/ext-language_tools";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-rust";
import "ace-builds/src-noconflict/mode-kotlin";

import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-solarized_dark";
import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-eclipse";
import "ace-builds/src-noconflict/theme-tomorrow_night";
import "ace-builds/src-noconflict/theme-tomorrow_night_blue";
import "ace-builds/src-noconflict/theme-xcode";
import "ace-builds/src-noconflict/theme-ambiance";
import "ace-builds/src-noconflict/theme-solarized_light";

import "../css/Editor.css";

const languages = Object.keys(languageToEditorMode);
const fontSizes = [
  "8",
  "10",
  "12",
  "14",
  "16",
  "18",
  "20",
  "22",
  "24",
  "26",
  "28",
  "30",
  "32",
];
const themes = [
  "monokai",
  "github",
  "solarized_dark",
  "dracula",
  "eclipse",
  "tomorrow_night",
  "tomorrow_night_blue",
  "xcode",
  "ambiance",
  "solarized_light",
].sort();
var lang;
var font;
var theme;

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: "tomorrow_night_blue",
      fontSize: 16,
    };
    let i = 0;
    lang = languages.map((language) => {
      i++;
      return { key: "" + i, text: language, value: language };
    });
    let j = 0;
    font = fontSizes.map((fontSize) => {
      j++;
      return { key: "" + j, text: fontSize, value: fontSize };
    });
    let k = 0;
    theme = themes.map((theme) => {
      k++;
      return { key: "" + k, text: theme, value: theme };
    });
    this.handleOnChange = this.handleOnChange.bind(this);
  }
  handleOnChange(e, data) {
    if (data.placeholder === "Theme") {
      this.setState({ theme: data.value });
    } else if (data.placeholder === "Font Size") {
      this.setState({ fontSize: parseInt(data.value) });
    } else if (data.placeholder === "Language") {
      this.props.onChangeMode(data.value);
    }
  }
  render() {
    return (
      <React.Fragment>
        <ConfigBar
          mode={this.props.mode}
          status={this.props.status}
          handleOnChange={this.handleOnChange}
          languages={lang}
          fontSizes={font}
          themes={theme}
          handleRunClick={() => this.props.handleRunClick()}
        />
        <SplitPane
          split="vertical"
          minSize={100}
          maxSize={window.innerWidth - 50}
          defaultSize={window.innerWidth * 0.5}
          style={{ height: "65vh" }}
        >
          <div>
            <div className="head">
              <div className="text">CODE HERE</div>
            </div>
            <AceEditor
              mode={this.props.mode}
              theme={this.state.theme}
              fontSize={this.state.fontSize}
              value={this.props.code}
              onChange={(data) => this.props.onChangeCode(data)}
              width={"100vw"}
              height={"61.4vh"}
              showGutter={true}
              useWorker={false}
              editorProps={{ $blockScrolling: false }}
              setOptions={{
                enableLiveAutocompletion: true,
                enableSnippets: true,
              }}
            />
          </div>
          <div>
            <div>
              <div className="head">
                <div className="text">INPUT</div>
              </div>
              <AceEditor
                mode={"text"}
                theme={this.state.theme}
                fontSize={this.state.fontSize}
                value={this.props.input}
                onChange={(data) => this.props.onChangeInput(data)}
                width={"100vw"}
                height={"28vh"}
                showGutter={true}
                useWorker={false}
                editorProps={{ $blockScrolling: false }}
                setOptions={{
                  enableLiveAutocompletion: true,
                  enableSnippets: true,
                }}
              />
            </div>
            <div>
              <div className="head">
                <div className="text">OUTPUT</div>
              </div>
              <AceEditor
                mode={"text"}
                theme={this.state.theme}
                fontSize={this.state.fontSize}
                value={this.props.output}
                onChange={(data) => this.props.onChangeOutput(data)}
                width={"100vw"}
                height={"32vh"}
                readOnly={true}
                showGutter={true}
                useWorker={false}
                editorProps={{ $blockScrolling: false }}
                setOptions={{
                  enableLiveAutocompletion: true,
                  enableSnippets: true,
                }}
              />
            </div>
          </div>
        </SplitPane>
      </React.Fragment>
    );
  }
}

export default Editor;
