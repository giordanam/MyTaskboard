import { useEffect, useState } from 'react';

export default function FetchStatusToast({ fetchStatus, setFetchStatus, errorMessage }) {
  // Stato interno per gestire l'opacità e l'animazione di uscita
  const [visible, setVisible] = useState(false);
  //timer
  useEffect(() => {
    if (fetchStatus === 'error' || fetchStatus === 'empty' || fetchStatus === 'success') {
      setVisible(true);
      const fadeTimer = setTimeout(() => {
        setVisible(false);
      }, 3500);

      // 3. Diamo il tempo all'animazione di finire (500ms) prima di resettare lo stato a 'idle'
      const destroyTimer = setTimeout(() => {
        setFetchStatus('idle');
      }, 4000);

      // Pulizia dei timer
      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(destroyTimer);
      };
    }
  }, [fetchStatus, setFetchStatus]);

  const handleManualClose = () => {
    setVisible(false);
    setTimeout(() => {
      setFetchStatus('idle');
    }, 4000); // aspettiamo che la dissolvenza si completi prima di smontare il componente
  };

  if (fetchStatus === 'idle' || fetchStatus === 'loading') {
    return null;
  }

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 shadow-2xl rounded-lg overflow-hidden transition-all duration-500 ease-in-out ${
        visible
          ? 'opacity-100 translate-y-0 scale-100'
          : 'opacity-0 translate-y-4 scale-95 pointer-events-none'
      }`}
    >
      {' '}
      {/* BOTTONE DI CHIUSURA*/}
      <button
        onClick={handleManualClose}
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
  );
}
