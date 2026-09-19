import React from 'react'

const steps = [
  {
    number: '01',
    title: 'EFFICIENCY',
    description: 'Streamlined appointment scheduling that fits seamlessly into your busy lifestyle.'
  },
  {
    number: '02',
    title: 'CONVENIENCE',
    description: 'Access to an expansive network of trusted healthcare professionals in your local area.'
  },
  {
    number: '03',
    title: 'PERSONALIZATION',
    description: 'Tailored recommendations and reminders to help you stay on top of your ongoing health.'
  },
  {
    number: '04',
    title: '24/7 AVAILABILITY',
    description: 'Real-time booking access anytime, from anywhere with instant slot confirmations.'
  }
]

const ChooseUs = () => {
  return (
    <section className="my-20">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-100">
          Why MediSlot
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mt-4">
          Healthcare Designed Around You
        </h2>
        <p className="text-slate-600 text-sm sm:text-base mt-2 leading-relaxed">
          Experience modern patient-first scheduling built to make finding and consulting top doctors effortless.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((item, idx) => (
          <div 
            key={idx} 
            className="vital-card p-8 rounded-2xl border border-slate-100 flex flex-col justify-between group hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden"
          >
            {/* Ambient subtle corner tint */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50/50 rounded-bl-full pointer-events-none group-hover:bg-blue-100/60 transition-colors" />

            <div>
              <span className="text-4xl sm:text-5xl font-black text-slate-200 group-hover:text-blue-600 transition-colors tracking-tighter">
                {item.number}
              </span>
              <h3 className="text-slate-900 font-bold text-lg tracking-tight mt-4 mb-2">
                {item.title}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {item.description}
              </p>
            </div>

            <div className="pt-6 mt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
              <span>Learn more</span>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default ChooseUs
