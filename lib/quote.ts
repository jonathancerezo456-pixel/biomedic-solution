export type Quote = { name: string; email: string; phone: string; organization: string; need: string };
const limits = { name: 80, email: 120, phone: 30, organization: 120, need: 1000 } as const;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[0-9+() .-]{7,30}$/;

export function validateQuote(input: unknown): { ok: true; data: Quote } | { ok: false; message: string } {
  if (!input || typeof input !== 'object' || Array.isArray(input)) return { ok: false, message: 'Solicitud inválida.' };
  const source = input as Record<string, unknown>;
  if (typeof source.website === 'string' && source.website.trim()) return { ok: false, message: 'Solicitud inválida.' };
  const data = {} as Quote;
  for (const key of Object.keys(limits) as (keyof Quote)[]) {
    if (typeof source[key] !== 'string') return { ok: false, message: 'Completa todos los campos.' };
    const value = source[key].trim();
    if (!value || value.length > limits[key]) return { ok: false, message: 'Uno o más campos no son válidos.' };
    data[key] = value;
  }
  if (data.name.length < 2 || data.organization.length < 2 || data.need.length < 10) return { ok: false, message: 'Incluye información suficiente para atenderte.' };
  if (!emailPattern.test(data.email)) return { ok: false, message: 'El correo no es válido.' };
  if (!phonePattern.test(data.phone)) return { ok: false, message: 'El teléfono no es válido.' };
  return { ok: true, data };
}
