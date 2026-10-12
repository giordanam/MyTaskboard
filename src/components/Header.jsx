import { IconPlus } from './Icons.jsx';
import Button from './Button.jsx';

export default function Header({ onNewTask }) {
  return (
    <header className="flex justify-between items-center mb-8">
      <h1 className="text-3xl font-bold">Le mie attività</h1>
      <Button className="gap-2" onClick={onNewTask}>
        <IconPlus className="size-5" />
        Nuova attività
      </Button>
    </header>
  );
}
