import Dexie from "dexie";

export class AppDB extends Dexie {
  markdowns: Dexie.Table<IMarkdown, number>;

  constructor() {
    super("AppDB");

    this.version(1).stores({
      markdowns: "++id, content",
    });
    this.markdowns = this.table("markdowns");
  }
}

export interface IMarkdown {
  id?: number;
  content?: Uint8Array;
}
