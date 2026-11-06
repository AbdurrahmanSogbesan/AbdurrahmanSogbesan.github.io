import { site } from '@/content';
import AppLink from './AppLink';
import { pillIcons } from './icons';

export default function LinkPills() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
      {site.links.map((link) => {
        const Icon = pillIcons[link.icon];
        return (
          <AppLink key={link.href} className="pillbtn" href={link.href}>
            <Icon size={15} strokeWidth={1.6} />
            {link.label}
          </AppLink>
        );
      })}
    </div>
  );
}
