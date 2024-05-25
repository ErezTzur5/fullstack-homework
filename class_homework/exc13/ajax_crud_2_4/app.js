document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'http://localhost:8001';

    const usersTableBody = document.querySelector('#usersTable tbody');

    const createUserForm = document.getElementById('createUserForm');
    const createFirstNameInput = document.getElementById('createFirstName');
    const createLastNameInput = document.getElementById('createLastName');

    const deleteUserForm = document.getElementById('deleteUserForm');
    const deleteUserIdInput = document.getElementById('deleteUserId');

    const updateUserForm = document.getElementById('updateUserForm');
    const updateUserIdInput = document.getElementById('updateUserId');
    const updateFirstNameInput = document.getElementById('updateFirstName');
    const updateLastNameInput = document.getElementById('updateLastName');

    const fetchUsers = async () => {
        try {
            const response = await fetch(`${apiUrl}/users`);
            const users = await response.json();
            displayUsers(users);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const displayUsers = (users) => {
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
    };

    const createUser = async (event) => {
        event.preventDefault();
        const newUser = {
            firstName: createFirstNameInput.value,
            lastName: createLastNameInput.value,
        };

        try {
            await fetch(`${apiUrl}/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUser),
            });
            createFirstNameInput.value = '';
            createLastNameInput.value = '';
            fetchUsers();
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    const deleteUser = async (event) => {
        event.preventDefault();
        const userId = deleteUserIdInput.value;

        try {
            await fetch(`${apiUrl}/users/${userId}`, {
                method: 'DELETE',
            });
            deleteUserIdInput.value = '';
            fetchUsers();
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const updateUser = async (event) => {
        event.preventDefault();
        const updatedUser = {
            firstName: updateFirstNameInput.value,
            lastName: updateLastNameInput.value,
        };

        try {
            await fetch(`${apiUrl}/users/${updateUserIdInput.value}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedUser),
            });
            updateUserIdInput.value = '';
            updateFirstNameInput.value = '';
            updateLastNameInput.value = '';
            fetchUsers();
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    createUserForm.addEventListener('submit', createUser);
    deleteUserForm.addEventListener('submit', deleteUser);
    updateUserForm.addEventListener('submit', updateUser);

    // Initial fetch to populate the table
    fetchUsers();
});
