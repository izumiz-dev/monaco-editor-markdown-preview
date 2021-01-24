import Markdown from "markdown-to-jsx";
import React, { useEffect, useState } from "react";
import { digestMessage } from "./createShareURL";

export const Preview = ({
  content,
  hash,
}: {
  content: string;
  hash: string;
}) => {
  const [OK, setOK] = useState(false);
  useEffect(() => {
    const check = async () => {
      let calculatedHash = await digestMessage(content);
      if (hash === calculatedHash) {
        setOK(true);
      }
    };
    check();
  }, [content, hash]);

  if (OK) {
    return (
      <div
        className="markdown-body"
        style={{ width: "75%", justifyContent: "center" }}
      >
        <Markdown>{content || ""}</Markdown>
      </div>
    );
  }
  return <h1>Error: Invalid Contents</h1>;
};
