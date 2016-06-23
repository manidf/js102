var animals = [
  { name: 'Joe', species: 'rabbit' },
  { name: 'Max', species: 'dog' },
  { name: 'Larse', species: 'fish'},
  { name: 'Miguel', species: 'cat' }
];


//
var names = animals.map(function(animal) {
	return animal.name + ' is a ' + animal.species
});

// for loop
//var names = [];
//for (var i = 0; i < animals.length; i++) {
//  names.push(animals[i].name)
//}

console.log(names);
