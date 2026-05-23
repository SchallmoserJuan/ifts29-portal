import React from 'react'
import type { Payload } from 'payload'

import type { News } from '@/src/payload-types'

export async function RecentNewsWidget({ payload }: { payload: Payload }) {
  const { docs } = await payload.find({
    collection: 'news',
    sort: '-publishedAt',
    limit: 5,
    where: {
      status: {
        equals: 'published',
      },
    },
  })

  return (
    <div className="recent-news-widget">
      <h3 className="recent-news-widget__title">Últimas noticias</h3>
      {docs.length === 0 ? (
        <p className="recent-news-widget__empty">No hay noticias publicadas.</p>
      ) : (
        <ul className="recent-news-widget__list">
          {docs.map((item: News) => (
            <li key={item.id} className="recent-news-widget__item">
              <span className="recent-news-widget__status recent-news-widget__status--published" />
              <span className="recent-news-widget__name">{item.title}</span>
              <span className="recent-news-widget__meta">
                {item.publishedAt
                  ? new Date(item.publishedAt).toLocaleDateString('es-AR')
                  : 'Sin fecha'}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
