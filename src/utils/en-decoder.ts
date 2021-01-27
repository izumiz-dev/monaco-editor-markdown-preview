const en = new TextEncoder();
const de = new TextDecoder();

export const encodeToUint8Array = (input: string | undefined): Uint8Array =>
  en.encode(input);
export const decodeToString = (input: Uint8Array | undefined): string =>
  de.decode(input);
