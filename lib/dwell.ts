'use client'

/**
 * Time actually spent reading, accumulated across page loads.
 *
 * The site is a static export, so every navigation is a fresh document and a
 * per-page timer would reset on each one — someone who reads five pages for
 * forty seconds each would never reach a 2.5-minute threshold. The total lives
 * in localStorage instead.
 *
 * Only *visible* time counts. A tab left open in the background all afternoon
 * has not been reading, and firing a modal into it means the visitor comes back
 * to a dialog over a page they have forgotten opening.
 */

const KEY = 'improvtalk-dwell'
const TICK = 1000
/** Write at most this often; the tick itself stays in memory. */
const FLUSH = 5000

function read(): number {
  try {
    const raw = localStorage.getItem(KEY)
    const n = raw ? Number(raw) : 0
    return Number.isFinite(n) && n >= 0 ? n : 0
  } catch {
    return 0
  }
}

function write(ms: number) {
  try {
    localStorage.setItem(KEY, String(ms))
  } catch {
    /* private mode — the timer still works for this document, and the
       threshold is simply reached later or not at all. Not worth failing. */
  }
}

/**
 * Runs `onReach` once total visible time passes `thresholdMs`. Returns a
 * cleanup that flushes the accumulated total, so time is not lost on unmount.
 */
export function watchDwell(thresholdMs: number, onReach: () => void): () => void {
  let total = read()
  let sinceFlush = 0
  let fired = false

  const flush = () => {
    if (sinceFlush === 0) return
    write(total)
    sinceFlush = 0
  }

  const tick = () => {
    if (document.visibilityState !== 'visible') return
    total += TICK
    sinceFlush += TICK
    if (sinceFlush >= FLUSH) flush()
    if (!fired && total >= thresholdMs) {
      fired = true
      flush()
      onReach()
    }
  }

  const id = window.setInterval(tick, TICK)
  const onHide = () => {
    if (document.visibilityState === 'hidden') flush()
  }

  document.addEventListener('visibilitychange', onHide)
  window.addEventListener('pagehide', flush)

  return () => {
    window.clearInterval(id)
    document.removeEventListener('visibilitychange', onHide)
    window.removeEventListener('pagehide', flush)
    flush()
  }
}

/** Current total, for diagnostics. */
export function dwellSoFar(): number {
  return read()
}

/** Wipe the counter — used once the offer has been taken or refused. */
export function clearDwell() {
  try {
    localStorage.removeItem(KEY)
  } catch {
    /* nothing to do */
  }
}
