const sugar = {name: 'sugar', taste: 'sweet', id: '56j2j45lbtaiuch'};
const honey = {name: 'honey', taste: 'sweet', id: '56j2j45lbtaitkn'};
const lemon = {name: 'lemon', taste: 'soar', id: '56j2j45lbtaissx'};
const butter = {name: 'butter', taste: 'nasty', id: '56j2j45lbtaiv4e'};


const index = require('./index');

const foodIndex = index('food', 'taste');
foodIndex.init();

foodIndex.addDoc(butter)

