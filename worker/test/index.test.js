import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import worker from '../src/index.js';

describe('Date invitation worker', () => {
	it('returns 404 for unknown routes', async () => {
		const response = await worker.fetch(new Request('https://example.com/'), {});
		assert.equal(response.status, 404);
		assert.deepEqual(await response.json(), { success: false, error: 'Not found' });
	});

	it('rejects unsupported methods', async () => {
		const request = new Request('https://example.com/send-date');
		const response = await worker.fetch(request, {});
		assert.equal(response.status, 405);
	});

	it('validates required fields before contacting Telegram', async () => {
		const request = new Request('https://example.com/send-date', {
			method: 'POST',
			body: JSON.stringify({ activity: 'Walk' }),
		});
		const response = await worker.fetch(request, {});
		assert.equal(response.status, 400);
	});

	it('allows configured origins in preflight responses', async () => {
		const origin = 'https://vinodell.github.io';
		const request = new Request('https://example.com/send-date', {
			method: 'OPTIONS',
			headers: { Origin: origin },
		});
		const response = await worker.fetch(request, {});
		assert.equal(response.status, 204);
		assert.equal(response.headers.get('Access-Control-Allow-Origin'), origin);
	});

	it('does not allow unknown origins', async () => {
		const request = new Request('https://example.com/send-date', {
			method: 'OPTIONS',
			headers: { Origin: 'https://example.org' },
		});
		const response = await worker.fetch(request, {});
		assert.equal(response.headers.get('Access-Control-Allow-Origin'), null);
	});
});
