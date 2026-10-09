import { useState } from 'react'

export default function Checklist({ checklist, setChecklist }) {
    const [newItemText, setNewItemText] = useState('')

    function toggleItem(itemId) {
        setChecklist(checklist.map(item =>
            item.id === itemId ? {...item, done: !item.done} : item
        ))
    }

    function addItem() {
        const text = newItemText.trim()
        if (!text) return

        setChecklist([...checklist, {id: crypto.randomUUID(), text, done: false}])
        setNewItemText('')
    }

    function handleKeyDown(e) {
        if (e.key === 'Enter') {
            e.preventDefault()
            addItem()
        }
    }

    return (
        <div>
            <h3 className="mb-2 mt-4 text-sm font-bold text-gray-700 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5"/>
                </svg>
                Checklist
            </h3>
            <div className="space-y-2 mb-3">
                {checklist.map(item => (
                    <label key={item.id} className="flex items-center gap-3 p-2">
                        <input type="checkbox" checked={item.done} onChange={() => toggleItem(item.id)} className="w-4 h-4 text-sky-600 rounded border-gray-300 focus:ring-sky-500"/>
                        <span className="text-sm text-gray-700"> {item.text}</span>
                    </label>
                ))}
                <div className="flex items-center gap-3 p-2 mt-1">
                    <button type="button" onClick={addItem}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4 text-gray-400">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
                        </svg>
                    </button>
                    <input type="text" value={newItemText} onChange={(e) => setNewItemText(e.target.value)} onKeyDown={handleKeyDown} placeholder="Aggiungi elemento..." className="w-full text-sm bg-transparent border-b focus:border-sky-500 focus:outline-none text-gray-700 pb-1"/>
                </div>
            </div>
        </div>
    )
}