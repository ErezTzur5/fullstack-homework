// const fruits = ['banana','apple'];

// function getNewFruits(fruit) {
//     const newarr = [...fruits,fruit]
//     return newarr
// }

// const newFruits = getNewFruits("orange")
// console.log(newFruits);

////////////

// const cat = {
//   nickname: "hatol",
//   age: 1,
// };

// function incrementAge(obj) {
//   const newAge = {
//     ...cat,
//     age: obj.age + 1,
//   };
//   return newAge;
// }

// const newCat = incrementAge(cat);
// console.log(newCat);

////////////
const names = ["john", "dean", "erez"];

// const check = names.map((name, index) => {
//   console.log(name);
//   const person = { name, _id: index };
//   return person;
// });
// console.log(check);

// ***
// function shortMap() {
//   return names.map((name, index) => ({ name, _id: index }));
// }
// console.log(shortMap());

function filterFunc() {
  const result = names.filter((name, _) => {
    return true;
  });
  console.log(result);
}
// filterFunc();

const persons = [
  {
    _id: "1",
    name: "baba",
    age: 30,
    hobbies: ["sing", "work"],
  },
  {
    _id: "2",
    name: "mama",
    age: 69,
    hobbies: ["learn", "smoke", "sing"],
  },
  {
    _id: "3",
    name: "lulu",
    age: 12,
    hobbies: ["TV"],
  },
];

function personName(id) {
  const result = names.find((name, index) => index.toString() === id);
  return result;
}

// console.log(personName("1"));
function personHobby(hobby) {
  const result = persons.filter(
    (person) => person.hobbies && person.hobbies.includes(hobby)
  );
  return result;
}

// console.log(personHobby("sing"));

function personAbove70(age) {
  return persons.some((person) => person.age > age);
}

// console.log(personAbove70(70));

function personAbove18(age) {
  return persons.every((person) => person.age >= age);
}

// console.log(personAbove18(18));

function getIds(persons) {
  return persons.map((person) => person._id);
}

// console.log(getIds(persons));

function getUniqueHobbies(persons) {
  return Array.from(
    new Set(
      persons.reduce((acc, person) => {
        acc.push(...person.hobbies);
        return acc;
      }, [])
    )
  );
}

// console.log(getUniqueHobbies(persons));

function sumAges(persons) {
  return persons.reduce((acc, person) => {
    acc += person.age;
    return acc;
  }, 0);
}

console.log(sumAges(persons));
