# TenderPack

**TenderPack — Tender Document Package Builder**

A frontend-only web application for building and managing tender document packages.

## Tech Stack

- **React** - UI framework
- **TypeScript** - Type-safe JavaScript
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **pdf.js** - PDF rendering and manipulation
- **pdf-lib** - PDF document creation and modification

## Architecture

TenderPack is a **completely client-side application**. All document processing, PDF manipulation, and data management happen entirely in the browser. No backend server, database, or API is required.

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The application will be available at `http://localhost:5173/`

### Production Build

```bash
npm run build
```

The production-ready files will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/    # React components
├── pages/         # Page-level components
├── core/          # Core application logic
├── pdf/           # PDF processing utilities
├── types/         # TypeScript type definitions
├── i18n/          # Internationalization
├── utils/         # General utility functions
├── assets/        # Static assets
├── App.tsx        # Root application component
├── main.tsx       # Application entry point
└── index.css      # Global styles (Tailwind)
```

## License

All rights reserved.
