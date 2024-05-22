document.addEventListener('DOMContentLoaded', () => {
    const baseURL = 'http://localhost:3000/users';

    const getAllButton = document.getElementById('getAll');
    const usersTableBody = document.querySelector('#usersTable tbody');
    const createUserForm = document.getElementById('createUserForm');
    const deleteUserForm = document.getElementById('deleteUserForm');
    const updateUserForm = document.getElementById('updateUserForm');

    // Function to fetch all users
    const getAllUsers = async () => {
        try {
            const response = await fetch(baseURL);
            const users = await response.json();
            usersTableBody.innerHTML = '';
            users.forEach(user => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${user.id}</td>
                    <td>${user.firstName}</td>
                    <td>${user.lastName}</td>
                `;
                usersTableBody.appendChild(row);
            });
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    // Function to create a new user
    const createUser = async (event) => {
        event.preventDefault();
        const firstName = document.getElementById('createFirstName').value;
        const lastName = document.getElementById('createLastName').value;

        try {
            const response = await fetch(baseURL);
            const users = await response.json();
            const newId = users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 1;

            const newUser = {
                id: newId,
                firstName,
                lastName
            };

            await fetch(baseURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUser)
            });

            getAllUsers();
            createUserForm.reset();
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    // Function to delete a user
    const deleteUser = async (event) => {
        event.preventDefault();
        const userId = document.getElementById('deleteUserId').value;

        try {
            await fetch(`${baseURL}/${userId}`, {
                method: 'DELETE'
            });

            getAllUsers();
            deleteUserForm.reset();
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    // Function to update a user
    const updateUser = async (event) => {
        event.preventDefault();
        const userId = document.getElementById('updateUserId').value;
        const firstName = document.getElementById('updateFirstName').value;
        const lastName = document.getElementById('updateLastName').value;

        try {
            const updatedUser = {
                firstName,
                lastName
            };

            await fetch(`${baseURL}/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedUser)
            });

            getAllUsers();
            updateUserForm.reset();
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    // Event listeners
    getAllButton.addEventListener('click', getAllUsers);
    createUserForm.addEventListener('submit', createUser);
    deleteUserForm.addEventListener('submit', deleteUser);
    updateUserForm.addEventListener('submit', updateUser);
});
