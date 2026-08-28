import { validateQuote } from '../../../lib/quote.ts';

const attempts = new Map<string, { count: number; reset: number }>();
const WINDOW_MS = 60_000;
const LIMIT = 5;
const jsonHeaders = { 'Cache-Control': 'no-store', 'Content-Type': 'application/json; charset=utf-8' };

function clientKey(request: Request) {
  return request.headers.get('cf-connecting-ip') || request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'local';
}
function limited(key: string) {
  const now = Date.now();
  const current = attempts.get(key);
  if (!current || current.reset <= now) { attempts.set(key, { count: 1, reset: now + WINDOW_MS }); return false; }
  current.count += 1;
  return current.count > LIMIT;
}

export async function POST(request: Request) {
  const type = request.headers.get('content-type') || '';
  if (!type.toLowerCase().startsWith('application/json')) return Response.json({ message: 'Tipo de contenido no permitido.' }, { status: 415, headers: jsonHeaders });
  const length = Number(request.headers.get('content-length') || 0);
  if (length > 8_192) return Response.json({ message: 'Solicitud demasiado grande.' }, { status: 413, headers: jsonHeaders });
  const origin = request.headers.get('origin');
  if (origin && new URL(origin).host !== new URL(request.url).host) return Response.json({ message: 'Origen no permitido.' }, { status: 403, headers: jsonHeaders });
  if (limited(clientKey(request))) return Response.json({ message: 'Demasiados intentos. Intenta de nuevo en un minuto.' }, { status: 429, headers: { ...jsonHeaders, 'Retry-After': '60' } });
  let body: unknown;
  try { body = await request.json(); } catch { return Response.json({ message: 'JSON inválido.' }, { status: 400, headers: jsonHeaders }); }
  const result = validateQuote(body);
  if (!result.ok) return Response.json({ message: result.message }, { status: 400, headers: jsonHeaders });
  return Response.json({ message: 'Solicitud validada. Configura el canal comercial antes de recibir solicitudes reales.' }, { status: 202, headers: jsonHeaders });
}
