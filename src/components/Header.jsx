import {IconPlus} from "./Icons.jsx";

export default function Header({ onNewTask }) {
    return(
        <header className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Le mie attività</h1>
            <button className="cursor-pointer bg-sky-500 hover:bg-sky-600 rounded-2xl px-4 py-2 flex items-center gap-2" onClick={onNewTask}>
               <IconPlus classname={"size-5"} />
                Nuova attività
            </button>
        </header>
    )
}