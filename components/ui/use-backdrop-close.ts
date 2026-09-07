'use client'

import { useCallback, useRef, type RefObject } from 'react'

/**
 * A backdrop click that is actually a backdrop click.
 *
 * A `click` is delivered to the nearest common ancestor of wherever the pointer
 * went down and wherever it came up. Select text in a textarea and let go over
 * the dialog's own edge, or press the dialog's scrollbar, and the click's target
 * is the <dialog> element itself — exactly what `e.target === dialog` used to
 * read as "they clicked outside". Six answered questions later that raised
 * "Discard your answers?" for a text selection.
 *
 * Two conditions, both required: the pointer went DOWN on the dialog itself
 * (not on a child), and the click landed outside the dialog's box. Every dialog
 * here is p-0 with content filling it, so a point inside the box is content or
 * the scrollbar, never the backdrop.
 */
export function useBackdropClose(
  ref: RefObject<HTMLDialogElement | null>,
  onBackdrop: () => void,
) {
  const downOnDialog = useRef(false)

  const onPointerDown = useCallback(
    (e: React.PointerEvent<HTMLDialogElement>) => {
      downOnDialog.current = e.target === ref.current
    },
    [ref],
  )

  const onClick = useCallback(
    (e: React.MouseEvent<HTMLDialogElement>) => {
      const el = ref.current
      const wasDown = downOnDialog.current
      downOnDialog.current = false
      if (!el || e.target !== el || !wasDown) return
      const r = el.getBoundingClientRect()
      const inside =
        e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom
      if (inside) return
      onBackdrop()
    },
    [ref, onBackdrop],
  )

  return { onPointerDown, onClick }
}
