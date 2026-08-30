<div align="center">
  <br />
  <img src="public/equipment/logo.svg" alt="Biomedic Solution Logo" width="90" height="90" />
  <h1>Biomedic Solution 🩺</h1>
  <p><b>Plataforma web para catálogo y cotización de equipamiento e infraestructura médica hospitalaria.</b></p>

  [![Next.js](https://img.shields.io/badge/Next.js-15.0+-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
  [![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
  [![License](https://img.shields.io/badge/License-MIT-teal.svg?style=for-the-badge)](LICENSE)

  <br />
</div>

---

## 📖 Descripción del Proyecto

**Biomedic Solution** es una aplicación web moderna diseñada para la presentación, búsqueda y cotización interactiva de equipos médicos para consultorios, clínicas e instituciones de salud.

Permite a profesionales médicos y administradores hospitalarios explorar un catálogo categorizado de tecnología clínica, visualizar especificaciones técnicas y solicitar presupuestos personalizados de forma directa vía **WhatsApp** y **correo electrónico**.

---

## ✨ Características Principales

- 🔍 **Búsqueda e Historial en Tiempo Real**: Filtrado dinámico instantáneo por nombre de equipo, marca de referencia o tecnología.
- 🏷️ **Categorización Intuitiva**: Clasificación por áreas clínicas (Monitoreo, Diagnóstico, Esterilización, Endoscopia, Infusión).
- 💬 **Generador de Cotizaciones Vía WhatsApp**: Integración directa con API de WhatsApp (`wa.me`) con plantilla pre-formateada de la solicitud.
- 📩 **Notificaciones por Correo Electrónico**: Envío en segundo plano de la solicitud a través de Formspree.
- 📱 **Diseño 100% Responsivo & Accesible**: Layout adaptativo para dispositivos móviles, tablets y monitores clínicos con soporte para navegación por teclado y lectores de pantalla.
- ⚡ **Assets WebP Optimizados**: Imágenes comprimidas de alta definición para una carga ultrarrápida.

---

## 🛠️ Tecnologías Utilizadas

| Categoría | Tecnología |
| :--- | :--- |
| **Framework Web** | [Next.js](https://nextjs.org/) / [ViNext](https://github.com/vitejs/vite) |
| **Biblioteca UI** | [React 19](https://react.dev/) |
| **Lenguaje** | [TypeScript](https://www.typescriptlang.org/) |
| **Estilos CSS** | [Tailwind CSS v4](https://tailwindcss.com/) |
| **Componentes UI** | [Shadcn UI](https://ui.shadcn.com/) / Radix Primitives |
| **Iconografía** | [Lucide Icons](https://lucide.dev/) |
| **Linter & Formatter** | [Oxlint](https://oxc.rs/) & [Oxfmt](https://oxc.rs/) |

---

## 📂 Estructura del Proyecto

```text
biomedic-solution/
├── app/
│   ├── globals.css         # Estilos globales y tokens del tema clínico
│   ├── layout.tsx          # Configuración de HTML root y metadata SEO/OG
│   └── page.tsx            # Página principal de catálogo y modal de cotización
├── components/             # Componentes modulares y primitivas UI (Shadcn)
│   └── ui/                 # Botones, campos de texto, modales, etc.
├── lib/                    # Funciones de utilidad y helpers de Tailwind
├── public/                 # Archivos estáticos y multimedia
│   └── equipment/          # Fotografías e iconos optimizados de equipos médicos
├── tests/                  # Pruebas unitarias e integración
├── next.config.ts          # Configuración de Next.js
├── vite.config.ts          # Configuración de Vite & ViNext bundler
├── tsconfig.json           # Configuración de TypeScript
└── package.json            # Dependencias y scripts del proyecto
```

---

## 🚀 Instalación y Configuración Local

### Prerrequisitos

- **Node.js** `>= 22.13.0`
- **pnpm**, **npm** o **yarn**

### Pasos de Instalación

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/jonathancerezo456-pixel/biomedic-solution.git
   cd biomedic-solution
   ```

2. **Instalar dependencias:**
   ```bash
   pnpm install
   # o bien: npm install
   ```

3. **Iniciar el servidor de desarrollo:**
   ```bash
   pnpm dev
   # o bien: npm run dev
   ```

   Abre `http://localhost:3000` en tu navegador para ver la aplicación en ejecución.

4. **Verificación de tipos TypeScript:**
   ```bash
   pnpm typecheck
   ```

5. **Construcción para producción:**
   ```bash
   pnpm build
   ```

---

## 🤝 Marcas de Referencia Incluidas

- **Welch Allyn**: Diagnóstico clínico y exploración.
- **Mindray**: Monitoreo de pacientes y soporte en atención crítica.
- **Olympus**: Sistemas de endoscopia e imagen médica.
- **Tuttnauer**: Autoclaves y esterilización hospitalaria.
- **B. Braun**: Bombas de infusión y administración controlada.

---

## 📄 Licencia

Este proyecto está bajo la Licencia [MIT](LICENSE).

---

<div align="center">
  <sub>Desarrollado con ❤️ para la gestión y modernización de equipamiento médico.</sub>
</div>
