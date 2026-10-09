import Card from './Card.jsx'
import { STATUS } from '../constants.jsx'
import { useFilters } from '../FilterContext.js';
import { getFilteredTasks } from '../utils/filterUtils.js';
import {IconPlus, IconSearch} from "./Icons.jsx";

export default function List({tasks, hasTasks, onEditTask}) {
    const filters = useFilters();
    const filteredTasks = getFilteredTasks(tasks, filters);
    //caso in cui non ci sono task in generale o trovate dai filtri esce il div per comunicarlo all'utente
    if (filteredTasks.length === 0) {
        return (
            <div className="mt-5 flex flex-col items-center justify-center gap-3 text-center bg-white border border-dashed border-gray-300 rounded-lg py-16 px-6">
                {hasTasks ? (
                    <IconSearch classname={"size-10 text-sky-500"} />
                ) : (
                    <IconPlus classname={"size-10 text-sky-500"} />
                )}
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
                <div key={state.value} className="bg-gray-100 p-4 rounded-lg">
                    <h2 className="font-bold mb-4 flex items-center gap-2">
                        {state.icon}
                        {state.label}
                    </h2>
                    <div className="flex flex-col gap-4">
                        {filteredTasks.filter((task) => task.status === state.value).map(task => <Card key={task.id} task={task} onEditTask={onEditTask}/>)}
                    </div>
                </div>
            )}
        </div>
    )
}