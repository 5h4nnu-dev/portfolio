"use client"

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react"
import { Maximize2, Minimize2 } from "lucide-react"

const PHOTO_BASE = "/assets/profile"
const PHOTO_ALT =
  "Shannu, security engineer, in a dark room with a glowing code-symbol sign, holding a phone in front of his face"
const OPEN_EASING = "cubic-bezier(0.16, 1, 0.3, 1)"
const CLOSE_EASING = "cubic-bezier(0.4, 0, 1, 1)"

function reducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

/** Transform that maps the expanded panel onto the thumbnail's current rect. */
function flipTo(source: DOMRect, target: DOMRect) {
  return `translate(${source.left - target.left}px, ${source.top - target.top}px) scale(${source.width / target.width}, ${source.height / target.height})`
}

export default function PortraitViewer() {
  const [open, setOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const openAnimRef = useRef<Animation | null>(null)
  const closeAnimRef = useRef<Animation | null>(null)
  const scrollLockRef = useRef<{ overflow: string; paddingRight: string } | null>(null)

  const unlockScroll = useCallback(() => {
    const previous = scrollLockRef.current
    if (!previous) return
    document.body.style.overflow = previous.overflow
    document.body.style.paddingRight = previous.paddingRight
    scrollLockRef.current = null
  }, [])

  const finishClose = useCallback(() => {
    closeAnimRef.current = null
    const dialog = dialogRef.current
    dialog?.classList.remove("is-closing")
    if (dialog?.open) dialog.close()
    unlockScroll()
    setOpen(false)
    triggerRef.current?.focus({ preventScroll: true })
  }, [unlockScroll])

  const close = useCallback(() => {
    if (closeAnimRef.current) return
    const dialog = dialogRef.current
    const panel = panelRef.current
    if (!dialog?.open || !panel) return

    // Interrupting the opening animation is safe — we re-measure for the reverse.
    openAnimRef.current?.cancel()
    openAnimRef.current = null

    if (reducedMotion()) {
      finishClose()
      return
    }

    const source = triggerRef.current?.getBoundingClientRect()
    const target = panel.getBoundingClientRect()
    dialog.classList.add("is-closing")
    const animation = panel.animate(
      [
        { transform: "none", opacity: 1 },
        { transform: source ? flipTo(source, target) : "scale(0.92)", opacity: 0.4 },
      ],
      { duration: 380, easing: CLOSE_EASING, fill: "forwards" }
    )
    closeAnimRef.current = animation
    void animation.finished.then(finishClose, finishClose)
  }, [finishClose])

  useLayoutEffect(() => {
    if (!open) return
    const dialog = dialogRef.current
    const panel = panelRef.current
    if (!dialog || !panel) return

    dialog.showModal()

    const previous = { overflow: document.body.style.overflow, paddingRight: document.body.style.paddingRight }
    const scrollbar = window.innerWidth - document.documentElement.clientWidth
    document.body.style.overflow = "hidden"
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`
    scrollLockRef.current = previous

    if (!reducedMotion()) {
      const source = triggerRef.current?.getBoundingClientRect()
      const target = panel.getBoundingClientRect()
      if (source) {
        const animation = panel.animate(
          [
            { transform: flipTo(source, target), opacity: 0.5 },
            { transform: "none", opacity: 1 },
          ],
          { duration: 520, easing: OPEN_EASING }
        )
        openAnimRef.current = animation
        void animation.finished.finally(() => {
          if (openAnimRef.current === animation) openAnimRef.current = null
        })
      }
    }

    dialog.querySelector<HTMLButtonElement>("[data-close]")?.focus({ preventScroll: true })
  }, [open])

  useEffect(
    () => () => {
      openAnimRef.current?.cancel()
      closeAnimRef.current?.cancel()
      const dialog = dialogRef.current
      if (dialog?.open) dialog.close()
      const previous = scrollLockRef.current
      if (previous) {
        document.body.style.overflow = previous.overflow
        document.body.style.paddingRight = previous.paddingRight
        scrollLockRef.current = null
      }
    },
    []
  )

  return (
    <>
      <figure className="hero-portrait">
        <button
          ref={triggerRef}
          type="button"
          className="hero-portrait__trigger"
          aria-label="Expand profile photo"
          aria-haspopup="dialog"
          aria-expanded={open}
          onClick={() => setOpen(true)}
        >
          <span className="hero-portrait__bar">
            <span className="hero-portrait__dots" aria-hidden="true"><i /><i /><i /></span>
            <span className="hero-portrait__title">shannu@portfolio: ~/profile.png</span>
          </span>
          <span className="hero-portrait__frame">
            <picture>
              <source
                type="image/webp"
                srcSet={`${PHOTO_BASE}/profile-hero-480.webp 480w, ${PHOTO_BASE}/profile-hero-800.webp 800w, ${PHOTO_BASE}/profile-hero-1000.webp 1000w`}
                sizes="(min-width: 1024px) 420px, 80vw"
              />
              <img
                className="hero-portrait__img"
                src={`${PHOTO_BASE}/profile-hero-800.jpg`}
                alt={PHOTO_ALT}
                width={800}
                height={1000}
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />
            </picture>
            <span className="hero-portrait__fade" aria-hidden="true" />
            <span className="hero-portrait__scan" aria-hidden="true" />
            <span className="hero-portrait__sweep" aria-hidden="true" />
            <span className="hero-portrait__hint" aria-hidden="true"><Maximize2 size={12} /> expand</span>
          </span>
          <span className="hero-portrait__badge"><i className="pulse-dot" aria-hidden="true" /> ONLINE</span>
        </button>
      </figure>

      {open && (
        <dialog
          ref={dialogRef}
          className="portrait-dialog"
          aria-label="Profile photo, enlarged"
          onCancel={(event) => {
            event.preventDefault()
            close()
          }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) close()
          }}
        >
          <div className="portrait-dialog__panel" ref={panelRef}>
            <div className="portrait-dialog__bar">
              <span className="hero-portrait__dots" aria-hidden="true"><i /><i /><i /></span>
              <span className="hero-portrait__title">shannu@portfolio: ~/profile.png</span>
              <button
                type="button"
                data-close
                className="portrait-dialog__close"
                onClick={close}
                aria-label="Minimize profile photo"
              >
                <Minimize2 size={13} aria-hidden="true" /> esc
              </button>
            </div>
            <button type="button" className="portrait-dialog__surface" onClick={close} aria-label="Minimize profile photo">
              <picture>
                <source type="image/webp" srcSet={`${PHOTO_BASE}/profile-hero-1000.webp`} />
                <img src={`${PHOTO_BASE}/profile-hero-800.jpg`} alt={PHOTO_ALT} width={800} height={1000} decoding="async" />
              </picture>
              <span className="portrait-dialog__scan" aria-hidden="true" />
              <span className="portrait-dialog__sweep" aria-hidden="true" />
              <span className="portrait-dialog__hint" aria-hidden="true"><Minimize2 size={12} /> click to minimize</span>
            </button>
          </div>
        </dialog>
      )}
    </>
  )
}
