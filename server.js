const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('.'));

// In-memory database (replace with real database in production)
const users = [];
const orders = [];
const servers = [];

// API Routes

// User Registration
app.post('/api/register', (req, res) => {
    const { name, email, password } = req.body;
    
    // Check if user already exists
    if (users.find(u => u.email === email)) {
        return res.status(400).json({ 
            success: false, 
            message: 'Bu e-posta adresi zaten kayıtlı' 
        });
    }
    
    // Create new user (in production, hash the password!)
    const user = {
        id: users.length + 1,
        name,
        email,
        password, // WARNING: Never store plain passwords in production!
        createdAt: new Date()
    };
    
    users.push(user);
    
    res.json({ 
        success: true, 
        message: 'Kayıt başarılı',
        user: { id: user.id, name: user.name, email: user.email }
    });
});

// User Login
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
        return res.status(401).json({ 
            success: false, 
            message: 'E-posta veya şifre hatalı' 
        });
    }
    
    res.json({ 
        success: true, 
        message: 'Giriş başarılı',
        user: { id: user.id, name: user.name, email: user.email }
    });
});

// Create Order
app.post('/api/orders', (req, res) => {
    const { userId, game, plan, location, serverName, price } = req.body;
    
    const order = {
        id: orders.length + 1,
        userId,
        game,
        plan,
        location,
        serverName,
        price,
        status: 'processing',
        createdAt: new Date()
    };
    
    orders.push(order);
    
    // Simulate server creation
    setTimeout(() => {
        const server = {
            id: servers.length + 1,
            orderId: order.id,
            userId,
            game,
            plan,
            location,
            name: serverName,
            ip: generateRandomIP(),
            port: Math.floor(Math.random() * 10000) + 20000,
            status: 'active',
            createdAt: new Date()
        };
        
        servers.push(server);
        order.status = 'completed';
        order.serverId = server.id;
    }, 3000);
    
    res.json({ 
        success: true, 
        message: 'Sipariş oluşturuldu',
        order 
    });
});

// Get User Orders
app.get('/api/orders/:userId', (req, res) => {
    const userId = parseInt(req.params.userId);
    const userOrders = orders.filter(o => o.userId === userId);
    
    res.json({ 
        success: true, 
        orders: userOrders 
    });
});

// Get User Servers
app.get('/api/servers/:userId', (req, res) => {
    const userId = parseInt(req.params.userId);
    const userServers = servers.filter(s => s.userId === userId);
    
    res.json({ 
        success: true, 
        servers: userServers 
    });
});

// Get Server Details
app.get('/api/server/:serverId', (req, res) => {
    const serverId = parseInt(req.params.serverId);
    const server = servers.find(s => s.id === serverId);
    
    if (!server) {
        return res.status(404).json({ 
            success: false, 
            message: 'Sunucu bulunamadı' 
        });
    }
    
    res.json({ 
        success: true, 
        server 
    });
});

// Server Controls
app.post('/api/server/:serverId/start', (req, res) => {
    const serverId = parseInt(req.params.serverId);
    const server = servers.find(s => s.id === serverId);
    
    if (!server) {
        return res.status(404).json({ 
            success: false, 
            message: 'Sunucu bulunamadı' 
        });
    }
    
    server.status = 'active';
    
    res.json({ 
        success: true, 
        message: 'Sunucu başlatıldı',
        server 
    });
});

app.post('/api/server/:serverId/stop', (req, res) => {
    const serverId = parseInt(req.params.serverId);
    const server = servers.find(s => s.id === serverId);
    
    if (!server) {
        return res.status(404).json({ 
            success: false, 
            message: 'Sunucu bulunamadı' 
        });
    }
    
    server.status = 'stopped';
    
    res.json({ 
        success: true, 
        message: 'Sunucu durduruldu',
        server 
    });
});

app.post('/api/server/:serverId/restart', (req, res) => {
    const serverId = parseInt(req.params.serverId);
    const server = servers.find(s => s.id === serverId);
    
    if (!server) {
        return res.status(404).json({ 
            success: false, 
            message: 'Sunucu bulunamadı' 
        });
    }
    
    server.status = 'restarting';
    
    setTimeout(() => {
        server.status = 'active';
    }, 5000);
    
    res.json({ 
        success: true, 
        message: 'Sunucu yeniden başlatılıyor',
        server 
    });
});

// Contact Form
app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;
    
    // In production, send email or save to database
    console.log('Contact Form Submission:', { name, email, message });
    
    res.json({ 
        success: true, 
        message: 'Mesajınız alındı. En kısa sürede dönüş yapacağız.' 
    });
});

// Get Available Games
app.get('/api/games', (req, res) => {
    const games = [
        {
            id: 1,
            name: 'Minecraft',
            description: 'Java & Bedrock Edition destekli Minecraft sunucuları',
            features: ['Mod desteği', 'Plugin yükleyebilme', 'Sınırsız slot']
        },
        {
            id: 2,
            name: 'CS:GO',
            description: '128 tick CS:GO sunucuları ile profesyonel deneyim',
            features: ['128 tick rate', 'Custom map desteği', 'Özel konfigürasyon']
        },
        {
            id: 3,
            name: 'FiveM',
            description: 'Yüksek performanslı FiveM roleplay sunucuları',
            features: ['Özel scriptler', 'OneSync desteği', '256 oyuncu kapasitesi']
        },
        {
            id: 4,
            name: 'Rust',
            description: 'Optimize edilmiş Rust survival sunucuları',
            features: ['Oxide/uMod desteği', 'Custom map yükleme', 'Yüksek FPS']
        },
        {
            id: 5,
            name: 'ARK',
            description: 'Güçlü ARK sunucuları ile dinozor dünyası',
            features: ['Tüm DLC\'ler', 'Mod desteği', 'Küme yapısı']
        },
        {
            id: 6,
            name: 'Discord Bot',
            description: 'Discord botlarınız için güvenilir hosting',
            features: ['7/24 çalışma', 'Düşük gecikme', 'Kolay yönetim']
        }
    ];
    
    res.json({ 
        success: true, 
        games 
    });
});

// Get Pricing Plans
app.get('/api/plans', (req, res) => {
    const plans = [
        {
            id: 1,
            name: 'Başlangıç',
            price: 99,
            ram: '2 GB',
            cpu: '2 Core',
            storage: '20 GB SSD',
            traffic: '1 TB',
            features: ['DDoS Koruması', '7/24 Destek']
        },
        {
            id: 2,
            name: 'Profesyonel',
            price: 199,
            ram: '4 GB',
            cpu: '4 Core',
            storage: '50 GB SSD',
            traffic: '2 TB',
            features: ['DDoS Koruması', '7/24 Öncelikli Destek'],
            popular: true
        },
        {
            id: 3,
            name: 'Kurumsal',
            price: 399,
            ram: '8 GB',
            cpu: '8 Core',
            storage: '100 GB SSD',
            traffic: 'Sınırsız',
            features: ['Gelişmiş DDoS Koruması', '7/24 Premium Destek']
        }
    ];
    
    res.json({ 
        success: true, 
        plans 
    });
});

// Helper Functions
function generateRandomIP() {
    return `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
}

// Serve index.html for all other routes (SPA support)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 GameHost sunucusu ${PORT} portunda çalışıyor`);
    console.log(`📱 http://localhost:${PORT}`);
});