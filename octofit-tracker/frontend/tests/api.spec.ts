import { test, expect } from '@playwright/test';

test('backend workouts API end-to-end', async ({ request }) => {
  const base = 'http://localhost:8000';
  // create
  const title = `API Test ${Date.now()}`;
  const create = await request.post(`${base}/api/workouts`, {
    headers: { 'Content-Type': 'application/json' },
    data: JSON.stringify({ title, duration: 20, calories: 150 })
  });
  expect(create.status()).toBe(201);
  const created = await create.json();
  expect(created).toHaveProperty('_id');
  expect(created.title).toBe(title);

  // list
  const list = await request.get(`${base}/api/workouts`);
  expect(list.status()).toBe(200);
  const items = await list.json();
  expect(Array.isArray(items)).toBeTruthy();
  expect(items.some((i: any) => i._id === created._id)).toBeTruthy();
});
