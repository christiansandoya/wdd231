const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This is the course description for CSE 110...',
        technology: ['Python'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and web page development principles...',
        technology: ['HTML', 'CSS'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students deepen their understanding of programming concepts using Python...',
        technology: ['Python'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the concepts of object-oriented programming using C#...',
        technology: ['C#'],
        completed: false
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior Web fundamentals and introduces JavaScript and dynamic web design...',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Web Frontend Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course focuses on user experience, advanced CSS, modern JavaScript, and web accessibility standards...',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: false
    }
];

const courseListContainer = document.querySelector('#course-list');

const filterContainer = document.createElement('div');
filterContainer.classList.add('course-filters');
filterContainer.innerHTML = `
    <button id="all-btn">All Courses</button>
    <button id="wdd-btn">WDD Courses</button>
    <button id="cse-btn">CSE Courses</button>
`;
courseListContainer.parentNode.insertBefore(filterContainer, courseListContainer);

function displayCourses(filteredCourses) {
    courseListContainer.innerHTML = '';

    const gridDiv = document.createElement('div');
    gridDiv.classList.add('courses-grid');

    filteredCourses.forEach(course => {
        const courseCard = document.createElement('div');
        courseCard.classList.add('course-card');
        
        if (course.completed) {
            courseCard.classList.add('completed');
        } else {
            courseCard.classList.add('pending');
        }

        courseCard.innerHTML = `
            <h3>${course.subject} ${course.number}</h3>
            <p>${course.title} (${course.credits} credits)</p>
        `;
        gridDiv.appendChild(courseCard);
    });

    courseListContainer.appendChild(gridDiv);

    const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
    
    let creditsDisplay = document.querySelector('#total-credits');
    if (!creditsDisplay) {
        creditsDisplay = document.createElement('p');
        creditsDisplay.id = 'total-credits';
        courseListContainer.parentNode.appendChild(creditsDisplay);
    }
    creditsDisplay.textContent = `Total Credits Required/Shown: ${totalCredits}`;
}

document.querySelector('#all-btn').addEventListener('click', () => displayCourses(courses));
document.querySelector('#wdd-btn').addEventListener('click', () => displayCourses(courses.filter(c => c.subject === 'WDD')));
document.querySelector('#cse-btn').addEventListener('click', () => displayCourses(courses.filter(c => c.subject === 'CSE')));

displayCourses(courses);