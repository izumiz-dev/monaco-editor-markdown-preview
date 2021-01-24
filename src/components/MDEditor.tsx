import React, { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import Markdown from "markdown-to-jsx";
import { Button, ButtonGroup } from "@material-ui/core";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import ShareIcon from "@material-ui/icons/Share";
import { AppDB } from "../db/db";
import "./MDEditor.css";
import { createShareURL } from "./createShareURL";

export const MDEditor = () => {
  const db = new AppDB();
  useEffect(() => {
    const fetch = async () => {
      const res = await db.markdowns.get(1);
      setContent(res?.content);
    };
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <Button
          id="button"
          variant="contained"
          color="primary"
          startIcon={<FileCopyIcon />}
          onClick={() => {
            if (navigator.clipboard) {
              navigator.clipboard.writeText(content || "");
            }
          }}
        >
          Copy to clipboard
        </Button>
        <Button
          id="button"
          variant="contained"
          color="secondary"
          startIcon={<ShareIcon />}
          onClick={() =>
            (async () => {
              const URL = await createShareURL(content || "");
              if (navigator.clipboard) {
                navigator.clipboard.writeText(URL);
              }
            })()
          }
        >
          Share Document with Query Param
        </Button>
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
