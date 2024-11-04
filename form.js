const teachers = [];
let userType = '';

function selectUserType(type) {
    userType = type; // Set the user type
    document.getElementById('user-type-form').style.display = 'block'; // Show the form
    document.getElementById('form-title').innerText = `Please enter your details as a ${type}`;

    // Hide all specific sections initially
    document.getElementById('teacher-specific').style.display = 'none';
    document.getElementById('student-specific').style.display = 'none';

    // Show address section
    document.getElementById('address-section').style.display = 'block';
}

function nextStep() {
    const street = document.getElementById('street').value;
    const locality = document.getElementById('locality').value;
    const city = document.getElementById('city').value;
    const country = document.getElementById('country').value;

    // Validate address input
    if (!street || !locality || !city || !country) {
        alert('Please fill in all address fields.');
        return;
    }

    // Hide the address section
    document.getElementById('address-section').style.display = 'none';

    // Show the relevant section based on user type
    if (userType === 'teacher') {
        document.getElementById('teacher-specific').style.display = 'block';
    } else if (userType === 'student') {
        document.getElementById('student-specific').style.display = 'block';
    }
}

function submitForm() {
    const street = document.getElementById('street').value;
    const locality = document.getElementById('locality').value;
    const city = document.getElementById('city').value;
    const country = document.getElementById('country').value;
    const fullAddress = `${street}, ${locality}, ${city}, ${country}`;

    const name = document.getElementById('name') ? document.getElementById('name').value : '';
    const phone = document.getElementById('phone') ? document.getElementById('phone').value : '';
    const subject = document.getElementById('subject') ? document.getElementById('subject').value : '';
    const learningSubject = document.getElementById('learning-subject') ? document.getElementById('learning-subject').value : '';

    // Validate address input
    if (!street || !locality || !city || !country) {
        alert('Please fill in all address fields.');
        return;
    }

    // Validate additional input based on user type
    if (userType === 'teacher' && (!name || !phone || !subject)) {
        alert('Please fill in all teacher fields (name, phone, subject).');
        return;
    }

    if (userType === 'student' && !learningSubject) {
        alert('Please enter the subject you want to learn.');
        return;
    }

    // Handle form submission based on user type
    if (userType === 'teacher') {
        // Save teacher data
        teachers.push({ fullAddress, name, phone, subject });
        localStorage.setItem('teachers', JSON.stringify(teachers)); // Store in local storage
        alert('Teacher details submitted successfully!');
    } else if (userType === 'student') {
        // Redirect to results page with the learning subject
        const url = `results.html?subject=${encodeURIComponent(learningSubject)}`;
        window.location.href = url; // Redirect to results page
    }

    // Reset and hide the form
    document.getElementById('user-type-form').reset();
    document.getElementById('user-type-form').style.display = 'none';
}
