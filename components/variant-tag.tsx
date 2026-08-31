'use client'

import { useEffect } from 'react'
import { setVariant } from '@/lib/analytics'

/**
 * Tells analytics which variant this page is.
 *
 * Set as a GA4 user property as well as an event parameter, so the assignment
 * follows the visitor across sessions — comparing variants only by page_path
 * would lose anyone who came back later by a different route.
 */
export function VariantTag({ slug }: { slug: string }) {
  useEffect(() => setVariant(slug), [slug])
  return null
}
