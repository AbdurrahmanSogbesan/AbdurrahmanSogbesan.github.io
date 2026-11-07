import { experience } from '@/content';
import ExperienceItem from './ExperienceItem';

export default function ExperienceList() {
  return (
    <div>
      {experience.map((entry) => (
        <ExperienceItem key={entry.company} entry={entry} />
      ))}
    </div>
  );
}
