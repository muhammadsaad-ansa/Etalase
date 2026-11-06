import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json());

  // Initialize Gemini AI
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

  // API Routes
  app.post('/api/generate-bio', async (req, res) => {
    try {
      const { name, niche, tone } = req.body;
      const prompt = `Buatkan 3 pilihan bio / tagline singkat yang menarik (maksimal 15 kata per bio) untuk halaman etalase link / bio link milik "${name || 'Kreator'}" yang bergerak di bidang "${niche || 'Kreator Konten'}" dengan gaya bahasa "${tone || 'Profesional & Kreatif'}". Berikan hasil dalam format JSON array of strings tanpa markdown tambahan.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      const text = response.text || '[]';
      let bios = [];
      try {
        const cleaned = text.replace(/```json/g, '').replace(/```/g, '').trim();
        bios = JSON.parse(cleaned);
      } catch (e) {
        bios = text.split('\n').filter(l => l.trim().length > 0).slice(0, 3);
      }

      res.json({ success: true, bios });
    } catch (error: any) {
      console.error('Gemini Bio Gen Error:', error);
      res.status(500).json({ success: false, error: error.message || 'Gagal menghasilkan bio AI' });
    }
  });

  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  const isProduction = process.env.NODE_ENV === 'production' || fs.existsSync(path.join(__dirname, 'dist'));

  // Vite middleware for development or static serving for production
  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT} (Production mode: ${isProduction})`);
  });
}

startServer();
