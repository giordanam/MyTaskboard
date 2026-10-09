import Card from './Card.jsx'
import {STATUS} from '../constants.jsx'

export default function List({tasks, hasTasks, onEditTask}) {
    //caso in cui non ci sono task in generale o trovate dai filtri esce il div per comunicarlo all'utente
    if (tasks.length === 0) {
        return (
            <div className="mt-5 flex flex-col items-center justify-center gap-3 text-center bg-white border border-dashed border-gray-300 rounded-lg py-16 px-6">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-10 text-sky-500">
                    {hasTasks ? (
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    )}
                </svg>
                <p className="font-bold text-gray-700">
                    {hasTasks
                        ? "Nessun risultato trovato per questi filtri, mi spiace!"
                        : "Non ci sono ancora attività. Creane una con il pulsante \"Nuova attività\"."}
                </p>
            </div>
        )
    }

    return(
        <div className="grid grid-cols-3 mt-5 gap-6">
            {STATUS.map(state =>
                <div className="bg-gray-100 p-4 rounded-lg">
                    <h2 className="font-bold mb-4 flex items-center gap-2">
                        {state.icon}
                        {state.label}
                    </h2>
                    <div className="flex flex-col gap-4">
                        {tasks.filter((task) => task.status === state.value).map(task => <Card key={task.id} task={task} onEditTask={onEditTask}/>)}
                    </div>
                </div>
            )}
        </div>
    )
}