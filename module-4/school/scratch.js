const schools = [
  {
    name: "High",
    teachers: [
      {
        name: "Mr. A",
        students: [
          { studentNum: 1, grade: 100 },
          { studentNum: 2, grade: 50 },
        ],
      },
      {
        name: "Mrs. B",
        students: [
          { studentNum: 4, grade: 0 },
          { studentNum: 5, grade: 25 },
        ],
      },
    ],
  },
  { name: "Middle" },
  { name: "Elementary" },
];

let count = 0;
let total = 0;

for (const teacher of schools[0].teachers) {
  for (const student of teacher.students) {
    count++;
    total += student.grade;
  }
}

console.log(total, count);
console.log(`Average: ${total / count}`);
console.log("Average: " + total / count);
