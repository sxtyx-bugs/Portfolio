import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertGuestbookSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Guestbook routes
  app.get('/api/guestbook', async (req, res) => {
    try {
      const entries = await storage.getGuestbookEntries();
      res.json(entries);
    } catch (error) {
      console.error('Error fetching guestbook entries:', error);
      res.status(500).json({ error: 'Failed to fetch guestbook entries' });
    }
  });

  app.post('/api/guestbook', async (req, res) => {
    try {
      const validatedEntry = insertGuestbookSchema.parse(req.body);
      const entry = await storage.createGuestbookEntry(validatedEntry);
      res.status(201).json(entry);
    } catch (error) {
      console.error('Error creating guestbook entry:', error);
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Failed to create guestbook entry' });
      }
    }
  });

  app.get('/api/guestbook/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid guestbook entry ID' });
      }
      const entry = await storage.getGuestbookEntry(id);
      if (!entry) {
        return res.status(404).json({ error: 'Guestbook entry not found' });
      }
      res.json(entry);
    } catch (error) {
      console.error('Error fetching guestbook entry:', error);
      res.status(500).json({ error: 'Failed to fetch guestbook entry' });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
