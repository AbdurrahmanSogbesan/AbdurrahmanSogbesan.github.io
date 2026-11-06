import type { CSSProperties } from 'react';
import { companies, type RichParagraph } from '@/content';
import CompanyLink from './CompanyLink';

/** One paragraph of plain strings and company references. */
export default function RichText({ paragraph, style }: { paragraph: RichParagraph; style?: CSSProperties }) {
  return (
    <p style={style}>
      {paragraph.map((seg, i) =>
        typeof seg === 'string' ? seg : <CompanyLink key={i} company={companies[seg.company]} />,
      )}
    </p>
  );
}
