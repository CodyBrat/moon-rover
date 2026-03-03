const request = require('supertest');
const app = require('../app');

describe('POST /api/rovers',() => {
  test('Returns correct output for sample input',async ()=>{
    const res=await request(app)
      .post('/api/rovers')
      .send({input:'5 5\n1 2 N\nLMLMLMLMM\n3 3 E\nMMRMMRMRRM'});
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.output).toEqual(['1 3 N','5 1 E']);
  });

  test('Returns 400 when input field is missing',async()=>{
    const res=await request(app).post('/api/rovers').send({});
    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
  });

  test('Returns 400 for invalid direction',async()=>{
    const res=await request(app)
      .post('/api/rovers')
      .send({input:'5 5\n1 2 X\nMM'});
    expect(res.statusCode).toBe(400);
  });

  test('GET / returns health check', async()=>{
    const res=await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
  });
});