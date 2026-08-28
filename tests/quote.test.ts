import assert from 'node:assert/strict';
/* oxlint-disable typescript/no-floating-promises */
import test from 'node:test';
import { validateQuote } from '../lib/quote.ts';
import { POST } from '../app/api/quote/route.ts';

const valid = { name: 'Ana Pérez', email: 'ana@clinica.co', phone: '+57 300 123 4567', organization: 'Clínica Norte', need: 'Necesito dos monitores para recuperación.', website: '' };

test('acepta y normaliza una cotización válida', () => {
  const result = validateQuote({ ...valid, name: '  Ana Pérez  ' });
  assert.equal(result.ok, true);
  if (result.ok) assert.equal(result.data.name, 'Ana Pérez');
});
test('rechaza correo, campos largos y honeypot', () => {
  assert.equal(validateQuote({ ...valid, email: 'no-es-correo' }).ok, false);
  assert.equal(validateQuote({ ...valid, need: 'x'.repeat(1001) }).ok, false);
  assert.equal(validateQuote({ ...valid, website: 'spam.test' }).ok, false);
});
test('conserva metacaracteres como texto, sin interpretarlos', () => {
  const result = validateQuote({ ...valid, need: '<script>alert(1)</script> monitor urgente' });
  assert.equal(result.ok, true);
  if (result.ok) assert.equal(result.data.need, '<script>alert(1)</script> monitor urgente');
});
test('API rechaza tipo, origen y datos inválidos', async () => {
  const wrongType = await POST(new Request('https://medinova.test/api/quote', { method: 'POST', body: '{}' }));
  assert.equal(wrongType.status, 415);
  const crossSite = await POST(new Request('https://medinova.test/api/quote', { method: 'POST', headers: { 'content-type': 'application/json', origin: 'https://evil.test', 'x-forwarded-for': 'test-origin' }, body: JSON.stringify(valid) }));
  assert.equal(crossSite.status, 403);
  const invalid = await POST(new Request('https://medinova.test/api/quote', { method: 'POST', headers: { 'content-type': 'application/json', 'x-forwarded-for': 'test-invalid' }, body: JSON.stringify({}) }));
  assert.equal(invalid.status, 400);
});
test('API acepta datos válidos y limita solicitudes', async () => {
  const request = (ip: string) => new Request('https://medinova.test/api/quote', { method: 'POST', headers: { 'content-type': 'application/json', 'x-forwarded-for': ip }, body: JSON.stringify(valid) });
  assert.equal((await POST(request('test-valid'))).status, 202);
  let response: Response | undefined;
  for (let i = 0; i < 6; i++) response = await POST(request('test-limit'));
  assert.equal(response?.status, 429);
});
