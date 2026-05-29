import { useEffect } from 'react'

// Generic modal shell: scrim, click-outside + Escape to close, entrance animation.
export default function Modal({ open, onClose, children }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  return (
    <div className={'scrim' + (open ? ' open' : '')} onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal">{open && children}</div>
    </div>
  )
}
