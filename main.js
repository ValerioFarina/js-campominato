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

// creo una funzione che prende come parametri un numero minimo min e un numero massimo max e ritorna un numero random compreso tra min e max (min e max inclusi)
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}
