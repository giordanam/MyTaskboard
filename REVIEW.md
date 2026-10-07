# Review del refactor React — task da completare

Il refactor funziona e i concetti base di React sono applicati bene: stato derivato (`filteredTasks`) calcolato e non duplicato, aggiornamenti immutabili, inizializzatore lazy per `localStorage`, gestione degli stati della fetch, distinzione tra "nessun task" e "nessun risultato".

I task qui sotto servono a portare il progetto da "funziona" a "è finito". Sono in ordine: falli in sequenza, **un commit per task** (stessi messaggi convenzionali che usi già).

Regola generale prima di ogni consegna: rileggi il diff e chiediti, per ogni file e ogni attributo, *"serve ancora?"*.

---

## 1. Un solo progetto nella root

**Contesto:** la cartella separata `task-board-react/` era prevista dal setup della Fase 1B. Ora che il refactor è concluso, però, nel repo convivono due versioni dell'app (`lista.html` + `better_app.js` nella root e `task-board-react/`) e chi apre il repo non sa quale sia quella vera. La versione vanilla è già salvata nella storia di git, quindi non serve tenerla come file.

**Da fare:**
- Sposta il contenuto di `task-board-react/` nella root del repo (usa `git mv` così la storia dei file si conserva).
- Elimina `lista.html` e `better_app.js`.
- Unisci i due `.gitignore`.

**Fatto quando:** `npm install && npm run dev` funziona dalla root e non esiste più la cartella `task-board-react/`.

## 2. Rimuovere i residui del template Vite

**Problema:** sono rimasti file del template che l'app non usa.

**Da fare:**
- Elimina `src/App.css` (non è importato da nessuna parte; non va commentato, va cancellato).
- Elimina gli asset non usati: `src/assets/hero.png`, `src/assets/react.svg`, `src/assets/vite.svg`, `public/icons.svg`.
- Riscrivi `README.md`: cos'è il progetto, come si avvia, struttura delle cartelle.
- In `index.html`: `lang="it"` e un `<title>` sensato.

**Fatto quando:** ogni file in `src/` e `public/` è effettivamente usato dall'app.

## 3. Rimuovere gli "agganci" della versione vanilla

**Problema:** nella versione vanilla `id`, classi `js-*` e `data-id` servivano per trovare gli elementi con `getElementById`/`closest`. In React non li cerchi più nel DOM, quindi sono rumore.

**Da fare:**
- Rimuovi gli `id` che non servono (`btn-new-act`, `btn-filters`, `col-todo`, `grid-cards`, `btn-save-edit`, `btn-cancel-err`, …).
- Rimuovi `task-card`, `js-card-title`, `js-card-expire`, `js-card-user` e `data-id` da `Card.jsx`.
- **Attenzione:** gli `id` collegati a un `<label htmlFor="...">` nel form servono per l'accessibilità: quelli restano.

**Domanda su cui ragionare:** perché in React non serve più identificare gli elementi del DOM?

## 4. Quando serve davvero `useEffect`

**Contesto:** la consegna chiedeva una fetch "con `useEffect`" lanciata dal click di un bottone. Sono due richieste in tensione tra loro, e il flag `startFetch` è un modo ragionevole di farle stare insieme. Adesso vale la pena capire perché React suggerisce un'altra strada.

**Da leggere:** https://react.dev/learn/you-might-not-need-an-effect

**Da fare:**
- Fetch al click: elimina lo stato `startFetch` e l'effetto, e chiama la funzione async direttamente dall'`onClick`. Una fetch che nasce da un click è un **evento**, non un effetto.
- Rinomina `isError` (contiene un messaggio, non un booleano), per esempio `errorMessage`.
- Bonus, per usare `useEffect` nel caso giusto: se la board è vuota all'avvio, importa automaticamente i task di esempio al mount. Gestisci la cleanup con `AbortController` e verifica cosa succede in sviluppo con `StrictMode`.

**Domanda su cui ragionare:** qual è la differenza tra "succede perché l'utente ha fatto qualcosa" e "succede perché il componente è sullo schermo"?

## 5. Una sola fonte per utenti, categorie e stati

**Problema:** la lista degli utenti è scritta a mano in 4 punti (filtri in `App.jsx`, `Form.jsx`, `Card.jsx`, utenti casuali della fetch) con ordini diversi, e nella fetch manca `federico`. Lo stesso vale per le categorie. Nella versione vanilla avevi già i dizionari centralizzati (`userLabels`, `categoryLabels`, `stateLabels`): riprendi quell'idea.

**Da fare:**
- Crea un modulo (es. `src/constants.js`) con utenti (valore, nome completo, iniziali), categorie e stati.
- Genera le `<option>` di filtri e form con un `map` su queste costanti.
- `Card.jsx` e la fetch devono leggere dallo stesso modulo. Nota che oggi i dizionari in `Card` vengono ricreati a ogni render.

**Fatto quando:** aggiungere un nuovo utente richiede di modificare **una sola riga**.

## 6. Sistemare `FilterContext`

**Problema:** `npm run lint` dà un errore (`react-refresh/only-export-components`) perché il file esporta sia il Context sia un componente. Inoltre `createContext(1)` usa un valore di default che non ha senso.

**Da fare:**
- Separa il Context dal Provider, oppure esponi un custom hook `useFilters()` e smetti di esportare il Context.
- Usa un default sensato (`null`) e fai lanciare un errore al hook se viene usato fuori dal Provider.

**Completare l'esercizio:** la consegna chiedeva di leggere il Context "nei componenti che ne hanno bisogno, invece di passarlo come prop a catena". Oggi l'unico componente che lo legge è `App`, che sta subito sotto il Provider, quindi il vantaggio del pattern non si vede ancora. Dopo il task 7, fai leggere i filtri con `useContext` direttamente a `FilterBar` (per gli input) e a chi filtra la lista, invece che ad `App`.

## 7. Spezzare `App.jsx`

**Problema:** `App.jsx` ha quasi 300 righe e fa tutto: header, barra di ricerca, filtri, toast della fetch e logica dei task.

**Da fare:**
- Estrai almeno `Header`, `FilterBar` e `FetchStatusToast` in `src/components/`.
- In `List.jsx` le tre colonne sono copiate e incollate: generale con un `map` su un array di configurazione (stato, titolo, icona).

**Fatto quando:** `App.jsx` contiene principalmente stato, handler e composizione dei componenti.

## 8. Robustezza

- **`localStorage`:** se il contenuto è corrotto, `JSON.parse` lancia un'eccezione e l'app non parte. Proteggilo con `try/catch` e ricadi su `[]`.
- **Date:** `new Date().toISOString()` restituisce la data in **UTC**. Tra mezzanotte e le 2 in Italia "oggi" risulta ieri e il filtro scadenza sbaglia. Costruisci la data locale (`getFullYear`/`getMonth`/`getDate`). Il bug c'era già nella versione vanilla.
- **Aggiornamenti dello stato:** usa la forma funzionale (`setTasks(prev => ...)`) anche in `addTask`, `editTask` e `deleteTask`, coerentemente con quanto fai già nella fetch.
- **Pulsante "Scarica task!":** quando è disabilitato non cambia aspetto. Aggiungi uno stile `disabled:`.

## 9. Formattazione coerente

**Problema:** l'indentazione (2 o 4 spazi), le virgolette (`'` e `"`) e i punti e virgola cambiano da un file all'altro.

**Da fare:**
- Configura Prettier, aggiungi uno script `npm run format` e formatta tutto il progetto **in un commit separato** (così il diff dei cambi reali resta leggibile).

**Fatto quando:** `npm run lint` restituisce 0 errori e 0 warning.

---

## Bonus

- La X della modale chiede conferma anche se non hai modificato niente. Mostra l'avviso solo se il form è stato toccato.
- Chiudi la modale anche con `Esc`.
