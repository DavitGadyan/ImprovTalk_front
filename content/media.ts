/**
 * Scenario films.
 *
 * Source files were 1920x1080 HEVC at ~10 Mbps, 121 MB for the four. HEVC does
 * not play in Chrome on most platforms or in Firefox at all, so they were
 * transcoded to H.264 High / yuv420p at 1440x810 (see scripts/transcode-video.sh).
 * The set is now ~15 MB, and because only the selected scenario mounts, a
 * visitor downloads roughly 3 MB — once, and only if they scroll to the band.
 *
 * Self-hosted deliberately: no cookies, no third-party data transfer, so no
 * consent banner and nothing to add to the privacy policy. An embedded YouTube
 * player would send the visitor's IP to Google on page load, which in the EU
 * needs prior consent.
 *
 * Colour grading and generation specs are in docs/BRAND-AND-VIDEO.md.
 */
export type Scenario = {
  slug: string
  label: string
  /** Shown under the player — say what is happening, not what it looks like. */
  caption: string
  /** Describes the footage for screen readers and when video is unavailable. */
  alt: string
}

export const scenarios: Scenario[] = [
  {
    slug: 'coffee-shop',
    label: 'Coffee shop',
    caption: 'The queue. Thirty seconds of shared waiting, and an opening if you take it.',
    alt: 'Two people talking while waiting in a coffee shop queue.',
  },
  {
    slug: 'bali-beach',
    label: 'Bali beach',
    caption: 'Somewhere nobody knows you. The easiest place to practise and the easiest to freeze.',
    alt: 'Two people talking on a beach in Bali.',
  },
  {
    slug: 'barcelona-beach',
    label: 'Barcelona beach',
    caption: 'A busy shoreline, a group, and the problem of joining a conversation already running.',
    alt: 'People talking on a busy beach in Barcelona.',
  },
  {
    slug: 'gym',
    label: 'Gym',
    caption: 'Between sets. Short windows, high stakes, and the worst place to be long-winded.',
    alt: 'Two people talking between sets at a gym.',
  },
]

export const videoSrc = (slug: string) => `/scenarios/${slug}.mp4`
export const posterSrc = (slug: string) => `/scenarios/${slug}.jpg`

export const hasScenarioFilms = scenarios.length > 0
