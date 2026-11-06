import type { ToolRow } from '@/content';
import ToolIcon from './ToolIcon';

export default function ToolboxRow({ row }: { row: ToolRow }) {
  return (
    <div className="toolrow">
      <span className="mono" style={{ color: 'var(--muted)' }}>
        {row.label}
      </span>
      <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
        {row.items.map((item) => (
          <li key={item.name} className="chip">
            <ToolIcon icon={item.icon} />
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
