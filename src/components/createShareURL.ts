// https://developer.mozilla.org/ja/docs/Web/API/SubtleCrypto/digest
export const digestMessage = async (message: string) => {
  const msgUint8 = new TextEncoder().encode(message); // encode as (utf-8) Uint8Array
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8); // hash the message
  const hashArray = Array.from(new Uint8Array(hashBuffer)); // convert buffer to byte array
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join(""); // convert bytes to hex string
  return hashHex;
};

export const createShareURL = async (content: string) => {
  const hash = await digestMessage(content);
  let URL =
    "https://izumiz-dev.github.io/monaco-editor-markdown-preview/shared?content=";
  URL += encodeURIComponent(content);
  URL += `&hash=${encodeURIComponent(hash)}`;
  return URL;
};
