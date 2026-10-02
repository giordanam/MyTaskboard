import Form from "./Form.jsx";

export default function DetailModal() {
    return (
        <dialog id="task-dialog"
                className="backdrop:bg-black/60 border-none rounded-xl w-full max-w-2xl p-0 overflow-hidden max-h-[90vh]">
            <Form />
        </dialog>
    )
}