import React from 'react'
import { Link } from '@payloadcms/ui'

export function BackToPortalButton() {
  return (
    <div className="back-to-portal">
      <Link
        href="/"
        className="back-to-portal__link"
        target="_self"
        title="Volver al sitio público del portal"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
        <span>Volver al portal</span>
      </Link>
    </div>
  )
}
