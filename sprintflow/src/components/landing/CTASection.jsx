import { Link } from 'react-router-dom'

export default function CTASection() {
  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-brand-600 px-8 py-16 text-center shadow-modal">
          {/* Background decoration */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-800/30 rounded-full blur-2xl" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-600/20 rounded-full blur-2xl" />

          {/* Grid dots */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
              backgroundSize: '28px 28px',
            }}
          />

          <div className="relative">
            <div className="inline-flex items-center gap-2 bg-white/20 text-white text-xs font-semibold px-3.5 py-1.5 rounded-full mb-6">
              Free forever — no credit card required
            </div>

            <h2 className="text-4xl lg:text-5xl font-bold text-white tracking-tight mb-5 leading-tight">
              Ready to streamline
              <br />your workflow?
            </h2>

            <p className="text-brand-200 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
              Join thousands of teams already using SprintFlow to ship products faster, stay organised, and work without friction.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/register"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-brand-700 font-semibold text-sm rounded-xl hover:bg-brand-50 transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5"
              >
                Start free today
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-transparent border border-white/40 text-white font-semibold text-sm rounded-xl hover:bg-white/10 transition-all duration-200"
              >
                Already have an account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
