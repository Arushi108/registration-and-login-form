document.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    // Collect form data
    const userData = {
        username: document.getElementById('registerUsername').value,
        phone: document.getElementById('registerPhone').value,
        gender: document.getElementById('registerGender').value,
        dob: document.getElementById('registerDOB').value,
        email: document.getElementById('registerEmail').value,
        country: document.getElementById('registerCountry').value,
        state: document.getElementById('registerState').value,
        address: document.getElementById('registerAddress').value,
        file: document.getElementById('registerFile').files[0]?.name, // Get the file name or a default value
        password: document.getElementById('registerPassword').value,
    };

    // Validate the form data
    if (
        !userData.username ||
        !userData.phone ||
        !userData.gender ||
        !userData.dob ||
        !userData.email ||
        !userData.country ||
        !userData.state ||
        !userData.address ||
        !userData.file ||
        !userData.password
    ) {
        alert("Please fill out all fields.");
        return;
    }

    // 1. Save user data to localStorage
    const existingUsers = JSON.parse(localStorage.getItem('users')) || []; // Retrieve existing users, or an empty array if none exists
    existingUsers.push(userData); // Add the new user to the array
    localStorage.setItem('users', JSON.stringify(existingUsers)); // Save updated users back to localStorage
    
    console.log("Saved to localStorage:", existingUsers); // Debugging: See the updated users array in the console

    // 2. Send the data to the server
    fetch('http://localhost:3000/save', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    })
    .then((response) => response.json())
    .then((data) => {
        if (data.message) {
            alert(data.message); // Show success message
        } else {
            alert("An error occurred while saving data to the server.");
        }
    })
    .catch((error) => {
        console.error('Error:', error);
        alert("Failed to save data to the server. Check the console for details.");
    });
});
