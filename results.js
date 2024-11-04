// Retrieve the data from localStorage
const teachers = JSON.parse(localStorage.getItem('teachers')) || [];
const subject = new URLSearchParams(window.location.search).get('subject');

// Check if a subject was provided
if (subject) {
    // Filter teachers based on the requested subject
    const matchingTeachers = teachers.filter(teacher => teacher.subject.toLowerCase() === subject.toLowerCase());

    // Display matching teachers
    const resultsContent = document.getElementById('results-content');
    if (matchingTeachers.length > 0) {
        matchingTeachers.forEach(teacher => {
            const teacherDiv = document.createElement('div');
            teacherDiv.className = 'teacher';
            teacherDiv.innerHTML = `
                <p><strong>Name:</strong> <span>${teacher.name}</span></p>
                <p><strong>Phone:</strong> <span>${teacher.phone}</span></p>
                <p><strong>Address:</strong> <span>${teacher.fullAddress}</span></p>
                <p><strong>Subject:</strong> <span>${teacher.subject}</span></p>`;
            resultsContent.appendChild(teacherDiv);
        });
    } else {
        resultsContent.innerHTML = '<p>No teachers available for the subject you want to learn.</p>';
    }
} else {
    document.getElementById('results-content').innerHTML = '<p>Please provide a subject to search for teachers.</p>';
}
