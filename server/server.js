const jsonServer = require('json-server');
const jwt = require('jsonwebtoken');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

const SECRET_KEY = 'your-strong-secret-key-123';

// Middleware
server.use(middlewares);
server.use(jsonServer.bodyParser);

// CORS
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Эндпоинт регистрации (без bcrypt)
server.post('/auth/register', (req, res) => {
  const { username, email, password } = req.body;
  
  // Простая валидация
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Все поля обязательны' });
  }

  const users = router.db.get('users').value();
  if (users.some(u => u.username === username)) {
    return res.status(400).json({ message: 'Имя пользователя занято' });
  }

  const newUser = {
    id: Date.now(),
    username,
    email,
    password 
  };

  router.db.get('users').push(newUser).write();

  const token = jwt.sign({ userId: newUser.id }, SECRET_KEY, { expiresIn: '1h' });
  res.json({ token });
});

// Эндпоинт входа (без bcrypt)
server.post('/auth/login', (req, res) => {
  const { username, password } = req.body;
  const user = router.db.get('users').find({ username, password }).value();

  if (user) {
    const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Неверные данные' });
  }
});

// Защищённые маршруты
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

server.use(router);
server.listen(3000, () => console.log('Server running on port 3000'));