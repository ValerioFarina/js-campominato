/*  CONSEGNA: Il programma deve generare 16 numeri compresi tra 1 e 100: queste saranno le mine.
    Dopodiché, il programma deve chiedere all'utente un numero alla volta e verificare se il numero indicato dall'utente è una mina oppure no.
    Se l'utente becca una mina, il gioco finisce, mentre, se il numero non corrisponde ad una mina, il gioco prosegue e il programma chiede all'utente un nuovo numero.
    Alla fine della partita, il programma comunica all'utente il suo punteggio, cioè quanti numeri è riuscito ad inserire prima che il gioco finisse.
    BONUS (facoltativo): all'inizio del gioco, il programma chiede all'utente il livello di difficoltà:
        - 0 = l'intervallo di numeri possibili è tra 1 e 100
        - 1 = l'intervallo di numeri possibili è tra 1 e 80
        - 2 = l'intervallo di numeri possibili è tra 1 e 50
    In ogni caso, le mine sono sempre 16.  */



// creo delle variabili che rappresentano il livello minimo e il livello massimo di difficoltà che l'utente può scegliere
var minLevel = 0;
var maxLevel = 2;

// chiedo all'utente di inserire il livello di difficoltà
// continuo a chiderglielo fintanto che l'input da lui inserito non è valido
// in questo caso, l'input dell'utente non è valido quando si verifica almeno una delle seguenti condizioni:
    // - l'input inserito non è un numero
    // - l'input inserito è un numero, ma non è compreso tra minLevel e maxLevel
var level;
do {
    level = parseInt(prompt('Scegli un livello di difficoltà compreso tra ' + minLevel + ' e ' + maxLevel));
    if (! isInputValid(level, minLevel, maxLevel)) {
        alert('Per favore, inserisci un numero compreso tra ' + minLevel + ' e ' + maxLevel);
    }
} while (! isInputValid(level, minLevel, maxLevel));

// creo due variabili inf e sup (estremo inferiore ed estremo superiore)
// sia le mine sia i numeri inseriti dall'utente dovranno essere compresi tra inf e sup
var inf = 1;
var sup;

// controllo quale livello ha inserito l'utente
// a seconda del livello, stabilisco quale valore assegnare a sup
// il valore di inf rimane invece sempre uguale a 1
switch (level) {
    case 0:
        sup = 100;
        break;
    case 1:
        sup = 80;
        break;
    case 2:
        sup = 50;
        break;
}

// creo una variabile contenente come valore il numero delle mine che desideriamo generare
var numberOfMines = 16;

// creo un array mines contenente numeri interi casuali compresi tra inf e sup
// questi numeri rappresentano le mine
// il numero di elementi dell'array (cioè, il numero di mine) è pari a numberOfMines
var mines = getArrayOfIntegers(numberOfMines, inf, sup);

console.log(mines);

// creo un array userNumbers (inizialmente vuoto) in cui andrò a salvare tutti i numeri inseriti dall'utente prima di beccare una mina (o prima di raggiungere il punteggio massimo)
var userNumbers = [];

// creo una variabile sentinella per controllare se l'utente ha beccato una mina (cioè, se il numero inserito dall'utente è presente nell'array mines)
var mineFound = false;

// creo una variabile maxScore che rappresenta il massimo punteggio che l'utente può realizzare
// l'utente realizza il punteggio massimo quando inserisce uno dopo l'altro esattamente tutti quei numeri compresi tra inf e sup che non sono presenti nell'array mines
// il punteggio massimo corrisponde quindi alla quantità di numeri compresi tra inf e sup e che sono diversi dalle mine
// quindi, per calcolare il punteggio massimo dobbiamo:
    // - calcolare quanti sono i numeri compresi tra inf e sup
    // - sottrarre a tale valore il numero delle mine
var maxScore = rangeSize(inf, sup) - numberOfMines;

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
    if (isInputValid(userNumber, inf, sup)) {
        // controllo se l'utente ha beccato una mina (cioè, se il numero che ha appena inserito è incluso nell'array mines)
        if (mines.includes(userNumber)) {
            // se l'utente ha beccato una mina, pongo mineFound uguale a true (questo rende la condizione di permanenza nel ciclo falsa)
            mineFound = true;
            console.log('Hai beccato la mina ' + userNumber);
            // controllo se il numero inserito dall'utente è già presente nell'array userNumbers
        } else if (! userNumbers.includes(userNumber)) {
            // se il numero inserito dall'utente non è una mina, e inoltre non è incluso nell'array userNumbers, allora lo salvo in questo array
            // inoltre, aggiorno il punteggio dell'utente (che deve sempre essere uguale alla lunghezza dell'array userNumbers)
            userNumbers.push(userNumber);
            userScore = userNumbers.length;
        } else {
            // se il numero inserito dall'utente non è una mina, ma è già presente nell'array userNumbers,
            // significa che l'utente questo numero lo aveva già inserito in precedenza, e quindi lo avviso con un messaggio
            alert('Hai già inserito questo numero');
        }
    // se l'input inserito dall'utente non è valido, lo avviso con un messaggio
    } else {
        alert('Per favore, inserire un numero compreso tra ' + inf + ' e ' + sup);
    }
} while (! mineFound && userScore < maxScore);

console.log(userNumbers);

// controllo se l'utente ha realizzato il punteggio massimo
// se ha realizzato il punteggio massimo, ha vinto
// altrimenti ha perso
if (userScore == maxScore) {
    alert('Complimenti!!!!!!! Hai vinto!!!!!!')
} else {
    alert('Hai perso. Hai realizzato ' + userScore + ' punti');
}





// ********** LE MIE FUNZIONI **********

// questa funzione prende in input un valore e controlla se è un numero oppure no
// se è un numero (o comunque una stringa costituita da caratteri numerici), ritorna true
// altrimenti, ritorna false
function isNumber(value) {
    if (!isNaN(value)) {
        return true;
    } else {
        return false;
    }
}


// questa funzione prende in input tre numeri num, min e max, e controlla se num è compreso tra min e max
// se num è compreso tra min e max (eventualmente uguale a min o max), allora la funzione ritorna true
// altrimenti ritorna false
function isInRange(num, min, max) {
    if (num >= min && num <=max) {
        return true;
    } else {
        return false;
    }
}


// questa funzione serve a controllare se l'input inserito dall'utente è valido
// nel nostro caso, l'input dell'utente è valido se entrambe le seguenti condizioni sono soddisfatte:
    // - l'input è un numero
    // - l'input è compreso tra un min e un max
function isInputValid(input, min, max) {
    if (isNumber(input) && isInRange(input, min, max)) {
        return true;
    } else {
        return false;
    }
}

// questa funzione prende in input due numeri min e max e calcola quanti sono i numeri compresi tra min e max (contando anche gli stessi min e max)
// in altre parole, questa funzione calcola quanti numeri sono presenti nel range che va da min a max
function rangeSize(min, max) {
    return max - min + 1;
}


// questa funzione prende come parametri un numero minimo min e un numero massimo max e ritorna un numero random compreso tra min e max (min e max inclusi)
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}


// questa funzione prende in input tre numeri: numberOfElements, min e max
// la funzione ritorna un array contenente un numero di elementi pari a numberOfElements
// gli elementi dell'array sono numeri interi casuali compresi tra min e max (min e max inclusi)
// tutti gli elementi sono diversi tra loro, non ci sono duplicati
function getArrayOfIntegers(numberOfElements, min, max) {
    var arrayOfIntegers = [];
    while (arrayOfIntegers.length < numberOfElements) {
        // genero un numero random compreso tra inf e sup e lo salvo in un variabile (questo numero rappresenta una mina)
        var randomInteger = getRndInteger(min, max);
        // controllo se la mina generata casualmente è già presente nell'array mines
        if (!arrayOfIntegers.includes(randomInteger)) {
            // salvo dentro l'array mines la mina generata casualmente solo se essa non è già presente nell'array
            // in questo modo i numeri nell'array mines saranno tutti diversi tra loro
            arrayOfIntegers.push(randomInteger);
        }
    }
    return arrayOfIntegers;
}
