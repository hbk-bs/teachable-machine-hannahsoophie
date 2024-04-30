// Inhalt von "sketch.js"

// Globale Variablen
let classifier;
const wordList = document.getElementById("wordList");
const uniqueWords = new Set(); // Set zum Speichern der einzigartigen Wörter

// Funktion zum Aktualisieren des Schriftfeldes mit neuen Begriffen
function updateWordList(word) {
    if (!uniqueWords.has(word)) { // Prüfen, ob das Wort bereits in der Liste vorhanden ist
        const listItem = document.createElement("p");
        listItem.textContent = word;
        wordList.appendChild(listItem);
        uniqueWords.add(word); // Wort zum Set hinzufügen, um Duplikate zu vermeiden
    }
}

// Funktion, die aufgerufen wird, wenn das Ergebnis erhalten wurde
function gotResult(error, results) {
    if (error) {
        console.error(error);
        return;
    }

    // Ergebnisse überprüfen und nur anzeigen, wenn die Wahrscheinlichkeit über 90% liegt
    if (results[0].confidence > 0.9) {
        const translation = getTranslation(results[0].label);
        updateWordList(translation); // Ergebnis zur Liste der angezeigten Wörter hinzufügen
    }
}

// Laden des Modells und Starten der Klassifizierung
function preload() {
    // Teachable Machine model URL:
    let soundModel = "https://teachablemachine.withgoogle.com/models/VnelyYjK0/";
    classifier = ml5.soundClassifier(soundModel + "model.json", modelLoaded);
}

// Funktion, die aufgerufen wird, wenn das Modell geladen ist
function modelLoaded() {
    console.log("Model geladen!");
    // Starte die Klassifizierung
    classifier.classify(gotResult);
}

// Funktion, die aufgerufen wird, wenn das Ergebnis erhalten wurde
function gotResult(error, results) {
    if (error) {
        console.error(error);
        return;
    }

    // Zeige das Ergebnis im 'output'-Div an
    document.getElementById("output").innerText = results[0].label;
}
