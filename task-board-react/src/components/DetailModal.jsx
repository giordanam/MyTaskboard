import Form from "./Form.jsx";

export default function DetailModal({onClose, task, addTask}) {
    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
            <div className="relative bg-white rounded-xl w-full max-w-2xl p-0 overflow-hidden max-h-[90vh]">
                <Form onClose={onClose} task={task} addTask={addTask} />
            </div>
        </div>
    )
}