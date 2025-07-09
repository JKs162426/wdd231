const today = new Date;
const year = document.querySelector("#currentyear");
year.innerHTML = today.getFullYear();

const lastModified = document.querySelector("#lastModified");
lastModified.innerHTML = document.lastModified;

const courses = [
    {
        "courseName": "WDD",
        "courseNumber": "231",
        "Credits": 2,
        "Completed": "No"
    },
    {
        "courseName": "WDD",
        "courseNumber": "130",
        "Credits": 2,
        "Completed": "Yes"
    },
    {
        "courseName": "WDD",
        "courseNumber": "131",
        "Credits": 2,
        "Completed": "Yes"
    },
    {
        "courseName": "CSE",
        "courseNumber": "110",
        "Credits": 2,
        "Completed": "Yes"
    },
    {
        "courseName": "CSE",
        "courseNumber": "111",
        "Credits": 2,
        "Completed": "Yes"
    },
    {
        "courseName": "CSE",
        "courseNumber": "210",
        "Credits": 2,
        "Completed": "Yes"
    }

];

function createCourseList(courses) {
    const courseList = document.querySelector("#course-list");
    courses.forEach(course => {
        const listItem = document.createElement("li");
        listItem.textContent = `${course.courseName} ${course.courseNumber} Completed: ${course.Completed}`;
        courseList.appendChild(listItem);
    });
}

function filterCourses(courses, filter) {
    return courses.filter(course => course.courseName === filter);
}


function calculateTotalCredits(courses) {
    const totalCredits = document.querySelector("#totalCredits");
    let total = 0;
    courses.forEach(course => {
    total += course.Credits;
    });
    totalCredits.textContent = `Total Credits: ${total}`;
}

const filterLinks = document.querySelectorAll("#courseList li a");

filterLinks.forEach(link => {
    link.addEventListener("click", (event) => {
        event.preventDefault();
        
        const filterText = link.textContent.trim();
        let filteredCourses;

        if (filterText === "All") {
            filteredCourses = courses;
        } else {
            filteredCourses = filterCourses(courses, filterText);
        }

        const courseList = document.querySelector("#course-list");
        courseList.innerHTML = "";
        createCourseList(filteredCourses);
        calculateTotalCredits(filteredCourses);
    });
});

const courseList = document.querySelector("#course-list");

const hamButton = document.querySelector('#menu');
const navigation = document.querySelector('.navigation');

hamButton.addEventListener('click', () => {
	navigation.classList.toggle('open');
	hamButton.classList.toggle('open');
});