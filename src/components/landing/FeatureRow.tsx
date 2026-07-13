import { cn } from '@/lib/utils';

export default function FeatureRow({
  reverse,
  title,
  body,
  tags,
  mockup,
}: {
  reverse?: boolean;
  title: string;
  body: string;
  tags: string[];
  mockup: React.ReactNode;
}) {
  return (
    <div className={cn('flex flex-col lg:flex-row items-center gap-10 lg:gap-16', reverse && 'lg:flex-row-reverse')}>
      <div className="flex-1 max-w-lg">
        <h3 className="text-2xl sm:text-3xl font-bold mb-4" style={{ color: 'var(--pl-text)' }}>{title}</h3>
        <p className="text-base leading-relaxed mb-5" style={{ color: 'var(--pl-text-secondary)' }}>{body}</p>
        <div className="flex flex-wrap gap-2">
          {tags.map(tag => (
            <span
              key={tag}
              className="text-xs font-medium px-3 py-1 rounded-full"
              style={{ background: 'var(--pl-blue-light)', color: 'var(--pl-blue)' }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="flex-1 flex justify-center w-full">
        {mockup}
      </div>
    </div>
  );
}
