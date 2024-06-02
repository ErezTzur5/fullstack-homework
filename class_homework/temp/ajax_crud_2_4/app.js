const apiUrl = "http://localhost:8001";
const limit = 10;
let currentPage = 1;

async function fetchUsers() {
    try {
        const response = await fetch(`${apiUrl}/users?_page=${currentPage}&_limit=${limit}`);
        if (!response.ok) {
            throw new Error("Failed to fetch users");
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
}

function renderUsers(users) {
    const tableBody = document.querySelector("#usersTable tbody");
    tableBody.innerHTML = "";
    users.forEach((user) => {
        const row = `<tr>
          <td>${user.id}</td>
          <td>${user.firstName}</td>
          <td>${user.lastName}</td>
        </tr>`;
        tableBody.innerHTML += row;
    });
}

// Function to handle form submission to create a user
async function createUser(firstName, lastName) {
    try {
        const response = await fetch(`${apiUrl}/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ firstName, lastName }),
        });
        if (!response.ok) {
            throw new Error("Failed to create user");
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
}

// Function to handle form submission to delete a user
async function deleteUser(userId) {
    try {
        const response = await fetch(`${apiUrl}/users/${userId}`, {
            method: "DELETE",
        });
        if (!response.ok) {
            throw new Error("Failed to delete user");
        }
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

// Function to handle form submission to update a user
async function updateUser(userId, firstName, lastName) {
    try {
        const response = await fetch(`${apiUrl}/users/${userId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: userId, firstName, lastName }),
        });
        if (!response.ok) {
            throw new Error("Failed to update user");
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
}

// Function to handle the overall CRUD operations for users
async function manageUsers() {
    let users = await fetchUsers();
    renderUsers(users);

    document.querySelector("#createUserForm").addEventListener("submit", async (e) => {
        e.preventDefault();
        const firstName = document.querySelector("#createFirstName").value;
        const lastName = document.querySelector("#createLastName").value;
        const newUser = await createUser(firstName, lastName);
        if (newUser) {
            users.push(newUser);
            renderUsers(users);
        }
    });

    document.querySelector("#deleteUserForm").addEventListener("submit", async (e) => {

        const userId = document.querySelector("#deleteUserId").value;
        const success = await deleteUser(userId);
        if (success) {
            users = users.filter((user) => user.id !== userId);
            renderUsers(users);
        }
    });

    document.querySelector("#updateUserForm").addEventListener("submit", async (e) => {

        const userId = parseInt(document.querySelector("#updateUserId").value);
        const firstName = document.querySelector("#updateFirstName").value;
        const lastName = document.querySelector("#updateLastName").value;
        const updatedUser = await updateUser(userId, firstName, lastName);
        if (updatedUser) {
            users = users.map((user) => (user.id === userId ? updatedUser : user));
            renderUsers(users);
        }
    });

    document.querySelector("#prevPage").addEventListener("click", async () => {
        if (currentPage > 1) {
            currentPage--;
            users = await fetchUsers();
            renderUsers(users);
            document.querySelector("#pageNumber").innerText = `Page ${currentPage}`;
        }
    });

    document.querySelector("#nextPage").addEventListener("click", async () => {
        currentPage++;
        users = await fetchUsers();
        if (users.length > 0) {
            renderUsers(users);
            document.querySelector("#pageNumber").innerText = `Page ${currentPage}`;
        } else {
            currentPage--;
        }
    });
}

// Initial handling of users
manageUsers();
