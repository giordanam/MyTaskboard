import { useState } from "react";
import { useFilters } from '../FilterContext.js'
import { CATEGORIES, USERS, EXPIRES } from '../constants.jsx'
import {IconCategory, IconFilters, IconLoading, IconSearch, IconTime, IconUser} from "./Icons.jsx";

export default function FilterBar({ onFetch, fetchStatus }) {
    const [isFiltersOpen, setFiltersOpen] = useState(false)
    const {
        searchQuery, setSearchQuery,
        categoryFilter, setCategoryFilter,
        expireFilter, setExpireFilter,
        userFilter, setUserFilter,
        handleClearFilters
    } = useFilters()

    return(
        <>
            <div className="max-w-7xl mx-auto flex items-center">
                <div className="relative mr-2">
                    <IconSearch classname={"size-5 absolute text-gray-400 left-3 top-1/2 -translate-y-1/2"} />
                    <input type="text" placeholder="Cerca attività..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="bg-white pr-4 py-2 pl-10 focus:outline-none focus:border-sky-600 focus:ring-1 focus:ring-sky-600 rounded-2xl" />
                </div>
                <button className="bg-sky-500 hover:bg-sky-600 rounded-2xl px-4 py-2 flex items-center gap-2" onClick={() => setFiltersOpen(!isFiltersOpen)}>
                    <IconFilters classname={"size-5"} />
                    Filtri
                </button>
                <button type="button" onClick={handleClearFilters} className="bg-sky-500 hover:bg-sky-600 rounded-2xl px-4 py-2 justify-self-end ml-2">
                    Pulisci filtri
                </button>

                <button onClick={onFetch} disabled={fetchStatus === "loading"} className="ml-5 disabled:opacity-50 disabled:cursor-not-allowed text-white bg-red-500 hover:bg-red-600 rounded-2xl px-4 py-2 flex items-center gap-2">Scarica task!</button>

                {fetchStatus === "loading" && (
                    <div className="flex items-center ml-4 text-indigo-600">
                    <IconLoading classname={"animate-spin h-6 w-6 mr-2"} />
                    </div>
                )}
            </div>

            {isFiltersOpen && (
                <div className="max-w-7xl mx-auto mt-5 items-center grid grid-cols-4 gap-4">
                    <span className="mt-5 flex items-center gap-2 font-bold">
                       <IconCategory classname={"size-5"} />
                        Categoria
                    </span>
                    <span className="mt-5 flex items-center gap-2 font-bold">
                        <IconTime classname={"size-6"} />
                        Scadenza
                    </span>
                    <span className="mt-5 flex items-center gap-2 font-bold">
                        <IconUser classname={"size-6"} />
                        Utente assegnato
                    </span>
                    <div className="col-span-4 border-y border-sky-600 py-4 grid grid-cols-4 gap-4">
                        <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="py-2 bg-white text-gray-900 focus:outline-none focus:border-sky-600 focus:ring-1 focus:ring-sky-600 rounded-xl">
                            <option value="">Seleziona etichetta...</option>
                            {CATEGORIES.map(category => <option key={category.value} value={category.value}>{category.label}</option>)}
                        </select>
                        <select value={expireFilter} onChange={(e) => setExpireFilter(e.target.value)} className="py-2 bg-white text-gray-900 focus:outline-none focus:border-sky-600 focus:ring-1 focus:ring-sky-600 rounded-xl">
                            <option value="">Seleziona Scadenza...</option>
                            {EXPIRES.map(expire => <option key={expire.value} value={expire.value}>{expire.label}</option>)}
                        </select>
                        <select value={userFilter} onChange={(e) => setUserFilter(e.target.value)} className="py-2 bg-white text-gray-900 focus:outline-none focus:border-sky-600 focus:ring-1 focus:ring-sky-600 rounded-xl">
                            <option value="">Seleziona utente...</option>
                            {USERS.map(user => <option key={user.value} value={user.value}>{user.label}</option>)}
                        </select>
                    </div>
                </div>
            )}
        </>
    )
}