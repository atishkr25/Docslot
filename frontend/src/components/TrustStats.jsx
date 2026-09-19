import React from 'react'

const stats = [
  {
    value: '500+',
    label: 'Verified Doctors',
    description: 'Across 15+ specialities',
    icon: (
      <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    )
  },
  {
    value: '10k+',
    label: 'Appointments Booked',
    description: 'Seamless patient care',
    icon: (
      <svg className="w-6 h-6 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    )
  },
  {
    value: '4.8★',
    label: 'Patient Rating',
    description: 'From 5,000+ verified reviews',
    icon: (
      <svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    )
  },
  {
    value: '24/7',
    label: 'Healthcare Access',
    description: 'Instant online scheduling',
    icon: (
      <svg className="w-6 h-6 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    )
  }
]

const TrustStats = () => {
  return (
    <section className="my-12">
      <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-100 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.05)]">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
          {stats.map((stat, idx) => (
            <div key={idx} className={`flex items-center gap-4 ${idx > 0 ? 'pt-4 sm:pt-0 sm:pl-6' : ''}`}>
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex-shrink-0">
                {stat.icon}
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
                  {stat.value}
                </p>
                <p className="text-sm font-bold text-slate-800">
                  {stat.label}
                </p>
                <p className="text-xs text-slate-500 hidden sm:block">
                  {stat.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TrustStats
