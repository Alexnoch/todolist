const http = require('http');
const request = require('supertest');

describe('Simple GET /todos test', () => {
  let server;
  let todos = []; // Имитация хранилища

  beforeAll((done) => {
    // Создаем простой сервер для тестов
    const app = (req, res) => {
      if (req.url === '/todos' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ 
          success: true, 
          data: todos 
        }));
      } else {
        res.writeHead(404);
        res.end();
      }
    };

    server = http.createServer(app);
    server.listen(3002, done);
  });

  afterAll((done) => {
    server.close(done);
  });

  beforeEach(() => {
    // Сброс данных перед каждым тестом
    todos = [
      { id: 1, title: 'Learn testing', done: false },
      { id: 2, title: 'Write tests', done: true }
    ];
  });

  test('GET /todos returns correct data', async () => {
    const response = await request('http://localhost:3002').get('/todos');
    
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toEqual(todos);
    expect(response.body.data).toHaveLength(2);
  });

  test('GET /todos returns empty array initially', async () => {
    todos = []; // Очищаем массив
    const response = await request('http://localhost:3002').get('/todos');
    
    expect(response.status).toBe(200);
    expect(response.body.data).toEqual([]);
  });
});