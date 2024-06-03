// exc 1
const fruits = ["apple", "banna", "mango"];

fruits.push("orange");

fruits.pop();

fruits.unshift("strawberry");

fruits.shift();

// console.log(fruits[fruits.length - 1]);

// exc 2

const numbers = [1, 2, 3, 4, 5];

numbers.forEach((number, index) => {
  console.log("numbers: ", number, "index: ", index);
});
//2
const double = numbers.map((number) => {
  return number * 2;
});

//3

const even = numbers.filter((number) => {
  return number % 2 === 0;
});

//4

const sum = numbers.reduce((acc, number) => {
  return acc + number;
}, 0);

// exc 3

const students = ["omer", "Jane", "Biden", "Jill"];

const onlyJ = students.find((student) => {
  return student.includes("J");
});

// console.log(onlyJ);

const onlyJSome = students.some((student) => {
  return student.includes("J");
});

// console.log(onlyJSome);

const onlyJEvery = students.every((student) => {
  return student.includes("J");
});

// console.log(onlyJEvery);

// exc 4

const colors = ["red", "blue", "green", "yellow", "purple"];

const newColors = colors.slice(0, 3);

const replaceLastelEments = colors.splice(3, 2, "pink", "orange");
// console.log(colors);

// exc 5
const products = [
  { name: "laptop", price: 1000 },
  { name: "phone", price: 500 },
  { name: "tablet", price: 800 },
  { name: "watch", price: 200 },
];

const productsNames = products.map((product) => {
  return product.name;
});

// console.log(productsNames);

const moreThan500 = products.filter((product) => {
  return product.price > 500;
});

// console.log(moreThan500);

const sumPrice = products.reduce((acc, product) => {
  return acc + product.price;
});

//challenges 1

const inventory = [
  { id: 1, name: "Laptop", price: 1000 },
  { id: 2, name: "Phone", price: 500 },
  { id: 3, name: "Tablet", price: 800 },
];

function arrayToObject(array, key) {
  return array.reduce((acc, item) => {
    acc[item[key]] = item;
    return acc;
  }, {});
}

// console.log(arrayToObject(inventory, "id"));

// Challenge 4: Intersection of Arrays

const array1 = [1, 2, 3, 4, 5];
const array2 = [3, 4, 5, 6, 7];

function intersectArrays(array1, array2) {
  return array1.filter((item) => array2.includes(item));
}

console.log(intersectArrays(array1, array2));

//Challenge 5: Unique Values

const duplicates = [1, 2, 2, 3, 4, 4, 5];

function uniqueValues(array) {
  return array.reduce((acc, item) => {
    if (!acc.includes(item)) {
      acc.push(item);
    }
    return acc;
  }, []);
}

// console.log(uniqueValues(duplicates));

//Challenge 6: Group Employees by Key (Bonus)

const employees = [
  { name: "John Doe", department: "Engineering", yearsOfExp: 5 },
  { name: "Jane Smith", department: "Marketing", yearsOfExp: 8 },
  { name: "Peter Johnson", department: "Engineering", yearsOfExp: 5 },
  { name: "Lucy Brown", department: "Marketing", yearsOfExp: 10 },
  { name: "Mike Davis", department: "Engineering", yearsOfExp: 3 },
  { name: "Sara Wilson", department: "Marketing", yearsOfExp: 8 },
];

// important
function groupBy(array, key) {
  return array.reduce((acc, item) => {
    if (!acc[item[key]]) {
      acc[item[key]] = [];
    }
    acc[item[key]].push(item);
    return acc;
  }, {});
}

console.log(groupBy(employees, "department"));
