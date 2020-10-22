/*  CONSEGNA: Il programma deve generare 16 numeri compresi tra 1 e 100: queste saranno le mine.
    Dopodiché, il programma deve chiedere all'utente un numero alla volta e verificare se il numero indicato dall'utente è una mina oppure no.
    Se l'utente becca una mina, il gioco finisce, mentre, se il numero non corrisponde ad una mina, il gioco prosegue e il programma chiede all'utente un nuovo numero.
    Alla fine della partita, il programma comunica all'utente il suo punteggio, cioè quanti numeri è riuscito ad inserire prima che il gioco finisse.  */


// creo una variabile contenente come valore il numero delle mine che desideriamo generare
var numberOfMines = 16;

// creo un array (vuoto) in cui andrò a salvare le mine generate
var mines = [];

// creo due variabili inf e sup (estremo inferiore ed estremo superiore)
// sia le mine sia i numeri inseriti dall'utente dovranno essere compresi tra inf e sup
var inf = 1;
var sup = 100;

// finché il numero di mine salvate in mines (cioè, la lunghezza dell'array mines) è inferiore al numero desiderato (cioè, inferiore a numberOfMines), continuo a generare nuove mine
while (mines.length < numberOfMines) {
    // genero un numero random compreso tra inf e sup e lo salvo in un variabile (questo numero rappresenta una mina)
    var mine = getRndInteger(inf, sup);
    // controllo se la mina generata casualmente è già presente nell'array mines
    if (!mines.includes(mine)) {
        // salvo dentro l'array mines la mina generata casualmente solo se essa non è già presente nell'array
        // in questo modo i numeri nell'array mines saranno tutti diversi tra loro
        mines.push(mine);
    }
}

console.log(mines);

// creo una variabile userNumber in cui andrò a salvare di volta in volta il numero inserito dall'utente
var userNumber;

// creo un array userNumbers (inizialmente vuoto) in cui andrò a salvare tutti i numeri inseriti dall'utente (cioè, tutti i valori assunti di volta in volta dalla variabile userNumber)
var userNumbers = [];

// chiedo all'utente di inserire un numero compreso tra inf e sup (e lo salvo nella variabile userNumber)
// continuo a fare questo fintanto che il numero che inserisce non è una delle mine (cioè, uno dei numeri salvati nell'array mines)
// se inserisce un numero che corrisponde ad una mina, smetto di chiedergli di inserire un numero
do {
    userNumber = parseInt(prompt('Inserisci un numero compreso tra ' + inf + ' e ' + sup));
    // controllo se il numero appena inserito dall'utente (e salvato nella variabile userNumber) non è già presente nell'array mines o nell'array userNumbers
    // in altre parole, controllo se il numero appena inserito dall'utente:
        // - non è una mina
        // - non era già stato inserito dall'utente stesso in precedenza
    if (!mines.includes(userNumber) && !userNumbers.includes(userNumber)) {
        // salvo il numero appena inserito dall'utente nell'array userNumbers solo se non è una mina e non è già presente nell'array userNumbers
        // in questo modo tutti i numeri contenuti nell'array userNumbers saranno sia diversi dalle mine sia diversi tra loro
        userNumbers.push(userNumber);
    }
} while (!mines.includes(userNumber));

console.log(userNumbers);

// creo una funzione che prende come parametri un numero minimo min e un numero massimo max e ritorna un numero random compreso tra min e max (min e max inclusi)
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}
