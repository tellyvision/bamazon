//dependencies
var db = require("./db");
var mysql = require("mysql");
var inquirer = require('inquirer');
var Table = require('cli-table');

var connection = db.login();

connection.connect(function(err) {
    if (err) {
        throw err;
    }
    console.log("Here is a list of items available to order");
    //itemList();
});


//display items in table form
function itemList() {

    connection.query('SELECT * FROM products', function(err, response){

        var displayTable = new Table({
          head: ['Item ID', 'Product Name', 'Department', 'Price', 'Quantity'],
            //make widths to create table
            colWidths: [10, 25, 25, 10, 15]
        });
        

        for (var i = 0; i<response.length; i++) {
            displayTable.push(
              [response[i].item_id, response[i].product_name, response[i].department_name, response[i].price, response[i].stock_quantity]
            );
        }

        //display table in console
        console.log(displayTable.toString());
        customerChoice();
    });

};
        

// ask customer about item they want to order
function customerChoice() {
    inquirer.prompt([
        {  
        name: "id",
        type: "input",
        message: "What is the ID of the product would you like to order?",
        
        },

        {
        name: "quantity",
        type: "input",
        message: "How many units of the product would you like to buy?"

        }
    
    ]).then(function(answer) {
        //console.log(answer)

        var orderedItem = answer.id;
        var howMany = answer.quantity;
        customerPurchase(orderedItem, howMany);
    });

};


//check if item in stock, subtract from database or tell customer none in stock
function customerPurchase(id, howMany) {
  
  connection.query('SELECT * FROM Products WHERE item_id = ' + id, function(error, response) {
      if (error) { console.log(error) };

      //if item is in stock
      if (howMany <= response[0].stock_quantity) {
          //calculate cost
          var cost = response[0].price * howMany;
          //tell customer amount
          console.log("We have them in stock.");
          console.log("The cost for " + howMany + " " + response[0].product_name + " is $" + cost + ". Thank you for your order.");
          //update quantity in database
          connection.query('UPDATE Products SET stock_quantity = stock_quantity - ' + howMany + ' WHERE item_id = ' + id);
      } else {
          console.log("Sorry, we do not have " + response[0].product_name + " in stock.");
      };
      itemList();
  });

}; 

itemList();

      