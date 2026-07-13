import FeatureRow from './FeatureRow';
import Reveal from './Reveal';
import { AccountMockup, InvoiceMockup, PaymentSplitMockup, CollectionRateMockup } from './FeatureMockups';

export default function FeatureRows() {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col gap-24">
        <Reveal>
          <FeatureRow
            title="A bank account for every student, from day one."
            body="Each student is issued their own dedicated virtual account the moment they're enrolled. Parents pay directly into it — no references to remember, no 'did it go through' texts to the office. Payments can come in bits: weekly, monthly, however it works for the family. The balance quietly builds until the fee is covered."
            tags={['Persistent NUBANs', 'Auto-reconciliation', 'Partial payments']}
            mockup={<AccountMockup />}
          />
        </Reveal>
        <Reveal>
          <FeatureRow
            reverse
            title="Set it once a term. Let it run."
            body="Tuition invoices go out automatically at the start of every term — no manual data entry, no chasing. Need to bill for an excursion, new uniforms, or a PTA levy? Create a one-off invoice in minutes. Miss a due date, and Paylibre adjusts the amount owed to reflect late fees, automatically."
            tags={['Termly billing', 'Ad-hoc invoices', 'Late fee automation']}
            mockup={<InvoiceMockup />}
          />
        </Reveal>
        <Reveal>
          <FeatureRow
            title="One payment, paid out correctly."
            body="A parent pays ₦150,000. Behind the scenes, ₦10,000 goes to the PTA, ₦20,000 to the bus vendor, ₦120,000 to the school — instantly, without anyone touching a spreadsheet. Vendors get paid their exact share the moment the money lands. No commingled funds, no manual payouts to sort out later."
            tags={['Automated routing', 'Instant vendor share', 'No commingling']}
            mockup={<PaymentSplitMockup />}
          />
        </Reveal>
        <Reveal>
          <FeatureRow
            reverse
            title="Know exactly where every kobo stands."
            body="See who's paid in full, who's partial, and who's overdue — at a glance. Aging reports flag risk before it becomes a problem, and cash flow forecasting shows what's likely to come in by mid-term, based on real payment history. Less guessing, better planning."
            tags={['Aging reports', 'Risk scores', 'Cash flow forecasting']}
            mockup={<CollectionRateMockup />}
          />
        </Reveal>
      </div>
    </section>
  );
}
