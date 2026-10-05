import {useState} from 'react'
import Form from "./Form.jsx";

export default function DetailModal({onClose, task, addTask, onSave, onDelete}) {
    const [showWarning, setShowWarning] = useState(false)
    return (
        <>
            <div className="fixed inset-0 bg-black/60 z-40 flex items-center justify-center p-4">
                <div className="relative bg-white rounded-xl w-full max-w-2xl p-0 overflow-hidden max-h-[90vh]">
                    <Form onClose={() => setShowWarning(true)} task={task} onSave={onSave} onDelete={onDelete}/>
                </div>
            </div>

            {
                showWarning && (
                    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-xl w-full max-w-sm p-6 border-2 border-red-700">
                            <div className="flex flex-col gap-3">
                                <h2 className="text-lg font-bold text-gray-800">Vuoi davvero uscire?</h2>
                                <p className="text-sm text-gray-500">Le modifiche che hai fatto non verranno salvate</p>
                                <div className="flex justify-center gap-3 w-full">
                                    <button id="btn-cancel-err" onClick={() => setShowWarning(false)}
                                            className="bg-white hover:bg-gray-100 rounded-xl font-medium border border-gray-700 px-5 py-1 text-gray-700">Annulla
                                    </button>
                                    <button id="btn-exit-err" onClick={() => {setShowWarning(false); onClose()}}
                                            className="bg-red-500 hover:bg-red-600 rounded-xl px-4 py-1 text-white">Esci
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
}