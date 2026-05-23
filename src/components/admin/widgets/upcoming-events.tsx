import React from 'react'
import type { Payload } from 'payload'

import type { Event } from '@/src/payload-types'

export async function UpcomingEventsWidget({ payload }: { payload: Payload }) {
  const today = new Date().toISOString()

  const { docs } = await payload.find({
    collection: 'events',
    sort: 'date',
    limit: 3,
    where: {
      status: {
        equals: 'published',
      },
      date: {
        greater_than_equal: today,
      },
    },
  })

  return (
    <div className="upcoming-events-widget">
      <h3 className="upcoming-events-widget__title">Próximos eventos</h3>
      {docs.length === 0 ? (
        <p className="upcoming-events-widget__empty">No hay eventos programados.</p>
      ) : (
        <ul className="upcoming-events-widget__list">
          {docs.map((item: Event) => {
            const dateObj = item.date ? new Date(item.date) : null
            const day = dateObj?.getDate()
            const month = dateObj?.toLocaleDateString('es-AR', { month: 'short' })

            return (
              <li key={item.id} className="upcoming-events-widget__item">
                <div className="upcoming-events-widget__date-block">
                  <span className="upcoming-events-widget__day">{day}</span>
                  <span className="upcoming-events-widget__month">{month}</span>
                </div>
                <div className="upcoming-events-widget__content">
                  <span className="upcoming-events-widget__name">{item.title}</span>
                  <span className="upcoming-events-widget__location">{item.location}</span>
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
