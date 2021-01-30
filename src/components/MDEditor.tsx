import React, { useCallback, useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import Markdown from "markdown-to-jsx";
import { AppDB } from "../db/db";
import "./MDEditor.css";
import { decodeToString, encodeToUint8Array } from "../utils/en-decoder";
import { AppTopBar } from "./AppBar/AppTopBar";
import styled from "styled-components";

export declare type modeTypes = "editMode" | "splitMode" | "viewMode";

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
  const [mode, setMode] = useState<modeTypes>("splitMode");

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

  return (
    <Top>
      <AppTopBar content={content} setMode={setMode} />
      <EditorPref
        style={
          mode !== "splitMode"
            ? {
                justifyContent: "center",
                background: "#2E2E2E",
              }
            : undefined
        }
      >
        {mode !== "viewMode" ? (
          <Editor
            width={mode === "editMode" ? "66%" : "50%"}
            defaultLanguage="markdown"
            defaultValue={decoder()}
            options={options}
            theme={"vs-dark"}
            onChange={(value) => onChangeInput(value || "")}
          />
        ) : null}
        {mode !== "editMode" ? (
          <PreviewMarkdown className="markdown-body">
            <Markdown>{decoder()}</Markdown>
          </PreviewMarkdown>
        ) : null}
      </EditorPref>
    </Top>
  );
};

type renderWhiteSpaceTypes =
  | "all"
  | "none"
  | "boundary"
  | "selection"
  | "trailing";

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

const PreviewMarkdown = styled.div`
  overflow-y: scroll;
  padding-left: 24px;
  height: calc(100% - 48px);
  background-color: white;
  width: calc(50% - 48px);
`;

const EditorPref = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  height: 100vh;
`;

const Top = styled.div`
  height: 100%;
`;
