/*  CONSEGNA: Il programma deve generare 16 numeri compresi tra 1 e 100: queste saranno le mine.
    Dopodiché, il programma deve chiedere all'utente un numero alla volta e verificare se il numero indicato dall'utente è una mina oppure no.
    Se l'utente becca una mina, il gioco finisce, mentre, se il numero non corrisponde ad una mina, il gioco prosegue e il programma chiede all'utente un nuovo numero.
    Alla fine della partita, il programma comunica all'utente il suo punteggio, cioè quanti numeri è riuscito ad inserire prima che il gioco finisse.
    BONUS (facoltativo): all'inizio del gioco, il programma chiede all'utente il livello di difficoltà:
        - 0 = l'intervallo di numeri possibili è tra 1 e 100
        - 1 = l'intervallo di numeri possibili è tra 1 e 80
        - 2 = l'intervallo di numeri possibili è tra 1 e 50
    In ogni caso, le mine sono sempre 16.  */



// creo una variabile contenente come valore il numero delle mine che desideriamo generare
var numberOfMines = 16;

// chiedo all'utente di inserire il livello di difficoltà
// continuo a chiderglielo fintanto che l'input da lui inserito non è corretto
// in questo caso, l'input dell'utente non è corretto quando si verifica almeno una delle seguenti condizioni:
    // - l'input inserito non è un numero
    // - l'input inserito è un numero, ma non è nè 0, nè 1, nè 2 (cioè, è < 0 oppure > 2)
var level;
do {
    level = parseInt(prompt('Scegli un livello di difficoltà tra 0, 1 e 2'));
    if (isNaN(level) || level < 0 || level > 2) {
        alert('Per favore, inserisci 0, 1 oppure 2');
    }
} while(isNaN(level) || level < 0 || level > 2);

// creo due variabili inf e sup (estremo inferiore ed estremo superiore)
// sia le mine sia i numeri inseriti dall'utente dovranno essere compresi tra inf e sup
var inf = 1;
var sup;

// controllo quale livello ha inserito l'utente
// a seconda del livello, stabilisco quale valore assegnare a sup
// il valore di inf rimane invece sempre uguale a 1
if (level == 0) {
    sup = 100;
} else if (level == 1) {
    sup = 80;
} else if (level == 2) {
    sup = 50;
}

// creo un array (vuoto) in cui andrò a salvare le mine generate
var mines = [];

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

// creo un array userNumbers (inizialmente vuoto) in cui andrò a salvare tutti i numeri inseriti dall'utente prima di beccare una mina (o prima di raggiungere il punteggio massimo)
var userNumbers = [];

// creo una variabile sentinella per controllare se l'utente ha beccato una mina (cioè, se il numero inserito dall'utente è presente nell'array mines)
var mineFound = false;

// creo una variabile maxScore che rappresenta il massimo punteggio che l'utente può realizzare
// l'utente realizza il punteggio massimo quando inserisce uno dopo l'altro esattamente tutti quei numeri compresi tra inf e sup che non sono presenti nell'array mines
// il punteggio massimo corrisponde quindi alla quantità di numeri compresi tra inf e sup e che sono diversi dalle mine
// quindi, per calcolare il punteggio massimo dobbiamo:
    // - calcolare quanti sono i numeri compresi tra inf e sup (questo si ottiene facendo sup - inf + 1)
    // - sottrarre a tale valore il numero delle mine
var maxScore = (sup - inf + 1) - numberOfMines;

// creo una variabile userScore che indica il punteggio totalizzato dall'utente
// pongo questa variabile uguale alla lunghezza dell'array userNumbers, cioè uguale al numero di elementi presenti in tale array
// infatti, l'array userNumbers conterrà tutti i numeri inseriti dall'utente prima di beccare una mina (o prima di raggiungere il punteggio massimo)
// quindi, il numero di elementi contenuti in questo array corrisponde al punteggio totalizzato dall'utente
var userScore = userNumbers.length;

// chiedo all'utente di inserire un numero compreso tra inf e sup (e lo salvo nella variabile userNumber)
// continuo a fare questo fintanto che entrambe le seguenti condizioni sono verificate:
    // - mineFound ha valore false, e quindi l'utente non ha beccato una mina (cioè, non ha inserito un numero presente nell'array mines)
    // - il punteggio totalizzato dall'utente non ha raggiunto il valore massimo
do {
    var userNumber = parseInt(prompt('Inserisci un numero compreso tra ' + inf + ' e ' + sup));
    // prima di controllare se l'utente ha beccato una mina, controllo se l'input dell'utente è corretto
    // in altre parole, controllo se l'input dell'utente è un numero compreso tra inf e sup
    if (!isNaN(userNumber) && userNumber >= inf && userNumber <= sup) {
        // controllo se l'utente ha beccato una mina (cioè, se il numero che ha appena inserito è incluso nell'array mines)
        if (mines.includes(userNumber)) {
            // se l'utente ha beccato una mina, pongo mineFound uguale a true (questo rende la condizione di permanenza nel ciclo falsa)
            mineFound = true;
            console.log('Hai beccato la mina ' + userNumber);
            // controllo se il numero inserito dall'utente è già presente nell'array userNumbers
        } else if (!userNumbers.includes(userNumber)) {
            // se il numero inserito dall'utente non è una mina, e inoltre non è incluso nell'array userNumbers, allora lo salvo in questo array
            // inoltre, aggiorno il punteggio dell'utente (che deve sempre essere uguale alla lunghezza dell'array userNumbers)
            userNumbers.push(userNumber);
            userScore = userNumbers.length;
        } else {
            // se il numero inserito dall'utente non è una mina, ma è già presente nell'array userNumbers,
            // significa che l'utente questo numero lo aveva già inserito in precedenza, e quindi lo avviso con un messaggio
            alert('Hai già inserito questo numero');
        }
    } else {
        alert('Per favore, inserire un numero compreso tra ' + inf + ' e ' + sup);
    }
} while (!mineFound && userScore < maxScore);

console.log(userNumbers);

// controllo se l'utente ha realizzato il punteggio massimo
// se ha realizzato il punteggio massimo, ha vinto
// altrimenti ha perso
if (userScore == maxScore) {
    alert('Complimenti!!!!!!! Hai vinto!!!!!!')
} else {
    alert('Hai perso. Hai realizzato ' + userScore + ' punti');
}



// creo una funzione che prende come parametri un numero minimo min e un numero massimo max e ritorna un numero random compreso tra min e max (min e max inclusi)
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}
