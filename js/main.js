// node properties

var boxElement = document.querySelector(".box");

// console.log([boxElement]);

// sd reduce() lam phang - flat array
var depthArray = [1, 2, [3, 4], 5, 6, [7, 8, 9]];

var flatArray = depthArray.reduce((flatOutput, depthItem) => {
  return flatOutput.concat(depthItem);
}, []);

console.log("Lam phang mang: ", flatArray);

// lay ra cac khoa hoc dua vao 1 mang moi
var topics = [
  {
    topic: "Front-end",
    courses: [
      {
        id: 1,
        title: "HTML,CSS",
      },
      {
        id: 2,
        title: "Reactjs",
      },
      {
        id: 3,
        title: "NextJS",
      },
    ],
  },
  {
    topic: "Back-end",
    courses: [
      {
        id: 1,
        title: "Nodejs",
      },
      {
        id: 2,
        title: "Express",
      },
      {
        id: 3,
        title: "NestJS",
      },
    ],
  },
];

// su dung reduce tach 2 item o tren thanh mot array cac khoa hoc
var newCourses = topics.reduce((courses, topic) => {
  return courses.concat(topic.courses);
}, []);
console.log("Noi khoa hoc", newCourses);

var htmls = newCourses.map((course) => {
  return `
        <div>
            <h2>${course.title}</h2>
            <p>ID: ${course.id}</p>
        </div>
    `;
});
console.log(htmls.join(""));
