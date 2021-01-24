import React, { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import Markdown from "markdown-to-jsx";
import { CopyToClipboard } from "react-copy-to-clipboard";
import "./App.css";
import { Button, ButtonGroup } from "@material-ui/core";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import { AppDB } from "./db/db";

require("github-markdown-css");

const App = () => {
  const db = new AppDB();
  useEffect(() => {
    const fetch = async () => {
      const res = await db.markdowns.get(1);
      setContent(res?.content);
    };
    fetch();
  }, []);

  const [content, setContent] = useState<string>();
  const [mode, setMode] = useState<number>(0);

  const editMD = async (str: string) => {
    setContent(str);
    await db.markdowns.put({
      id: 1,
      content: str,
    });
  };

  return (
    <div>
      <div id="menu">
        <p id="title">Monaco Editor Markdown Github Style Preview</p>
        <ButtonGroup
          variant="contained"
          color="primary"
          aria-label="text primary button group"
        >
          <Button id="button" onClick={() => setMode(0)}>
            Split
          </Button>
          <Button id="button" onClick={() => setMode(2)}>
            Editor
          </Button>
          <Button id="button" onClick={() => setMode(1)}>
            Preview
          </Button>
        </ButtonGroup>
        <CopyToClipboard text={content || ""}>
          <Button
            id="button"
            variant="contained"
            color="primary"
            startIcon={<FileCopyIcon />}
          >
            Copy to clipboard
          </Button>
        </CopyToClipboard>
      </div>
      <div
        id="editor"
        style={mode !== 0 ? { justifyContent: "center" } : undefined}
      >
        {mode !== 1 ? (
          <Editor
            width={mode === 2 ? "100%" : "50%"}
            defaultLanguage="markdown"
            defaultValue={content || ""}
            options={options}
            theme={"vs-dark"}
            onChange={(value) => {
              if (typeof value !== "undefined") {
                editMD(value);
              }
            }}
          />
        ) : null}
        {mode !== 2 ? (
          <div className="markdown-body" id="preview">
            <Markdown>{content || ""}</Markdown>
          </div>
        ) : null}
      </div>
    </div>
  );
};

type renderWhiteSpaceTypes =
  | "all"
  | "none"
  | "boundary"
  | "selection"
  | "trailing"
  | undefined;

const options = {
  fontSize: 16,
  formatOnType: true,
  tabSize: 2,
  suggest: {
    showWords: false,
  },
  renderWhitespace: "all" as renderWhiteSpaceTypes,
  renderIndentGuides: true,
  minimap: {
    enabled: false,
  },
};

export default App;
