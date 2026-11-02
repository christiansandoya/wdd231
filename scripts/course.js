const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
        technology: [
            'HTML',
            'CSS'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: [
            'C#'
        ],
        completed: false
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    }
]

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