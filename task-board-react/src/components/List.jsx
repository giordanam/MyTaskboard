import Card from './Card.jsx'

export default function List({tasks}) {
    return(
        <div id="grid-cards" className="grid grid-cols-3 mt-5 gap-6">
            <div className="bg-gray-100 p-4 rounded-lg">
                <h2 className="font-bold mb-4 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                    </svg>
                    Da fare
                </h2>
                <div id="col-todo" className="flex flex-col gap-4">
                    {tasks.filter((task) => task.status === 'to-do').map(task => <Card key={task.id} task={task}/>)}
                </div>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg">
                <h2 className="font-bold mb-4 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    In corso
                </h2>
                <div id="col-inprogress" className="flex flex-col gap-4">
                    {tasks.filter((task) => task.status === 'in-progress').map(task => <Card key={task.id} task={task}/>)}
                </div>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg">
                <h2 className="font-bold mb-4 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    Completato
                </h2>
                <div id="col-done" className="flex flex-col gap-4">
                    {tasks.filter((task) => task.status === 'done').map(task => <Card key={task.id} task={task}/>)}
                </div>
            </div>
        </div>
    )
}