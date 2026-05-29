import 'dotenv/config';
import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import { SERVICES } from './src/data';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Setup persistence file path
  const SERVICES_FILE = path.join(process.cwd(), 'services.json');

  // Load or initialize services JSON database
  const getPersistedServices = (): any[] => {
    try {
      if (fs.existsSync(SERVICES_FILE)) {
        const fileContent = fs.readFileSync(SERVICES_FILE, 'utf8');
        return JSON.parse(fileContent);
      } else {
        // Initialize with default SERVICES from src/data.ts
        fs.writeFileSync(SERVICES_FILE, JSON.stringify(SERVICES, null, 2), 'utf8');
        return SERVICES;
      }
    } catch (err) {
      console.error('Error reading services file. Falling back to code values.', err);
      return SERVICES;
    }
  };

  const savePersistedServices = (servicesList: any[]): boolean => {
    try {
      fs.writeFileSync(SERVICES_FILE, JSON.stringify(servicesList, null, 2), 'utf8');
      return true;
    } catch (err) {
      console.error('Error writing services file.', err);
      return false;
    }
  };

  // Static token for session authentication
  const ADMIN_SESSION_TOKEN = 'clara_admin_session_token_2026';
  const DEFAULT_PASS = 'macata0378';

  // API Route: Admin login
  app.post('/api/admin/login', (req, res) => {
    const { password } = req.body;
    const requiredPassword = process.env.ADMIN_PASSWORD || DEFAULT_PASS;

    if (password === requiredPassword) {
      res.json({ success: true, token: ADMIN_SESSION_TOKEN });
    } else {
      res.status(401).json({ success: false, message: 'Contraseña incorrecta. Por favor reintente.' });
    }
  });

  // API Route: Fetch all service cards
  app.get('/api/services', (req, res) => {
    const currentServices = getPersistedServices();
    res.json({ success: true, services: currentServices });
  });

  // API Route: Update service cards (requires admin authentication)
  app.post('/api/services', (req, res) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.substring(7) : '';

    if (token !== ADMIN_SESSION_TOKEN) {
      return res.status(403).json({ success: false, message: 'No autorizado. Sesión inválida o expirada.' });
    }

    const { services } = req.body;
    if (!Array.isArray(services)) {
      return res.status(400).json({ success: false, message: 'Estructura de datos inválida.' });
    }

    // Basic layout and type verification to filter out bad structure
    const cleanedServices = services.map(s => ({
      id: s.id || `service-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      name: s.name || 'Sin título',
      description: s.description || '',
      category: s.category || 'yoga',
      duration: Number(s.duration) || 60,
      price: Number(s.price) || 0,
      intensity: s.intensity || 'Suave',
      benefits: Array.isArray(s.benefits) ? s.benefits.filter((b: any) => typeof b === 'string' && b.trim() !== '') : []
    }));

    const success = savePersistedServices(cleanedServices);
    if (success) {
      res.json({ success: true, services: cleanedServices });
    } else {
      res.status(500).json({ success: false, message: 'Error interno al guardar los cambios en la base de datos.' });
    }
  });

  // Vite middleware for development or fallback in production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
