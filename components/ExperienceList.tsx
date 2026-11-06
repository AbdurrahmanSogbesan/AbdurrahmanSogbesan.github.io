'use client';

import { useState } from 'react';
import { experience } from '@/content';
import ExperienceItem from './ExperienceItem';

/** Rows open independently; the first starts open. */
export default function ExperienceList() {
  const [open, setOpen] = useState<Record<number, boolean>>({ 0: true });
  return (
    <div>
      {experience.map((entry, i) => (
        <ExperienceItem
          key={entry.company}
          entry={entry}
          open={!!open[i]}
          onToggle={() => setOpen((o) => ({ ...o, [i]: !o[i] }))}
        />
      ))}
    </div>
  );
}
