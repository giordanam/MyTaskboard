import { IconClock, IconComplete, IconDescriptionAndColumn } from './components/Icons.jsx';

export const USERS = [
  { value: 'giordana', label: 'Giordana Martucci', initials: 'GM' },
  { value: 'lucio', label: 'Lucio Morelli', initials: 'LM' },
  { value: 'matteo', label: 'Matteo Di Donato', initials: 'MD' },
  { value: 'federico', label: 'Federico Micello', initials: 'FM' },
  { value: 'delin', label: 'Delin Squarcella', initials: 'DS' },
];

export const CATEGORIES = [
  { value: 'design', label: 'Design' },
  { value: 'dev', label: 'Sviluppo' },
  { value: 'release', label: 'Release' },
  { value: 'bug', label: 'Bug' },
];

export const STATUS = [
  {
    value: 'to-do',
    label: 'Da fare',
    icon: <IconDescriptionAndColumn className={'size-4'} />,
  },
  {
    value: 'in-progress',
    label: 'In corso',
    icon: <IconClock className={'size-6'} />,
  },
  {
    value: 'done',
    label: 'Completato',
    icon: <IconComplete className={'size-6'} />,
  },
];

export const EXPIRES = [
  { value: 'expired', label: 'Scaduto' },
  { value: 'not-expired', label: 'Non scaduto' },
];
