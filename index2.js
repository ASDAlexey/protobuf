const Schema = require("./employees_pb");
const fs = require("fs");

const employee2Class = ({ id, name, salary }) => {
  const employee = new Schema.Employee();
  employee.setId(id);
  employee.setName(name);
  employee.setSalary(salary);
  return employee;
}

const employees = new Schema.Employees();
[{
  "name": "Hussein",
  "salary": 1000,
  "id": 1001
}, {
  "name": "Ahmed",
  "salary": 9000,
  "id": 1002
}, {
  "name": "Rick",
  "salary": 5000,
  "id": 1003
}].map(item => employee2Class(item)).forEach(item => employees.addEmployees(item));


const bytes = employees.serializeBinary();
// console.log("binary " + bytes)
fs.writeFileSync("employeesbinary", bytes)

const employees2 = Schema.Employees.deserializeBinary(bytes);
console.log(employees2.toObject().employeesList[0].id);

// const ahmed = new Schema.Employee();
// ahmed.setId(1002);
// ahmed.setName("Ahmed");
// ahmed.setSalary(9000);
// const bytes = ahmed.serializeBinary();
// const ahmed2 = Schema.Employee.deserializeBinary(bytes);
// console.log(ahmed2.toObject());
