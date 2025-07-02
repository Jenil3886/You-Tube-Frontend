import { use } from "react";

const users = [
	{ id: 1, name: "Alice", age: 22, salary: 45000 },
	{ id: 2, name: "Bob", age: 32, salary: 60000 },
	{ id: 3, name: "Charlie", age: 28, salary: 52000 },
	{ id: 4, name: "Diana", age: 25, salary: 47000 },
	{ id: 5, name: "Eve", age: 35, salary: 70000 },
];

// console.log(users);
// console.log(
// 	people.map((people) => {
// 		return { name: people.name, salary: people.salary };
// 	})
// );

// console.log(
// 	users.map((people) => {
// 		return { name: people.name, salary: people.salary };
// 	})
// );

const a = users.map((user) => {
	return { ...user, bonus: user.salary * 0.1 };
});

// console.log(a);

const b = users.map((user) => {
	return "name:" + user.name + ", salary: " + user.salary;
});

// console.log(b);

const c = users
	.filter((user) => user.age > 30)
	.map((user) => {
		return { name: user.name, salary: user.salary };
	});

// console.log(c);

const d = users.filter((user) => user.salary > 50000);
// .map((user) => {
// 	return { name: user.name, salary: user.salary };
// });
// console.log(d);

const e = users.filter((user) => user.name.startsWith("C"));

// console.log(e);

const f = users.filter((user) => user.id % 2 === 0);

// console.log(f);

const g = users.reduce((total, user) => {
	return total + user.salary;
}, 0);

// console.log(g);

const h = users.reduce((acc, user) => {
	return acc + user.age;
}, 0);

// console.log(h / users.length);

// const i = users.reduce((acc, user) => {
const salary = users.filter((user) => user.salary > 50000).length;

// return acc + salary;
// });

// console.log(salary);

const i = users.filter((user) => user.age > 25).map((user) => user.name);

// console.log(i);

const j = users.filter((user) => user.age < 30);

const ja = j.reduce((acc, users) => {
	return acc + users.salary;
}, 0);

// console.log(ja / j.length);

const k = users.reduce((acc, user) => {
	return user.salary > acc ? (acc = user.salary) : acc;
}, 0);

// console.log(k);

const l = users.filter((user) => user.age > 30).map((user) => user.name.toUpperCase());

console.log(l);

const under25 = users.filter((user) => user.age < 25);
const under25to30 = users.filter((user) => user.age < 25 && user.age > 30);
const older30 = users.filter((user) => user.age > 30);

const usersByAge = {
	under25: under25,
	under25to30: under25to30,
	older30: older30,
};

console.log(usersByAge);
