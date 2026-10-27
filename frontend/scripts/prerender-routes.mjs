#!/usr/bin/env node
/**
 * prerender-routes.mjs
 *
 * Generates static index.html files for each route listed in routeMeta.js.
 * Each file contains the correct <title>, <meta description>, <link canonical>,
 * OG tags, Twitter card tags, and JSON-LD so that crawlers that don't execute
 * JavaScript still see per-page SEO metadata.
 *
 * Usage:
 *   node frontend/scripts/prerender-routes.mjs
 *
 * Run AFTER `vite build`. It reads frontend/dist/index.html as the template
 * and writes one index.html per route directory under frontend/dist/.
 */

import { readFileSync, writeFileSync, mkdirSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DIST = join(__dirname, '..', 'dist')

// Import route metadata
const { routes, BASE, OG_IMAGE, OG_IMAGE_WIDTH, OG_IMAGE_HEIGHT } = await import(
  join(__dirname, '..', 'src', 'utils', 'routeMeta.js')
)

const template = readFileSync(join(DIST, 'index.html'), 'utf-8')

for (const [path, meta] of Object.entries(routes)) {
  const title = meta.title || 'DoAide PaySlip'
  const description = meta.description || ''
  const canonicalUrl = `${BASE}${path}`

  let html = template

  // Replace <title>
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(title)}</title>`)

  // Replace meta description
  html = html.replace(
    /<meta name="description" content="[^"]*"/,
    `<meta name="description" content="${escapeAttr(description)}"`
  )

  // Replace canonical
  html = html.replace(
    /<link rel="canonical" href="[^"]*"/,
    `<link rel="canonical" href="${escapeAttr(canonicalUrl)}"`
  )

  // Replace OG tags
  html = html.replace(
    /<meta property="og:title" content="[^"]*"/,
    `<meta property="og:title" content="${escapeAttr(title)}"`
  )
  html = html.replace(
    /<meta property="og:description" content="[^"]*"/,
    `<meta property="og:description" content="${escapeAttr(description)}"`
  )
  html = html.replace(
    /<meta property="og:url" content="[^"]*"/,
    `<meta property="og:url" content="${escapeAttr(canonicalUrl)}"`
  )

  // Replace Twitter tags
  html = html.replace(
    /<meta name="twitter:title" content="[^"]*"/,
    `<meta name="twitter:title" content="${escapeAttr(title)}"`
  )
  html = html.replace(
    /<meta name="twitter:description" content="[^"]*"/,
    `<meta name="twitter:description" content="${escapeAttr(description)}"`
  )

  // Replace JSON-LD if route has its own
  if (meta.jsonLd) {
    const jsonLdScript = `<script type="application/ld+json">\n    ${JSON.stringify(meta.jsonLd, null, 2).replace(/\n/g, '\n    ')}\n    </script>`
    html = html.replace(
      /<script type="application\/ld\+json">[\s\S]*?<\/script>/,
      jsonLdScript
    )
  }

  // Write to dist/<path>/index.html (skip root — it's already there)
  if (path === '/') continue

  const outDir = join(DIST, path)
  mkdirSync(outDir, { recursive: true })
  writeFileSync(join(outDir, 'index.html'), html, 'utf-8')
  console.log(`  ✓ ${path}`)
}

console.log(`\nPrerendered ${Object.keys(routes).length - 1} routes.`)

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function escapeAttr(str) {
  return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}
