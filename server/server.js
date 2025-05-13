const jsonServer = require('json-server');
const jwt = require('jsonwebtoken');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

const SECRET_KEY = 'your-strong-secret-key-123';

// Middleware
server.use(middlewares);
server.use(jsonServer.bodyParser);

server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200'); // Укажи точный URL фронтенда
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Логирование всех запросов
server.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// CORS
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});

// Эндпоинты аутентификации
server.post('/auth/login', (req, res) => {
  const { username, password } = req.body;
  const user = router.db.get('users').find({ username }).value();

  if (user && user.password === password) {
    const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Неверные учетные данные' });
  }
});

// Защита маршрутов
server.use((req, res, next) => {
  if (req.path.startsWith('/auth')) return next();
  
  try {
    const token = req.headers.authorization?.split(' ')[1];
    jwt.verify(token, SECRET_KEY);
    next();
  } catch {
    res.status(401).json({ message: 'Требуется авторизация' });
  }
});

// Основной роутер
server.use(router);

// Запуск сервера
server.listen(3000, () => {
  console.log('Сервер запущен на http://localhost:3000');
  console.log('Доступные маршруты:');
  console.log('POST /auth/login');
  console.log('GET /users');
  console.log('GET /hotels');
});