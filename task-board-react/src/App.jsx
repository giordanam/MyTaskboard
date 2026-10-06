import {useContext, useEffect, useState} from 'react'
import List from './components/List.jsx'
import DetailModal from './components/DetailModal.jsx'
import {FilterContext} from "./FilterContext.jsx"

function App() {
  const [tasks, setTasks] = useState([])
  const [isModalOpen, setModalOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState(null)
  const [isFiltersOpen, setFiltersOpen] = useState(false)
  const [fetchStatus, setFetchStatus] = useState("idle")
  const [isError, setIsError] = useState(null)
  const [startFetch, setStartFetch] = useState(false)
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

  useEffect(() => {
    //interruttore spento si ferma e non succede nulla
    if(!startFetch) return;

    const fetchTasksData = async () => {
      setFetchStatus("loading")
      setIsError(null)

      try {
          const response = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=10")

        if(!response.ok) {
          throw new Error("Failed to fetch data")
        }

        const data = await response.json()

        //stato vuoto
        if(data.length === 0) {
          setFetchStatus("empty")
          return;
        }

        //caso in cui i dati ci sono devo inserirli nello stato tasks
        const possibleCategories = ["design", "dev", "release", "bug"]
        const possibleUsers = ["giordana", "lucio", "matteo", "delin"]
        const statusNoDone = ["to-do", "in-progress"];

        const newTasks = data.map((task) => {
          const randomCategory = possibleCategories[Math.floor(Math.random() * possibleCategories.length)]
          const randomUser = possibleUsers[Math.floor(Math.random() * possibleUsers.length)]

          const expireDate = new Date()
          expireDate.setDate(expireDate.getDate() + Math.floor(Math.random() * 10))
          const expireRandom = expireDate.toISOString().split('T')[0]
          const derivedStatus = task.completed ? "done" : statusNoDone[Math.floor(Math.random() * statusNoDone.length)]

          return {
            id: crypto.randomUUID(),
            title: task.title,
            category: randomCategory,
            status: derivedStatus,
            user: randomUser,
            expire: expireRandom,
            description: `Descrizione automatica per: "${task.title}". Verificare i requisiti prima di iniziare a lavorare.`,
            checklist: ["Lettura documentazione", "Esecuzione", "Test finale"].map((text) => ({
              id: crypto.randomUUID(),
              text,
              done: false
            }))
          }
        })

        setTasks(prevTasks => [...prevTasks, ...newTasks])
        setFetchStatus("success")
      }catch(error) {
        setIsError(error.message)
        setFetchStatus("error")
      }finally {
        setStartFetch(false)
      }
    }
    fetchTasksData()
  }, [startFetch])

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
            <button onClick={() => setStartFetch(true)} disabled={fetchStatus === "loading"} className="ml-5 text-white bg-red-500 hover:bg-red-600 rounded-2xl px-4 py-2 flex items-center gap-2">Scarica task!</button>
            {fetchStatus === "loading" && (
                <div className="flex items-center ml-4 text-indigo-600">
                  <svg className="animate-spin h-6 w-6 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span className="font-medium animate-pulse">Caricamento in corso...</span>
                </div>
            )}
          </div>

          {/*fetch or error messages*/}
          {fetchStatus !== "idle" && fetchStatus !== "loading" && (
              <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 shadow-2xl rounded-lg overflow-hidden">

                {/* BOTTONE DI CHIUSURA*/}
                <button
                    onClick={() => setFetchStatus("idle")}
                    className="absolute top-2 right-3 text-gray-500 hover:text-gray-900 text-xl font-bold transition-colors"
                    aria-label="Chiudi"
                >
                  ✕
                </button>

                {/* STATO: ERRORE */}
                {fetchStatus === "error" && (
                    <div className="flex items-center p-6 bg-red-100 border-l-8 border-red-600 text-red-800 min-w-[300px]">
                      <span className="text-2xl mr-4">❌</span>
                      <div>
                        <h3 className="font-bold text-lg">Impossibile scaricare</h3>
                        <p>{isError}</p>
                      </div>
                    </div>
                )}

                {/*STATO: VUOTO */}
                {fetchStatus === "empty" && (
                    <div className="flex items-center p-6 bg-yellow-100 border-l-8 border-yellow-500 text-yellow-800 min-w-[300px]">
                      <span className="text-2xl mr-4">⚠️</span>
                      <div>
                        <h3 className="font-bold text-lg">Lista vuota</h3>
                        <p>Il server non ha restituito nessuna task.</p>
                      </div>
                    </div>
                )}

                {/* STATO: SUCCESSO */}
                {fetchStatus === "success" && (
                    <div className="flex items-center p-6 bg-green-100 border-l-8 border-green-600 text-green-800 min-w-[300px]">
                      <span className="text-2xl mr-4">✅</span>
                      <div>
                        <h3 className="font-bold text-lg">Evvai!</h3>
                        <p>Le nuove task sono state importate.</p>
                      </div>
                    </div>
                )}
              </div>
          )}


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
