var mysql = require('mysql');
var inquirer = require('inquirer');
var Table = require('cli-table');

var connection = mysql.createConnection({
  host: '127.0.0.1',
  port: 3306,
  user: 'root',
  password: '',
  database: 'bamazon'
});

connection.connect();


addNewDepartment = (deptInfo) => {
  connection.query('INSERT INTO departments SET ?', deptInfo, function (error) {
    if (error) throw error;
    console.log(`${deptInfo.department_name} added to department list`)
    console.log(`Current over head costs: $${deptInfo.over_head_costs}`)
  });
  connection.end();
}

getSalesByDept = () => {
  var sql = 'SELECT IFNULL(sum(product_sales),0), over_head_costs, departments.department_name, departments.department_id FROM products RIGHT JOIN departments ON products.department_name = departments.department_name  GROUP BY departments.department_name '
  connection.query(sql, function (error, results) {
    if (error) throw error;
    parseResultsData(results)
  });
  connection.end()
}

parseResultsData = (results) => {
  var table = new Table({
    head: ['department_id', 'department_name', 'over_head_costs', 'product_sales', 'total_profit']
    , colWidths: [20, 20, 20, 20, 20]
  });
  results.forEach(element => {
    var total_profit = (element['IFNULL(sum(product_sales),0)'] - element.over_head_costs)
    table.push([element.department_id, element.department_name, element.over_head_costs, element['IFNULL(sum(product_sales),0)'], total_profit])
  });
  console.log(table.toString());

}

createtable = () => {

}

var initialQuestion = {
  type: "list",
  name: "supervisorAction",
  message: "What do you want to do?",
  choices: [
    "View Product Sales by Department",
    "Create New Department"
  ]
}

var addDeptQuestion = [
  {
    type: "input",
    name: "department_name",
    message: "Enter Department Name"
  },
  {
    type: "input",
    name: "over_head_costs",
    message: "Enter Over Head Costs"
  }

]


inquirer.prompt(initialQuestion).then(answers => {
  switch (answers.supervisorAction) {
    case "Create New Department":
      inquirer.prompt(addDeptQuestion).then(answer => {
        addNewDepartment(answer)
      })
      break
    case "View Product Sales by Department":
      getSalesByDept()
      break
  }
})




