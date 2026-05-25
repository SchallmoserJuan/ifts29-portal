import React from 'react'
import type { Payload } from 'payload'

export async function DashboardStatsWidget({ payload }: { payload: Payload }) {
  const [{ totalDocs: totalNews }, { totalDocs: totalEvents }, { totalDocs: totalContacts }, { totalDocs: totalUsers }] =
    await Promise.all([
      payload.find({ collection: 'news', limit: 0 }),
      payload.find({ collection: 'events', limit: 0 }),
      payload.find({ collection: 'contacts', limit: 0 }),
      payload.find({ collection: 'users', limit: 0 }),
    ])

  const stats = [
    { label: 'Noticias', value: totalNews, color: 'blue' },
    { label: 'Eventos', value: totalEvents, color: 'cyan' },
    { label: 'Contactos', value: totalContacts, color: 'indigo' },
    { label: 'Usuarios', value: totalUsers, color: 'navy' },
  ]

  return (
    <div className="dashboard-stats-widget">
      <h3 className="dashboard-stats-widget__title">Resumen del portal</h3>
      <div className="dashboard-stats-widget__grid">
        {stats.map((stat) => (
          <div key={stat.label} className={`dashboard-stats-widget__card dashboard-stats-widget__card--${stat.color}`}>
            <span className="dashboard-stats-widget__value">{stat.value}</span>
            <span className="dashboard-stats-widget__label">{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
