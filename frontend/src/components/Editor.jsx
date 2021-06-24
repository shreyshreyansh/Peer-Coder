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
      mode: "java",
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
    console.log(data);
    if (data.placeholder === "Theme") {
      this.setState({ theme: data.value });
    } else if (data.placeholder === "Font Size") {
      this.setState({ fontSize: parseInt(data.value) });
    } else if (data.placeholder === "Language") {
      this.setState({ mode: data.value });
    }
  }
  render() {
    return (
      <React.Fragment>
        <ConfigBar
          defaultMode={this.state.mode}
          handleOnChange={this.handleOnChange}
          languages={lang}
          fontSizes={font}
          themes={theme}
        />
        <SplitPane
          split="vertical"
          minSize={100}
          maxSize={window.innerWidth - 50}
          defaultSize={window.innerWidth * 0.7}
          style={{ height: "65vh" }}
        >
          <div>
            <div className="head">
              <div className="text">CODE HERE</div>
            </div>
            <AceEditor
              mode={this.state.mode}
              theme={this.state.theme}
              fontSize={this.state.fontSize}
              value={this.props.code}
              onChange={(data) => this.props.onChangeCode(data)}
              width={"100vw"}
              height={"70vh"}
              showGutter={true}
              editorProps={{ $blockScrolling: true }}
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
                mode={this.state.mode}
                theme={this.state.theme}
                fontSize={this.state.fontSize}
                value={this.props.input}
                onChange={(data) => this.props.onChangeInput(data)}
                width={"100vw"}
                height={"30vh"}
                showGutter={true}
                editorProps={{ $blockScrolling: true }}
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
                mode={this.state.mode}
                theme={this.state.theme}
                fontSize={this.state.fontSize}
                value={this.props.output}
                onChange={(data) => this.props.onChangeOutput(data)}
                width={"100vw"}
                height={"40vh"}
                readOnly={true}
                showGutter={true}
                editorProps={{ $blockScrolling: true }}
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
