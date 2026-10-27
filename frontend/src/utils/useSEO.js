import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import routes, { BASE, OG_IMAGE, OG_IMAGE_WIDTH, OG_IMAGE_HEIGHT } from './routeMeta'

/**
 * Sets all SEO meta tags for the current page.
 * Reads from routeMeta.js by default; accepts overrides for blog posts with custom JSON-LD.
 *
 * @param {Object} [overrides] - Optional overrides for title, description, jsonLd
 */
export default function useSEO(overrides = {}) {
  const { pathname } = useLocation()

  useEffect(() => {
    const meta = routes[pathname] || {}
    const title = overrides.title || meta.title || 'DoAide PaySlip'
    const description = overrides.description || meta.description || ''
    const canonicalUrl = `${BASE}${pathname}`
    const jsonLdData = overrides.jsonLd || meta.jsonLd || null

    // Title
    document.title = title

    // Helper to set or create a <meta> tag
    function setMeta(attr, key, value) {
      let el = document.querySelector(`meta[${attr}="${key}"]`)
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute(attr, key)
        document.head.appendChild(el)
      }
      el.setAttribute('content', value)
    }

    // Description
    setMeta('name', 'description', description)

    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', canonicalUrl)

    // Open Graph tags
    setMeta('property', 'og:title', title)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:url', canonicalUrl)
    setMeta('property', 'og:type', 'website')
    setMeta('property', 'og:image', OG_IMAGE)
    setMeta('property', 'og:image:width', OG_IMAGE_WIDTH)
    setMeta('property', 'og:image:height', OG_IMAGE_HEIGHT)
    setMeta('property', 'og:site_name', 'DoAide PaySlip')

    // Twitter card
    setMeta('name', 'twitter:card', 'summary_large_image')
    setMeta('name', 'twitter:title', title)
    setMeta('name', 'twitter:description', description)
    setMeta('name', 'twitter:image', OG_IMAGE)

    // JSON-LD — remove previous ones set by this hook, then inject new
    document.querySelectorAll('script[data-seo-hook]').forEach(s => s.remove())
    const schemas = Array.isArray(jsonLdData) ? jsonLdData : jsonLdData ? [jsonLdData] : []
    const scripts = schemas.map(data => {
      const script = document.createElement('script')
      script.type = 'application/ld+json'
      script.setAttribute('data-seo-hook', 'true')
      script.textContent = JSON.stringify(data)
      document.head.appendChild(script)
      return script
    })

    return () => {
      scripts.forEach(s => s.remove())
    }
  }, [pathname, overrides.title, overrides.description, overrides.jsonLd])
}
