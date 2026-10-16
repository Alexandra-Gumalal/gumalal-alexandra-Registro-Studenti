Scrivi le risposte nel file RISPOSTE.md nella radice del repository.
1. Che cos’è app.routes.ts e che cosa contiene in questo progetto? Elenca gli URL e il componente che
mostrano.
app.routes.ts è il file di configurazione del sistema di routing di Angular. Contiene l'array delle rotte (Routes) che mappa i vari URL dell'applicazione ai rispettivi componenti da visualizzare nel tag <router-outlet />. In questo progetto sono presenti:/ (o reindirizzamento) / /home che p Componente Home,/elenco,/elenco id, /inserimento, ** wildcard

2. Che cos’è un service e perché lo si usa? Perché gli studenti stanno in StudentiService e non nel
componente Elenco ?
Un servizio (Service) in Angular è una classe TypeScript decorata con @Injectable che si occupa della logica di business e della gestione centralizzata dei dati. Si usa per separare i dati e le operazioni dalla parte grafica (UI). Gli studenti risiedono in StudentiService e non nel componente Elenco perché il servizio agisce da Single Source of Truth (fonte unica della verità): in questo modo i dati sono condivisi e persistenti tra più componenti diversi (come Home, Elenco, Inserimento e DettaglioStudente), che possono leggerli o modificarli senza duplicazioni

3. Come si legge l’ id dello studente dall’URL? Perché va convertito con Number ?
L'id dello studente si legge iniettando l'oggetto ActivatedRoute nel componente e iscrivendosi al flusso dei parametri tramite route.paramMap.subscribe(...), estraendo il valore con parametri.get('id'). Va convertito con Number() perché i parametri catturati dall'URL sono sempre interpretati da JavaScript come stringhe (es. "3"), mentre nel modello dati del nostro progetto l'id è definito come un valore numerico (number), indispensabile per i confronti rigorosi e le ricerche nel vettore

4. Perché il signal dati è privato e i componenti leggono studenti ? Che cosa potrebbe succedere se Elenco potesse chiamare set sul signal?
Il signal dati è reso private per rispettare il principio di incapsulamento: l'array grezzo può essere modificato unicamente attraverso i metodi controllati del servizio (aggiungi, rimuovi). I componenti leggono la versione in sola lettura (studenti = this.dati.asReadonly()). Se il componente Elenco potesse chiamare direttamente set o update sul signal, chiunque potrebbe sovrascrivere o corrompere lo stato globale dell'applicazione senza passare dai controlli di validazione o dalla logica di business del servizio

5. Come viene calcolato l’id di un nuovo studente? Mostra con un esempio perché “numero di studenti + 1”
sarebbe sbagliato.
Nel nostro servizio l'id viene calcolato trovando il valore massimo degli id esistenti e incrementandolo di 1 (Math.max(0, ...this.dati().map(s => s.id)) + 1).
Usare semplicemente "numero di studenti + 1" sarebbe errato in presenza di cancellazioni. Per es non mi posso basare sul numero di studenti, mettiamo che elimino lo studente con id 1, rimangono gli studenti con id 2 e 3, ma se aggiungessi un altro studente basandomi sul "numero di studenti + 1", verrei a sovrascrive lo studente con id 3

6. Che cosa succede, passo per passo, quando scrivi una lettera nel campo del filtro?
L'utente digita una lettera nell'input collegato al signal filtroClasse tramite il binding bidirezionale ([(ngModel)]).

Il signal filtroClasse viene aggiornato con il nuovo valore stringa.

Poiché il signal filtrati (un computed) dipende da filtroClasse, Angular rileva che una delle sue dipendenze è cambiata.

Il computed ricalcola automaticamente la funzione di filtraggio sul vettore degli studenti in base alla nuova stringa inserita.

Il template HTML reattivo riceve la nuova lista filtrata e aggiorna istantaneamente il DOM mostrando solo le righe corrispondenti della tabella

7. A che cosa servono #modulo="ngForm" e [disabled]="modulo.invalid" ? Quali condizioni rendono il form non valido?
#modulo="ngForm" crea una variabile di template associata alla direttiva del form di Angular, permettendoci di monitorare lo stato di validità dell'intero modulo.

[disabled]="modulo.invalid" disabilita dinamicamente il pulsante di invio finché il form non è completamente valido.

Il form risulta non valido se anche un solo campo marcato come required è vuoto, oppure se non rispetta i vincoli di validazione HTML applicati (ad esempio un valore numerico fuori dai limiti min/max o un formato errato)

8. Perché dopo il salvataggio si usa router.navigate(['/elenco']) invece di un link?
Modulo 03 · Angular Servizi: il registro degli studenti
Si usa router.navigate(['/elenco']) (programmatic navigation) perché l'azione di salvataggio avviene in seguito a un evento asincrono o a una sottomissione di form (clic sul pulsante submit). Il reindirizzamento via codice permette di intercettare il completamento dell'operazione di scrittura nel servizio e di forzare il cambio di rotta in modo automatico, cosa che un normale tag HTML <a> non potrebbe fare al termine di una funzione TypeScript


9. Quali input e quale output ha StudenteCard ? Perché la card non chiama direttamente il servizio per
rimuovere lo studente?
Input: studente (di tipo Studente, obbligatorio) e azioni (booleano opzionale per mostrare o nascondere i pulsanti).

Output: rimosso (un emitter che invia l'oggetto studente da eliminare al componente padre).

La card non chiama direttamente il servizio perché deve rimanere un componente stateless: il suo compito è solo mostrare la grafica e notificare l'intenzione d'uso tramite gli output. La gestione dei dati e la modifica dello stato globale competono esclusivamente ai servizi e ai componenti contenitori, garantendo così una netta separazione delle responsabilità

10. Perché Studente successivo funziona solo con paramMap.subscribe ? Che cosa vedresti con lo snapshot?
Studente successivo funziona con paramMap.subscribe perché la rotta di dettaglio rimane attiva nello stesso componente quando si passa da uno studente all'altro (cambia solo il parametro :id nell'URL). L'iscrizione (subscribe) intercettare dinamicamente il cambio di parametro ricaricando i dati corretti.
Usando invece uno snapshot (ActivatedRoute.snapshot), il componente verrebbe letto una sola volta al momento della creazione iniziale: cliccando sul pulsante per passare al successivo (che aggiorna l'URL ma non distrugge e ricrea il componente), lo snapshot rimarrebbe bloccato sui dati del primo studente caricato, senza aggiornare la vista