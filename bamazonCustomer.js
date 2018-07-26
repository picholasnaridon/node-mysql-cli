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



getProducts = () => {
  connection.query('SELECT * FROM products', function (error, results, fields) {
    if (error) throw error;
    console.log("Products\n")
    results.forEach(element => {
      console.log("Product ID ", element.item_id)
      console.log("Product Name ", element.product_name)
      console.log("Department ", element.department_name)
      console.log("Price $", element.price)
      console.log("Quantity #", element.stock_quantity)
      console.log("\n")
    });
  });
}



processOrder = (itemId, quantity, totalSales) => {
  connection.query('UPDATE products SET stock_quantity = ?, product_sales = ? WHERE item_id = ?', [quantity, totalSales, itemId], function (error, results, fields) {
    if (error) throw error;
  });
  connection.end();
}

processedOrderMessaging = (quant, name, price) => {
  console.log("Order Information\n")
  console.log(`${quant} x ${name} for ${price} `)
}

failedOrderMessaging = (quant, name) => {
  console.log("Sorry, we couldn't process that order.")
  console.log(`We currently have ${quant} ${name}(s) in stock.`)
  connection.end();
}

submitOrder = (prodId, quantity) => {
  connection.query('SELECT * FROM products WHERE item_id = ?', [prodId], function (error, results, fields) {
    if (error) throw error;
    if (results[0].stock_quantity >= quantity) {

      var totalSales = (results[0].product_sales + (quantity * results[0].price))
      var newQuant = results[0].stock_quantity - quantity

      processedOrderMessaging(quantity, results[0].product_name, (quantity * results[0].price))
      processOrder(results[0].item_id, newQuant, totalSales)
    } else {
      failedOrderMessaging(results[0].stock_quantity, results[0].product_name)
    }
  });
}

var questions = [
  {
    message: "What product would you like to buy? (item_id)",
    type: "input",
    name: "productId",
    validate: function validateFirstName(name) {
      return name !== '';
    }
  },
  {
    message: "How many would you like to buy? (quantity)",
    type: "input",
    name: "quantity",
    validate: function validateFirstName(name) {
      return name !== '';
    }
  }];


getProducts()

inquirer.prompt(questions).then(answers => {
  submitOrder(answers.productId, answers.quantity)
})

