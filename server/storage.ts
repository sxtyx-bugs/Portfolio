import { type User, type InsertUser, type GuestbookEntry, type InsertGuestbookEntry } from "@shared/schema";
import { randomUUID } from "crypto";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  // Guestbook methods
  createGuestbookEntry(entry: InsertGuestbookEntry): Promise<GuestbookEntry>;
  getGuestbookEntries(): Promise<GuestbookEntry[]>;
  getGuestbookEntry(id: number): Promise<GuestbookEntry | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private guestbookEntries: Map<number, GuestbookEntry>;
  private nextGuestbookId: number;

  constructor() {
    this.users = new Map();
    this.guestbookEntries = new Map();
    this.nextGuestbookId = 1;
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createGuestbookEntry(insertEntry: InsertGuestbookEntry): Promise<GuestbookEntry> {
    const id = this.nextGuestbookId++;
    const entry: GuestbookEntry = {
      ...insertEntry,
      id,
      email: insertEntry.email ?? null,
      website: insertEntry.website ?? null,
      location: insertEntry.location ?? null,
      createdAt: new Date()
    };
    this.guestbookEntries.set(id, entry);
    return entry;
  }

  async getGuestbookEntries(): Promise<GuestbookEntry[]> {
    return Array.from(this.guestbookEntries.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async getGuestbookEntry(id: number): Promise<GuestbookEntry | undefined> {
    return this.guestbookEntries.get(id);
  }
}

export const storage = new MemStorage();
