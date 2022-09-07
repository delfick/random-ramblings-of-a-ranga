import Dexie from "dexie";
import type { Table } from "dexie";

export interface Mood {
  id?: number;
  when: Date;
  mood: string;
}

class DB extends Dexie {
  moods!: Table<Mood>;

  constructor() {
    super("moods");
    this.version(1).stores({
      moods: "++id, when, mood",
    });
  }
}

export const db = new DB();
