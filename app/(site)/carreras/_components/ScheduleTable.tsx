// app/(site)/careers/_components/ScheduleTable.tsx
import React from 'react';

// Definimos los horarios por carrera para cumplir el criterio de aceptación
const SCHEDULES_BY_CARRERA: Record<string, Array<{ time: string; lunes: string; martes: string; miercoles: string; jueves: string; viernes: string; }>> = {
  // Supongamos que el slug de tu carrera actual es 'desarrollo-software' o 'tecnicatura-software'
  'tecnicatura-en-desarrollo-en-software': [
    { time: '18:30 - 20:30', lunes: 'Matemática', martes: '-', miercoles: 'Matemática', jueves: '-', viernes: '-' },
    { time: '20:30 - 22:30', lunes: 'Programación', martes: '-', miercoles: 'Programación', jueves: '-', viernes: '-' },
  ],
  // Otras carreras que tengan horarios se agregan acá. Si no están en este objeto, no mostrarán nada.
};

interface ScheduleTableProps {
  carreraSlug: string;
}

export default function ScheduleTable({ carreraSlug }: ScheduleTableProps) {
  const scheduleData = SCHEDULES_BY_CARRERA[carreraSlug];

  // CRITERIO DE ACEPTACIÓN: Si no hay horarios configurados para este slug, la sección NO se muestra
  if (!scheduleData || scheduleData.length === 0) return null;

  return (
    <div className="w-full my-8">
      <h3 className="text-2xl font-bold mb-4 text-[#072c57]">Horarios de cursada</h3>
      
      <div className="w-full overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
        <table className="w-full min-w-[600px] border-collapse text-left text-sm text-slate-700">
          <thead>
            <tr className="bg-[#072c57] text-white">
              <th className="p-4 font-semibold tracking-wide">Horario</th>
              <th className="p-4 font-semibold tracking-wide">Lunes</th>
              <th className="p-4 font-semibold tracking-wide">Martes</th>
              <th className="p-4 font-semibold tracking-wide">Miércoles</th>
              <th className="p-4 font-semibold tracking-wide">Jueves</th>
              <th className="p-4 font-semibold tracking-wide">Viernes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {scheduleData.map((row, index) => (
              <tr key={index} className="bg-[#f3f8ff] hover:bg-blue-50/50 transition-colors">
                <td className="p-4 font-medium text-[#072c57] whitespace-nowrap">{row.time}</td>
                <td className="p-4 whitespace-nowrap">{row.lunes}</td>
                <td className="p-4 whitespace-nowrap">{row.martes}</td>
                <td className="p-4 whitespace-nowrap">{row.miercoles}</td>
                <td className="p-4 whitespace-nowrap">{row.jueves}</td>
                <td className="p-4 whitespace-nowrap">{row.viernes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}