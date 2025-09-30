import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs/promises';
import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import { nanoid } from 'nanoid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || 'changeme';
const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`;
const DATA_DIR = path.join(__dirname, '..', 'data');
const ORDERS_FILE = path.join(DATA_DIR, 'orders.json');

async function ensureDataFile() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.access(ORDERS_FILE);
  } catch {
    await fs.writeFile(ORDERS_FILE, '[]', 'utf-8');
  }
}

async function readOrders() {
  await ensureDataFile();
  const data = await fs.readFile(ORDERS_FILE, 'utf-8');
  try {
    return JSON.parse(data);
  } catch {
    await fs.writeFile(ORDERS_FILE, '[]', 'utf-8');
    return [];
  }
}

async function writeOrders(orders) {
  await ensureDataFile();
  await fs.writeFile(ORDERS_FILE, JSON.stringify(orders, null, 2), 'utf-8');
}

const plans = [
  {
    id: 'basic',
    name: 'Basic',
    game: ['Minecraft', 'CS2'],
    defaultSlots: 10,
    monthlyPrice: 6.99,
    features: ['SSD Depolama', 'DDoS Koruma', '7/24 Uptime']
  },
  {
    id: 'pro',
    name: 'Pro',
    game: ['Minecraft', 'CS2', 'Rust'],
    defaultSlots: 20,
    monthlyPrice: 12.99,
    features: ['Yüksek CPU', 'Yedekleme', 'Panel Erişimi']
  },
  {
    id: 'ultra',
    name: 'Ultra',
    game: ['Minecraft', 'CS2', 'Rust', 'Valheim'],
    defaultSlots: 40,
    monthlyPrice: 24.99,
    features: ['Öncelikli Destek', 'NVMe', 'Gelişmiş Mod Desteği']
  }
];

function computePrice(planId, slots) {
  const plan = plans.find(p => p.id === planId);
  if (!plan) return null;
  const slotFactor = Math.max(1, Number(slots) / plan.defaultSlots);
  const price = plan.monthlyPrice * slotFactor;
  return Math.round(price * 100) / 100;
}

app.set('trust proxy', 1);
app.use(
  helmet({
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        'img-src': ["'self'", 'data:'],
        'script-src': ["'self'"],
        'style-src': ["'self'", "'unsafe-inline'"]
      }
    }
  })
);
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, '..', 'public')));

app.set('views', path.join(__dirname, '..', 'views'));
app.set('view engine', 'ejs');

const orderLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false
});

app.get('/', (req, res) => {
  res.render('index', { plans, baseUrl: BASE_URL });
});

app.get('/order', (req, res) => {
  const selected = req.query.plan || '';
  res.render('order', { plans, selectedPlanId: selected, baseUrl: BASE_URL });
});

app.post('/order', orderLimiter, async (req, res) => {
  const { fullName, email, game, planId, slots, region, notes } = req.body;

  if (!fullName || !email || !planId || !slots || !game) {
    return res.status(400).render('order', {
      plans,
      selectedPlanId: planId || '',
      baseUrl: BASE_URL,
      error: 'Lütfen gerekli alanları doldurun.'
    });
  }

  const price = computePrice(planId, Number(slots));
  if (price == null) {
    return res.status(400).render('order', {
      plans,
      selectedPlanId: planId,
      baseUrl: BASE_URL,
      error: 'Geçersiz plan.'
    });
  }

  const order = {
    id: nanoid(12),
    createdAt: new Date().toISOString(),
    fullName,
    email,
    game,
    planId,
    slots: Number(slots),
    region: region || 'eu-central',
    notes: notes || '',
    price,
    currency: 'USD',
    status: 'pending'
  };

  const orders = await readOrders();
  orders.unshift(order);
  await writeOrders(orders);

  res.render('order', {
    plans,
    selectedPlanId: planId,
    baseUrl: BASE_URL,
    success: `Sipariş alındı! Sipariş No: ${order.id} - Size e-posta ile dönüş yapacağız.`
  });
});

function adminAuth(req, res, next) {
  const token =
    req.query.token ||
    req.headers['x-admin-token'] ||
    (req.headers.authorization || '').replace(/^Bearer\s+/i, '');
  if (!token || token !== ADMIN_TOKEN) {
    return res.status(401).send('Yetkisiz. Admin token gerekli.');
  }
  next();
}

app.get('/admin', adminAuth, async (req, res) => {
  const orders = await readOrders();
  res.render('admin', { orders, plans, baseUrl: BASE_URL });
});

app.post('/admin/orders/:id/status', adminAuth, async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const allowed = ['pending', 'active', 'cancelled', 'completed'];
  if (!allowed.includes(status)) {
    return res.status(400).send('Geçersiz durum.');
  }
  const orders = await readOrders();
  const idx = orders.findIndex(o => o.id === id);
  if (idx === -1) return res.status(404).send('Sipariş bulunamadı.');
  orders[idx].status = status;
  await writeOrders(orders);
  res.redirect(`/admin?token=${encodeURIComponent(ADMIN_TOKEN)}`);
});

app.use((req, res) => {
  res.status(404).send('Sayfa bulunamadı.');
});

async function start() {
  await ensureDataFile();
  app.listen(PORT, () => {
    console.log(`Server running at ${BASE_URL}`);
  });
}

start();

