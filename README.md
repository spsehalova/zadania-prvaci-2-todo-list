# TODO LIST (zadania-prvaci-2-todo-list)

## Zip download - https://is.gd/5U7EwJ

## Domaca uloha (Homework)

- [ ] Dokoncit zakladnu funkcionalitu (Obidva listy, complete, restore, delete, pridavanie)
- [ ] Pridat ukladanie stavu do localStorage (pozri dobrovolnu ulohu)

### Dobrovolne

- [ ] Namiesto local storage pouzit na ukladanie indexedDB


### IndexedDB

https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API
https://www.geeksforgeeks.org/javascript/indexeddb-introduction/
https://www.w3schools.com/html/html5_indexeddb.asp

Kludne sa na to opytajte chat gpt alebo mi napiste spravu.

### Local Storage

Local Storage je webová technológia, ktorá umožňuje ukladať dáta priamo v prehliadači používateľa. Dáta uložené v Local Storage pretrvávajú aj po zatvorení alebo reštarte prehliadača, kým ich používateľ alebo aplikácia nevymaže. Je vhodná na ukladanie jednoduchých nastavení alebo stavu hry.

Viac informácií:
- [MDN Web Docs: Window.localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
- [W3Schools: HTML Web Storage](https://www.w3schools.com/html/html5_webstorage.asp)

### Príklady použitia:

```javascript
// Príklad 1: Uloženie hodnoty do LocalStorage
localStorage.setItem('meno', 'Janko');

// Príklad 2: Načítanie hodnoty z LocalStorage
let meno = localStorage.getItem('meno'); // meno bude 'Janko'

// Príklad 3: Odstránenie hodnoty z LocalStorage
localStorage.removeItem('meno');

// Príklad 4: Vymazanie celého LocalStorage
localStorage.clear();

// Príklad 5: Uloženie čísla (treba konvertovať na string)
let skore = 42;
localStorage.setItem('skore', skore.toString());

// Príklad 6: Načítanie čísla (treba konvertovať späť na číslo)
let nacitaneSkore = Number(localStorage.getItem('skore'));