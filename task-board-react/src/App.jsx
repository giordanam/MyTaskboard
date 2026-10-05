import { useContext, useState } from 'react'
import List from './components/List.jsx'
import DetailModal from './components/DetailModal.jsx'
import {FilterContext} from "./FilterContext.jsx"

function App() {
  const [tasks, setTasks] = useState([])
  const [isModalOpen, setModalOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState(null)
  const [isFiltersOpen, setFiltersOpen] = useState(false)
  const {
    searchQuery, setSearchQuery,
    categoryFilter, setCategoryFilter,
    expireFilter, setExpireFilter,
    userFilter, setUserFilter,
    handleClearFilters
  } = useContext(FilterContext)
  const filteredTasks = tasks.filter((task) => {
    const matchTitle = task.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchCategory = categoryFilter === "" || task.category === categoryFilter
    const matchUser = userFilter === "" || task.user === userFilter
    const today = new Date().toISOString().split('T')[0];
    const matchExpire =
        expireFilter === "" ||
        (expireFilter === "expired" && task.expire < today) ||
        (expireFilter === "not-expired" && task.expire >= today);

    return matchTitle && matchUser && matchExpire && matchCategory
  })

  function addTask(newTaskData) {
    const newTask = {
      ...newTaskData,
      id: crypto.randomUUID()
    }

    setTasks([...tasks, newTask])
  }

  function deleteTask(id) {
    setTasks(tasks.filter(task => task.id !== id))
    setModalOpen(false)
    setSelectedTask(null)
  }

  function editTask(updatedTask) {
    setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task))
  }

  function handleEditTask(taskToEdit)  {
    setSelectedTask(taskToEdit)
    setModalOpen(true)
  }

  function handleSaveForm(taskData) {
    if(selectedTask) {
      const updatedTask = {...taskData, id: selectedTask.id}

      editTask(updatedTask)
    }else {
      addTask(taskData)
    }

    setModalOpen(false)
    setSelectedTask(null)
  }

  return (
      <div className="bg-gray-100 text-gray-800 p-6 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <header className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Le mie attività</h1>
            <button id="btn-new-act" className="cursor-pointer bg-sky-500 hover:bg-sky-600 rounded-2xl px-4 py-2 flex items-center gap-2" onClick={() => {setModalOpen(true); setSelectedTask(null);}}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              Nuova attività
            </button>
          </header>

          <div className="max-w-7xl mx-auto flex items-center">
            <div className="relative mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 absolute text-gray-400 left-3 top-1/2 -translate-y-1/2">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
              <input id="search-input" type="text" placeholder="Cerca attività..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="bg-white pr-4 py-2 pl-10 focus:outline-none focus:border-sky-600 focus:ring-1 focus:ring-sky-600 rounded-2xl" />
            </div>
            <button id="btn-filters" className="bg-sky-500 hover:bg-sky-600 rounded-2xl px-4 py-2 flex items-center gap-2" onClick={() => setFiltersOpen(!isFiltersOpen)}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
              </svg>
              Filtri
            </button>
            <button id="btn-clean-filters" type="button" onClick={handleClearFilters} className="bg-sky-500 hover:bg-sky-600 rounded-2xl px-4 py-2 justify-self-end ml-2">
              Pulisci filtri
            </button>
          </div>

          {isFiltersOpen && <div id="form-filters" className="max-w-7xl mx-auto mt-5 items-center grid grid-cols-4 gap-4">
            <span className="mt-5 flex items-center gap-2 font-bold">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6Z" />
                </svg>
                Categoria
            </span>
            <span className="mt-5 flex items-center gap-2 font-bold">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 2.994v2.25m10.5-2.25v2.25m-14.252 13.5V7.491a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v11.251m-18 0a2.25 2.25 0 0 0 2.25 2.25h13.5a2.25 2.25 0 0 0 2.25-2.25m-18 0v-7.5a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v7.5m-6.75-6h2.25m-9 2.25h4.5m.002-2.25h.005v.006H12v-.006Zm-.001 4.5h.006v.006h-.006v-.005Zm-2.25.001h.005v.006H9.75v-.006Zm-2.25 0h.005v.005h-.006v-.005Zm6.75-2.247h.005v.005h-.005v-.005Zm0 2.247h.006v.006h-.006v-.006Zm2.25-2.248h.006V15H16.5v-.005Z" />
                </svg>
                Scadenza
            </span>
            <span className="mt-5 flex items-center gap-2 font-bold">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
                Utente assegnato
            </span>
            <div id="filters" className="col-span-4 border-y border-sky-600 py-4 grid grid-cols-4 gap-4">
              <select id="category-filter" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="py-2 bg-white text-gray-900 focus:outline-none focus:border-sky-600 focus:ring-1 focus:ring-sky-600 rounded-xl">
                <option value="">Seleziona etichetta...</option>
                <option value="design">Design</option>
                <option value="dev">Sviluppo</option>
                <option value="release">Release</option>
                <option value="bug">Bug</option>
              </select>
              <select id="expire-filter" value={expireFilter} onChange={(e) => setExpireFilter(e.target.value)} className="py-2 bg-white text-gray-900 focus:outline-none focus:border-sky-600 focus:ring-1 focus:ring-sky-600 rounded-xl">
                <option value="">Seleziona Scadenza...</option>
                <option value="expired">Scaduto</option>
                <option value="not-expired">Non scaduto</option>
              </select>
              <select id="user-filter" value={userFilter} onChange={(e) => setUserFilter(e.target.value)} className="py-2 bg-white text-gray-900 focus:outline-none focus:border-sky-600 focus:ring-1 focus:ring-sky-600 rounded-xl">
                <option value="">Seleziona utente...</option>
                <option value="giordana">Giordana Martucci</option>
                <option value="lucio">Lucio Morelli</option>
                <option value="matteo">Matteo di Donato</option>
                <option value="federico">Federico Micello</option>
                <option value="delin">Delin Squarcella</option>
              </select>
            </div>
          </div>
          }
          <List tasks={filteredTasks} hasTasks={tasks.length > 0} onEditTask={handleEditTask}/>
        </div>
        {isModalOpen && <DetailModal onClose={() => setModalOpen(false)} onSave={handleSaveForm} task={selectedTask} onDelete={deleteTask}/>}
      </div>
  )
}

export default App
