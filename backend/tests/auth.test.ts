import request from 'supertest';
import app from '../src/app';

describe('Auth Endpoints', () => {
  it('register and login', async () => {
    const name = "Test User"
    const email = `test${Date.now()}@mail.com`;
    const password = 'Pass123!';
    const reg = await request(app).post('/api/auth/register').send({ name, email, password });

    expect(reg.status).toBe(201);

    const login = await request(app).post('/api/auth/login').send({ email, password });
    expect(login.status).toBe(200);
    expect(login.body.token).toBeDefined();
  });
});
