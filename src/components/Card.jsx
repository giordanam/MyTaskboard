import {USERS, CATEGORIES} from '../constants.jsx'
import {IconTime} from "./Icons.jsx";

export default function Card({task, onEditTask}) {

    const category = CATEGORIES.find(category => (task.category === category.value))
    const user = USERS.find(user => (task.user === user.value))
    return (
        <div onClick={() => onEditTask(task)} className="bg-white p-4 rounded-lg shadow task-card cursor-pointer" data-id={task.id}>
            <div className="mb-2">
                <span className="inline-block px-2 py-1 font-bold text-sky-700 bg-sky-100 rounded">
                    {category.label}
                </span>
            </div>
            <h3 className="text-sm font-bold text-gray-800 mb-4">{task.title}</h3>
            <div className="flex justify-between items-center mt-auto">
                <div className="flex items-center gap-1">
                    <IconTime classname={"size-6"} />
                    <span>{task.expire.split('-').reverse().join('/')}</span>
                </div>
                <div
                    className="w-9 h-9 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center">
                    {user.initials}
                </div>
            </div>
        </div>
    )
}