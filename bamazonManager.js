var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
  host: '127.0.0.1',
  port: 3306,
  user: 'root',
  password: '',
  database: 'bamazon'
});

connection.connect();

var currentProducts = []
var currentDepartments = []

connection.query('SELECT DISTINCT department_name FROM departments', function (error, results, fields) {
  if (error) throw error;
  results.forEach(element => {
    currentDepartments.push(element.department_name)
  });
});


connection.query('SELECT * FROM products', function (error, results, fields) {
  if (error) throw error;
  results.forEach(element => {
    currentProducts.push(element.product_name)
  });
});


getProducts = () => {
  connection.query('SELECT * FROM products', function (error, results, fields) {
    if (error) throw error;
    console.log("Products\n")
    results.forEach(element => {
      console.log("Product ID ", element.item_id)
      console.log("Product Name ", element.product_name)
      console.log("Department ", element.department)
      console.log("Price $", element.price)
      console.log("Quantity #", element.stock_quantity)
      console.log("\n")
    });
  });
  connection.end()
}

viewLowInventorty = () => {
  connection.query('SELECT * FROM products WHERE stock_quantity < 5', function (error, results, fields) {
    if (error) throw error;
    console.log("Low inventory Alert!")
    results.forEach((item) => {
      console.log("Product Name: ", item.product_name)
      console.log("Current Quantity: ", item.stock_quantity)

    })
  });
  connection.end();
}

addToInvetory = (itemName, quantity) => {
  connection.query('UPDATE products SET stock_quantity = stock_quantity + ? WHERE product_name = ?', [quantity, itemName], function (error, results, fields) {
    if (error) throw error;
    console.log(`${quantity} ${itemName} added to the warehouse!`)
  });
  connection.end();
}

addNewProduct = (itemInfo) => {
  connection.query('INSERT INTO products SET ?', itemInfo, function (error, results, fields) {
    if (error) throw error;
    console.log(`${itemInfo.stock_quantity} ${itemInfo.product_name} (NEW PRODUCT) added to the warehouse!`)
  });
  connection.end();
}

var initialQuestion = {
  type: "list",
  name: "manage",
  message: "What do you want to do?",
  choices: [
    "View Products for Sale",
    "View Low Inventory",
    "Add Additional Inventory",
    "Add New Product"
  ]
}

var updateQuantityQuestions = [
  {
    type: "list",
    name: "product_name",
    message: "Product Name:",
    choices: currentProducts
  },
  {
    type: "input",
    name: "stock_quantity",
    message: "Number being added: ",
  }
]

var addProductQuestions = [
  {
    type: "input",
    name: "product_name",
    message: "Product Name:",
  },
  {
    type: "list",
    name: "department_name",
    message: "Product Department:",
    choices: currentDepartments
  },
  {
    type: "input",
    name: "price",
    message: "Product Price ($):",
  },
  {
    type: "input",
    name: "stock_quantity",
    message: "Number of Units:",
  }
]

inquirer.prompt(initialQuestion).then(answers => {
  switch (answers.manage) {
    case "View Products for Sale":
      getProducts()
      break
    case "View Low Inventory":
      viewLowInventorty()
      break
    case "Add Additional Inventory":
      inquirer.prompt(updateQuantityQuestions).then(answers => {
        addToInvetory(answers.product_name, answers.stock_quantity)
      })
      break
    case "Add New Product":
      inquirer.prompt(addProductQuestions).then(answers => {
        addNewProduct(answers)
      })
      break
  }
})

