const fs = require('fs');

// generate 500 users
const users = [];
for (let i = 1; i <= 500; i++) {
    users.push({
        id: i,
        firstName: `FirstName${i}`,
        lastName: `LastName${i}`
    });
}

// generate 500 books
const books = [];
for (let i = 1; i <= 500; i++) {
    books.push({
        id: i,
        name: `BookName${i}`,
        author: `Author${i}`,
        numPages: Math.floor(Math.random() * 1000) + 100 
    });
}

// combine users and books into one object
const db = {
    users: users,
    books: books
};

// write to db.json
fs.writeFileSync('db.json', JSON.stringify(db, null, 2));

console.log('db.json file has been created with 500 users and 500 books');
