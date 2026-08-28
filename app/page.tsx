'use client';
/* oxlint-disable jsx-a11y/label-has-associated-control, jsx-a11y/prefer-tag-over-role */

import { useMemo, useState, type SyntheticEvent } from 'react';
import { Activity, ArrowRight, CheckCircle2, HeartPulse, Menu, Search, ShieldCheck, Stethoscope, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const products = [
  ['Monitor de signos vitales iM3', 'Edan', 'Monitoreo', Activity, 'ECG, SpO₂, presión no invasiva y temperatura en una interfaz compacta.'],
  ['Estetoscopio profesional Harvey', 'Welch Allyn', 'Diagnóstico', Stethoscope, 'Acústica de doble cabezal para exploración clínica general.'],
  ['Autoclave de mesa T-Edge', 'Tuttnauer', 'Esterilización', ShieldCheck, 'Ciclos trazables y cámara eficiente para clínicas y consultorios.'],
  ['Monitor de paciente ePM', 'Mindray', 'Monitoreo', HeartPulse, 'Visualización modular para atención crítica y recuperación.'],
  ['Sistema de endoscopia EVIS', 'Olympus', 'Endoscopia', Activity, 'Plataforma de imagen para procedimientos endoscópicos.'],
  ['Bomba de infusión compacta', 'B. Braun', 'Infusión', HeartPulse, 'Administración controlada con alarmas visuales y auditivas.'],
] as const;
const categories = ['Todos', ...Array.from(new Set(products.map((p) => p[2])))];

export default function Home() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('Todos');
  const [menu, setMenu] = useState(false);
  const [quote, setQuote] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const visible = useMemo(() => products.filter((p) => {
    const needle = query.toLowerCase().trim();
    return (category === 'Todos' || p[2] === category) && (!needle || `${p[0]} ${p[1]} ${p[2]}`.toLowerCase().includes(needle));
  }), [query, category]);

  async function submit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault(); setStatus('loading'); setMessage('');
    try {
      const response = await fetch('/api/quote', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(Object.fromEntries(new FormData(event.currentTarget))) });
      const body = await response.json() as { message?: string };
      if (!response.ok) throw new Error(body.message || 'No pudimos procesar la solicitud.');
      setStatus('success'); setMessage(body.message || 'Solicitud recibida.'); event.currentTarget.reset();
    } catch (error) { setStatus('error'); setMessage(error instanceof Error ? error.message : 'Ocurrió un error.'); }
  }

  return <>
    <a className="skip-link" href="#contenido">Saltar al contenido</a>
    <header className="sticky top-0 z-40 border-b border-teal-950/10 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <a href="#inicio" className="flex items-center gap-3 text-xl font-bold text-teal-950" aria-label="Biomedic Solution, inicio"><span className="grid h-10 w-10 place-items-center rounded-xl bg-teal-700 text-white"><HeartPulse /></span>Biomedic Solution</a>
        <nav className="hidden items-center gap-7 md:flex" aria-label="Navegación principal"><a href="#catalogo">Catálogo</a><a href="#servicios">Servicios</a><a href="#confianza">Por qué elegirnos</a></nav>
        <div className="flex gap-2"><Button onClick={() => setQuote(true)} className="hidden bg-teal-700 hover:bg-teal-800 sm:inline-flex">Solicitar cotización</Button><Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMenu(!menu)} aria-label={menu ? 'Cerrar menú' : 'Abrir menú'}>{menu ? <X /> : <Menu />}</Button></div>
      </div>
      {menu && <nav className="grid gap-3 border-t px-5 py-4 md:hidden"><a href="#catalogo" onClick={() => setMenu(false)}>Catálogo</a><a href="#servicios" onClick={() => setMenu(false)}>Servicios</a><Button onClick={() => { setMenu(false); setQuote(true); }} className="bg-teal-700">Cotizar</Button></nav>}
    </header>
    <main id="contenido">
      <section id="inicio" className="hero-grid overflow-hidden bg-teal-950 text-white"><div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 lg:grid-cols-[1.1fr_.9fr] lg:px-8 lg:py-28">
        <div><p className="eyebrow text-teal-200">Tecnología para cuidar mejor</p><h1 className="mt-5 max-w-3xl text-5xl font-semibold leading-[1.06] tracking-tight sm:text-6xl">Equipos médicos confiables para decisiones clínicas precisas.</h1><p className="mt-6 max-w-2xl text-lg leading-8 text-teal-50/80">Tecnología para consultorios, clínicas e instituciones de salud, con acompañamiento antes y después de la compra.</p><div className="mt-9 flex flex-wrap gap-3"><Button size="lg" onClick={() => setQuote(true)} className="bg-lime-300 text-teal-950 hover:bg-lime-200">Hablar con un asesor <ArrowRight /></Button><Button size="lg" variant="outline" asChild className="border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white"><a href="#catalogo">Explorar catálogo</a></Button></div></div>
        <div className="rounded-[2rem] border border-white/15 bg-white/10 p-7 shadow-2xl backdrop-blur"><div className="rounded-3xl bg-white p-8 text-teal-950"><p className="text-sm font-semibold uppercase tracking-widest text-teal-700">Acompañamiento integral</p><div className="mt-8 grid gap-5">{['Selección según el entorno clínico', 'Documentación técnica y trazabilidad', 'Orientación para instalación y soporte'].map((item, i) => <div key={item} className="flex items-start gap-4"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-teal-50 font-bold text-teal-700">0{i + 1}</span><p className="pt-1 font-medium">{item}</p></div>)}</div></div></div>
      </div></section>
      <section aria-label="Marcas de referencia" className="border-b bg-white"><div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-4 px-5 py-7 text-sm font-semibold text-slate-500"><span className="text-xs uppercase tracking-widest text-teal-700">Marcas de referencia</span>{['Welch Allyn', 'Mindray', 'Olympus', 'Tuttnauer', 'B. Braun'].map((b) => <span key={b}>{b}</span>)}</div></section>
      <section id="catalogo" className="mx-auto max-w-7xl px-5 py-20 lg:px-8"><div className="max-w-2xl"><p className="eyebrow">Catálogo seleccionado</p><h2 className="section-title">Tecnología para cada área de atención</h2><p className="section-copy">Explora categorías y solicita una propuesta. Los productos son referencias y su disponibilidad debe confirmarse.</p></div>
        <div className="mt-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"><label className="relative block max-w-md flex-1"><span className="sr-only">Buscar equipos</span><Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" /><Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar equipo, marca o categoría" className="h-12 pl-12" /></label><div className="flex flex-wrap gap-2" aria-label="Filtrar por categoría">{categories.map((item) => <Button key={item} size="sm" variant={category === item ? 'default' : 'outline'} onClick={() => setCategory(item)} className={category === item ? 'bg-teal-700 hover:bg-teal-800' : ''}>{item}</Button>)}</div></div>
        {visible.length ? <div className="mt-9 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{visible.map((p) => { const Icon = p[3]; return <article key={p[0]} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"><div className="flex justify-between"><span className="grid h-14 w-14 place-items-center rounded-2xl bg-teal-50 text-teal-700"><Icon /></span><span className="h-fit rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold">{p[2]}</span></div><p className="mt-7 text-sm font-semibold text-teal-700">{p[1]}</p><h3 className="mt-1 text-xl font-semibold">{p[0]}</h3><p className="mt-3 min-h-16 leading-7 text-slate-600">{p[4]}</p><Button variant="link" className="mt-4 h-auto p-0 text-teal-700" onClick={() => setQuote(true)}>Solicitar información <ArrowRight /></Button></article>; })}</div> : <div className="mt-9 rounded-3xl border border-dashed p-12 text-center"><Search className="mx-auto text-slate-400" /><h3 className="mt-4 text-lg font-semibold">No encontramos coincidencias</h3><p className="mt-2 text-slate-600">Prueba otra búsqueda o muestra todos los productos.</p><Button variant="outline" className="mt-5" onClick={() => { setQuery(''); setCategory('Todos'); }}>Limpiar filtros</Button></div>}
      </section>
      <section id="servicios" className="bg-slate-50"><div className="mx-auto max-w-7xl px-5 py-20 lg:px-8"><p className="eyebrow">Más que equipamiento</p><h2 className="section-title">Acompañamiento durante todo el proceso</h2><div className="mt-10 grid gap-5 md:grid-cols-3">{[['01','Asesoría técnica','Evaluamos uso, entorno clínico y requisitos operativos.'],['02','Entrega coordinada','Planeamos recepción, instalación y documentación.'],['03','Soporte posventa','Orientamos mantenimiento y continuidad operativa.']].map((s) => <article key={s[0]} className="rounded-3xl bg-white p-7"><span className="text-sm font-bold text-teal-700">{s[0]}</span><h3 className="mt-5 text-xl font-semibold">{s[1]}</h3><p className="mt-3 leading-7 text-slate-600">{s[2]}</p></article>)}</div></div></section>
      <section id="confianza" className="mx-auto max-w-7xl px-5 py-20 lg:px-8"><div className="grid gap-10 rounded-[2rem] bg-teal-700 p-8 text-white md:grid-cols-[1fr_auto] md:items-center md:p-12"><div><p className="eyebrow text-teal-100">Tu proyecto, bien acompañado</p><h2 className="mt-3 text-3xl font-semibold sm:text-4xl">Cuéntanos qué necesita tu institución.</h2><p className="mt-4 text-teal-50/80">Te ayudamos a comparar alternativas y preparar una cotización clara.</p></div><Button size="lg" onClick={() => setQuote(true)} className="bg-white text-teal-800 hover:bg-teal-50">Solicitar cotización</Button></div></section>
    </main>
    <footer className="border-t"><div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 text-sm text-slate-600 md:flex-row md:justify-between lg:px-8"><p>© 2026 Biomedic Solution. Sitio demostrativo.</p><p>Disponibilidad y registros sanitarios varían según el país; confirma antes de comprar.</p></div></footer>
    {quote && <div className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-teal-950/70 p-4" role="dialog" aria-modal="true" aria-labelledby="quote-title"><div className="my-8 w-full max-w-xl rounded-3xl bg-white p-6 shadow-2xl sm:p-8"><div className="flex justify-between"><div><p className="eyebrow">Cotización</p><h2 id="quote-title" className="mt-2 text-2xl font-semibold">Hablemos de tu necesidad</h2></div><Button variant="ghost" size="icon" onClick={() => { setQuote(false); setStatus('idle'); }} aria-label="Cerrar formulario"><X /></Button></div>{status === 'success' ? <div className="py-10 text-center"><CheckCircle2 className="mx-auto h-12 w-12 text-teal-700" /><p className="mt-4 font-semibold">{message}</p><Button className="mt-6 bg-teal-700" onClick={() => { setQuote(false); setStatus('idle'); }}>Cerrar</Button></div> : <form className="mt-7 grid gap-4" onSubmit={submit}><label>Nombre completo<Input name="name" required minLength={2} maxLength={80} className="mt-2" /></label><label>Correo institucional<Input name="email" required type="email" maxLength={120} className="mt-2" /></label><label>Teléfono<Input name="phone" required type="tel" minLength={7} maxLength={30} className="mt-2" /></label><label>Institución<Input name="organization" required minLength={2} maxLength={120} className="mt-2" /></label><label>¿Qué necesitas?<Textarea name="need" required minLength={10} maxLength={1000} className="mt-2 min-h-28" /></label><label className="sr-only" aria-hidden="true">No completar<Input name="website" tabIndex={-1} autoComplete="off" /></label>{status === 'error' && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{message}</p>}<p className="text-xs leading-5 text-slate-500">Demostración: validaremos la solicitud, pero todavía no se conecta con un sistema comercial externo.</p><Button type="submit" disabled={status === 'loading'} className="h-11 bg-teal-700">{status === 'loading' ? 'Enviando…' : 'Enviar solicitud'}</Button></form>}</div></div>}
  </>;
}
