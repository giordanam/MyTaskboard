export default function Header({ onNewTask }) {
    return(
        <header className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Le mie attività</h1>
            <button className="cursor-pointer bg-sky-500 hover:bg-sky-600 rounded-2xl px-4 py-2 flex items-center gap-2" onClick={onNewTask}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                Nuova attività
            </button>
        </header>
    )
}