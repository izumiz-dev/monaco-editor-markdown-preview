import React, { useCallback, useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import Markdown from "markdown-to-jsx";
import { Button, ButtonGroup } from "@material-ui/core";
import ShareIcon from "@material-ui/icons/Share";
import { AppDB } from "../db/db";
import "./MDEditor.css";
import { createShareURL } from "./createShareURL";
import { decodeToString, encodeToUint8Array } from "../utils/en-decoder";
import { AppTopBar } from "./AppBar/AppTopBar";

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

  const [content, setContent] = useState<Uint8Array>();
  const [mode, setMode] = useState<number>(0);

  useEffect(() => {
    db.markdowns.put({
      id: 1,
      content: content,
    });
  }, [content, db.markdowns]);

  const onChangeInput = useCallback((str: string) => {
    setContent(encodeToUint8Array(str));
  }, []);

  const decoder = useCallback(() => {
    return decodeToString(content);
  }, [content]);

  // const decoder = () => decodeToString(content);

  return (
    <div id="top">
      <AppTopBar content={content} />
      <div
        id="editor"
        style={mode !== 0 ? { justifyContent: "center" } : undefined}
      >
        {mode !== 1 ? (
          <Editor
            width={mode === 2 ? "100%" : "50%"}
            defaultLanguage="markdown"
            defaultValue={decoder()}
            options={options}
            theme={"vs-dark"}
            onChange={(value) => onChangeInput(value || "")}
          />
        ) : null}
        {mode !== 2 ? (
          <div className="markdown-body" id="preview">
            <Markdown>{decoder()}</Markdown>
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
