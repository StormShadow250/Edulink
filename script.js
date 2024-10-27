// Arrays to store data temporarily (to be replaced with database integration)
const teachers = [];
const students = [];

// Variable to keep track of user type
let userType = '';

// Function to handle user type selection
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

// Function to proceed to the next step
function nextStep() {
    const address = document.getElementById('address').value;

    // Validate address input
    if (!address) {
        alert('Please enter your address.');
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

// Function to handle form submission
function submitForm() {
    const address = document.getElementById('address').value;
    const subject = document.getElementById('subject') ? document.getElementById('subject').value : '';
    const learningSubject = document.getElementById('learning-subject') ? document.getElementById('learning-subject').value : '';

    // Validate address input
    if (!address) {
        alert('Please enter your address.');
        return;
    }

    // Validate additional input based on user type
    if (userType === 'teacher' && !subject) {
        alert('Please enter the subject you teach.');
        return;
    }

    if (userType === 'student' && !learningSubject) {
        alert('Please enter the subject you want to learn.');
        return;
    }

    // Handle form submission based on user type
    if (userType === 'teacher') {
        // Save teacher data
        teachers.push({ address, subject });
        alert('Teacher details submitted successfully!');
    } else if (userType === 'student') {
        // Save student data
        students.push({ address, learningSubject });

        // Find and display teachers who teach the subject the student wants to learn
        const matchingTeachers = teachers.filter(teacher => teacher.subject.toLowerCase() === learningSubject.toLowerCase());

        if (matchingTeachers.length > 0) {
            alert('Teachers available for the subject you want to learn: ' + matchingTeachers.map(t => t.address).join(', '));
        } else {
            alert('No teachers available for the subject you want to learn.');
        }
    }

    // Reset and hide the form
    document.getElementById('user-type-form').reset();
    document.getElementById('user-type-form').style.display = 'none';
}