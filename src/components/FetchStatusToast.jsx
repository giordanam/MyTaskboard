export default function FetchStatusToast({ fetchStatus, setFetchStatus, errorMessage }) {
  return (
    <>
      {/*fetch or error messages*/}
      {fetchStatus !== 'idle' && fetchStatus !== 'loading' && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 shadow-2xl rounded-lg overflow-hidden">
          {/* BOTTONE DI CHIUSURA*/}
          <button
            onClick={() => setFetchStatus('idle')}
            className="absolute top-2 right-3 text-gray-500 hover:text-gray-900 text-xl font-bold transition-colors"
            aria-label="Chiudi"
          >
            ✕
          </button>

          {/* STATO: ERRORE */}
          {fetchStatus === 'error' && (
            <div className="flex items-center p-6 bg-red-100 border-l-8 border-red-600 text-red-800 min-w-[300px]">
              <span className="text-2xl mr-4">❌</span>
              <div>
                <h3 className="font-bold text-lg">Impossibile scaricare</h3>
                <p>{errorMessage}</p>
              </div>
            </div>
          )}

          {/*STATO: VUOTO */}
          {fetchStatus === 'empty' && (
            <div className="flex items-center p-6 bg-yellow-100 border-l-8 border-yellow-500 text-yellow-800 min-w-[300px]">
              <span className="text-2xl mr-4">⚠️</span>
              <div>
                <h3 className="font-bold text-lg">Lista vuota</h3>
                <p>Il server non ha restituito nessuna task.</p>
              </div>
            </div>
          )}

          {/* STATO: SUCCESSO */}
          {fetchStatus === 'success' && (
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
    </>
  );
}
