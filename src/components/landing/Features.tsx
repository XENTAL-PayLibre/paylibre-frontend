import { CreditCard, RefreshCw, TrendingUp } from 'lucide-react';

export default function Features() {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: 'var(--pl-text)' }}>
            Engineered for Educational Finance
          </h2>
          <p className="text-base max-w-2xl mx-auto" style={{ color: 'var(--pl-text-secondary)' }}>
            Say goodbye to spreadsheets and unidentifiable bank transfers. PayLibre brings modern fintech infrastructure to your school&apos;s treasury.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Dedicated Virtual Accounts — tall card */}
          <div className="border rounded-2xl p-8 flex flex-col gap-4" style={{ borderColor: 'var(--pl-border)' }}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'var(--pl-blue-light)' }}>
              <CreditCard className="w-5 h-5" style={{ color: 'var(--pl-blue)' }} />
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2" style={{ color: 'var(--pl-text)' }}>Dedicated Virtual Accounts</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--pl-text-secondary)' }}>
                Each student is automatically assigned a unique virtual bank account number. Parents simply transfer funds to this number via their preferred banking app.
              </p>
            </div>
          </div>

          {/* Right column: two cards stacked */}
          <div className="flex flex-col gap-6">
            {/* Automated Reconciliation with mini UI */}
            <div className="border rounded-2xl p-6 flex flex-col sm:flex-row gap-6" style={{ borderColor: 'var(--pl-border)' }}>
              <div className="flex-1 flex flex-col gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'var(--pl-blue-light)' }}>
                  <RefreshCw className="w-5 h-5" style={{ color: 'var(--pl-blue)' }} />
                </div>
                <div>
                  <h3 className="font-semibold mb-1.5" style={{ color: 'var(--pl-text)' }}>Automated Reconciliation</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--pl-text-secondary)' }}>
                    When a payment hits a virtual account, PayLibre instantly identifies the student, updates their ledger, and marks the invoice as paid. Zero manual matching required.
                  </p>
                </div>
              </div>
              {/* Mini transaction UI */}
              <div className="shrink-0 w-full sm:w-48 border rounded-xl overflow-hidden" style={{ borderColor: 'var(--pl-border)' }}>
                <div className="px-3 py-2 border-b flex items-center justify-between" style={{ borderColor: 'var(--pl-border)', background: 'var(--pl-bg)' }}>
                  <span className="text-xs font-medium" style={{ color: 'var(--pl-text)' }}>Recent Transactions</span>
                  <span className="text-xs" style={{ color: 'var(--pl-text-secondary)' }}>•••</span>
                </div>
                {[
                  { name: 'Emma Thompson', sub: 'Term 2 Fee', amount: '+₦85,000', status: 'Matched' },
                  { name: 'Liam Davis',     sub: 'Transport',  amount: '+₦12,000', status: 'Matched' },
                ].map((row, i) => (
                  <div key={i} className="px-3 py-2.5 border-t flex items-center justify-between" style={{ borderColor: 'var(--pl-border)' }}>
                    <div>
                      <p className="text-xs font-medium" style={{ color: 'var(--pl-text)' }}>{row.name}</p>
                      <p className="text-[10px]" style={{ color: 'var(--pl-text-secondary)' }}>{row.sub}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-semibold" style={{ color: 'var(--pl-green)' }}>{row.amount}</p>
                      <p className="text-[10px]" style={{ color: 'var(--pl-green)' }}>{row.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Real-time Reporting with mini chart */}
            <div className="border rounded-2xl p-6 flex flex-col sm:flex-row gap-6" style={{ borderColor: 'var(--pl-border)' }}>
              <div className="flex-1 flex flex-col gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'var(--pl-blue-light)' }}>
                  <TrendingUp className="w-5 h-5" style={{ color: 'var(--pl-blue)' }} />
                </div>
                <div>
                  <h3 className="font-semibold mb-1.5" style={{ color: 'var(--pl-text)' }}>Real-time Reporting & Analytics</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--pl-text-secondary)' }}>
                    Gain immediate visibility into cash flow, outstanding balances, and payment trends. Export data seamlessly to your existing accounting software with a single click.
                  </p>
                </div>
              </div>
              {/* Mini bar chart */}
              <div className="shrink-0 w-full sm:w-48 border rounded-xl p-3 flex flex-col justify-end" style={{ borderColor: 'var(--pl-border)', background: 'var(--pl-bg)' }}>
                <div className="flex items-end justify-end mb-1.5">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full text-white" style={{ background: 'var(--pl-blue)' }}>₦45k Today</span>
                </div>
                <div className="flex items-end gap-1.5 h-20">
                  {[40, 55, 35, 70, 50, 90].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-t"
                      style={{
                        height: `${h}%`,
                        background: i === 5 ? 'var(--pl-blue)' : 'var(--pl-blue-light)',
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
