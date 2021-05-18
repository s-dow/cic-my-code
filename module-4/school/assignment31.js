const company = [
  {
    name: "Company A",
    location10: [
      {
        department: "electronics",
        manager: [
          {
            name: "Rodger",
            employees: [
              { name: "John", pto: 3 },
              { name: "Jennifer", pto: 20 },
            ],
          },
        ],
      },
      {
        department: "beauty",
        manager: [
          {
            name: "Bailey",
            employees: [
              { name: "Kelsey", pto: 10 },
              { name: "Jonathan", pto: 5 },
            ],
          },
        ],
      },
      {
        department: "home goods",
        manager: [
          {
            name: "Michele",
            employees: [
              { name: "Oliver", pto: 16 },
              { name: "Fletcher", pto: 4 },
            ],
          },
        ],
      },
    ],
  },
];

let count = 0;
let total = 0;

for (const location of company[0].location10) {
  for (const mgr of location.manager) {
    for (const employee of mgr.employees) {
      count++;
      total += employee.pto;
    }
  }
}

console.log(total, count);
console.log(`Average PTO: ${total / count}`);
