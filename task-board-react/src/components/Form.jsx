import {useState} from 'react'

export default function Form({onClose, task, onSave, onDelete}) {
    const isNewTask = task === null
    const [checklist, setChecklist] = useState(task ? task.checklist : [])
    const [newItemText, setNewItemText] = useState('')

    function toggleChecklistItem(itemId) {
        setChecklist(checklist.map(item =>
            item.id === itemId ? {...item, done: !item.done} : item
        ))
    }

    function addChecklistItem() {
        const text = newItemText.trim()
        if (!text) return

        setChecklist([...checklist, {id: crypto.randomUUID(), text, done: false}])
        setNewItemText('')
    }

    function handleNewItemKeyDown(e) {
        if (e.key === 'Enter') {
            e.preventDefault()
            addChecklistItem()
        }
    }

    function handleSubmit(e) {
        e.preventDefault()

        const formData = new FormData(e.target)
        const taskData = Object.fromEntries(formData.entries())
        taskData.checklist = isNewTask ? [] : checklist
        onSave(taskData)
    }

    return(
        <form id="task-form" onSubmit={handleSubmit}>
            <div className="flex flex-col max-h-[90vh]">
                <button id="btn-close" type="button"
                        className="cursor-pointer bg-red-500 hover:bg-red-600 rounded-2xl px-4 py-2 absolute top-6 right-6 gap-1 z-10" onClick={onClose}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                         stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12"/>
                    </svg>
                </button>
                <div className="p-8 flex-1 overflow-y-auto">
                    <div className="mb-8 pr-10">
                        <input id="task-title" type="text" name="title" placeholder="Titolo" defaultValue={task ? task.title : ''}
                               className="w-full text-3xl font-bold focus:outline-none" required/>
                    </div>
                    <div className="grid grid-cols-3 gap-8">
                        <div className="col-span-2 flex flex-col">
                            <div>
                                <h3 className="mb-2 text-sm font-bold text-gray-700 flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         strokeWidth="1.5" stroke="currentColor" className="size-4">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"/>
                                    </svg>
                                    Descrizione
                                </h3>
                                <textarea name="description" id="task-description" defaultValue={task ? task.description : ''}
                                          className="w-full p-3 h-32 bg-gray-50 resize-none border rounded-lg focus:outline-none focus:border-sky-600 focus:ring-1 focus:ring-sky-600"
                                          placeholder="Aggiungi una descrizione..."></textarea>
                            </div>
                            {!isNewTask && (
                                <div id="checklist-container">
                                    <h3 className="mb-2 mt-4 text-sm font-bold text-gray-700 flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             strokeWidth="1.5" stroke="currentColor" className="size-4">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="m4.5 12.75 6 6 9-13.5"/>
                                        </svg>
                                        Checklist
                                    </h3>
                                    <div className="space-y-2 mb-3">
                                        {checklist.map(item => (
                                            <label key={item.id} className="flex items-center gap-3 p-2">
                                                <input type="checkbox" checked={item.done}
                                                       onChange={() => toggleChecklistItem(item.id)}
                                                       className="w-4 h-4 text-sky-600 rounded border-gray-300 focus:ring-sky-500"/>
                                                <span className="text-sm text-gray-700"> {item.text}</span>
                                            </label>
                                        ))}
                                        <div className="flex items-center gap-3 p-2 mt-1">
                                            <button type="button" onClick={addChecklistItem}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                     strokeWidth="1.5" stroke="currentColor"
                                                     className="size-4 text-gray-400">
                                                    <path strokeLinecap="round" strokeLinejoin="round"
                                                          d="M12 4.5v15m7.5-7.5h-15"/>
                                                </svg>
                                            </button>
                                            <input type="text" id="task-checklist"
                                                   value={newItemText}
                                                   onChange={(e) => setNewItemText(e.target.value)}
                                                   onKeyDown={handleNewItemKeyDown}
                                                   placeholder="Aggiungi elemento..."
                                                   className="w-full text-sm bg-transparent border-b focus:border-sky-500 focus:outline-none text-gray-700 pb-1"/>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="col col-span-1 flex flex-col">
                            <div>
                                <h3 className="mb-2 text-sm font-bold text-gray-700 flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         strokeWidth="1.5" stroke="currentColor" className="size-5">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"/>
                                    </svg>
                                    Gestione
                                </h3>
                                <label htmlFor="task-category"
                                       className="mt-3 block text-xs font-bold text-gray-500">Categoria</label>
                                <select id="task-category" name={isNewTask ? "category" : ''} defaultValue={task ? task.category : "design"}
                                        className={`mt-1 focus:outline-none focus:border-sky-600 focus:ring-1 focus:ring-sky-600 rounded-xl ${!isNewTask ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-white text-gray-900'}`}
                                        disabled={!isNewTask}>
                                    <option value="design">Design</option>
                                    <option value="dev">Sviluppo</option>
                                    <option value="bug">Bug</option>
                                    <option value="release">Release</option>
                                </select>
                                {!isNewTask && (
                                    <input type="hidden" name="category" value={task.category} />
                                )}
                                <label htmlFor="task-status"
                                       className="mt-3 block text-xs font-bold text-gray-500">Stato</label>
                                <select id="task-status" name="status" defaultValue={task ? task.status : "to-do"}
                                        className="mt-1 focus:outline-none focus:border-sky-600 focus:ring-1 focus:ring-sky-600 rounded-xl">
                                    <option value="to-do">Da fare</option>
                                    <option value="in-progress">In corso</option>
                                    <option value="done">Completato</option>
                                </select>
                                <label htmlFor="task-user" className="mt-3 block text-xs font-bold text-gray-500">Assegnato
                                    a</label>
                                <select id="task-user" name="user" defaultValue={task ? task.user : "giordana"}
                                        className="mt-1 focus:outline-none focus:border-sky-600 focus:ring-1 focus:ring-sky-600 rounded-xl">
                                    <option value="giordana">Giordana Martucci</option>
                                    <option value="lucio">Lucio Morelli</option>
                                    <option value="delin">Delin Squarcella</option>
                                    <option value="matteo">Matteo di Donato</option>
                                    <option value="federico">Federico Micello</option>
                                </select>
                            </div>
                            <div>
                                <h3 className="mb-2 mt-4 text-sm font-bold text-gray-700 flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         strokeWidth="1.5" stroke="currentColor" className="size-5">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M6.75 2.994v2.25m10.5-2.25v2.25m-14.252 13.5V7.491a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v11.251m-18 0a2.25 2.25 0 0 0 2.25 2.25h13.5a2.25 2.25 0 0 0 2.25-2.25m-18 0v-7.5a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v7.5m-6.75-6h2.25m-9 2.25h4.5m.002-2.25h.005v.006H12v-.006Zm-.001 4.5h.006v.006h-.006v-.005Zm-2.25.001h.005v.006H9.75v-.006Zm-2.25 0h.005v.005h-.006v-.005Zm6.75-2.247h.005v.005h-.005v-.005Zm0 2.247h.006v.006h-.006v-.006Zm2.25-2.248h.006V15H16.5v-.005Z"/>
                                    </svg>
                                    Timeline
                                </h3>
                                <div>
                                    <label htmlFor="task-expire"
                                           className="mt-3 block text-xs font-bold text-gray-500">Scadenza</label>
                                    <input type="date" name="expire" id="task-expire" defaultValue={task ? task.expire : ''}
                                           className="w-full bg-white border border-gray-200 text-sm rounded-md px-3 py-2 text-gray-700 focus:ring-2 focus:ring-sky-500 outline-none"
                                           required/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="px-8 py-5 border-t w-full border-gray-100 flex justify-between items-center bg-gray-50">
                    {!isNewTask && (
                        <div className="flex flex-col items-start gap-1">
                            <button id="btn-del-activity" type="button" onClick={() => onDelete(task.id)}
                                    className="text-sm mt-2 font-medium text-red-600 hover:text-red-700 hover:bg-red-50 px-3 py-1.5 rounded-md flex items-center gap-1.5">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                                </svg>
                                Elimina Attività
                            </button>
                        </div>
                    )}
                    <div className="flex gap-2">
                        <button id="btn-save-edit" type="submit"
                                className="bg-sky-500 hover:bg-sky-600 rounded-xl px-5 py-1 text-gray-700">Salva
                        </button>
                    </div>
                </div>
            </div>
        </form>
    )
}