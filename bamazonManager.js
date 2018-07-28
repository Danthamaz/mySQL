const mysql = require("mysql");
const inquirer = require("inquirer");
const Table = require("cli-table");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  actionOptions();
});

function actionOptions() {
  inquirer
    .prompt([
      {
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
          "View Products for Sale",
          "View Low Inventory",
          "Add to Inventory",
          "Add New Product"
        ]
      }
    ])
    .then(function(answer) {
      switch (answer.action) {
        case "View Products for Sale":
          currentItems();
          break;
        case "View Low Inventory":
          lowInventory();
          break;
        case "Add to Inventory":
          addToInventory();
          break;
        case "Add New Product":
          // New Product Function
          break;
        default:
          console.log("Unknown option somehow selected... That's magic.");
          break;
      }
    });
}

function currentItems() {
  console.log("\nItems currently avaialble for sell:");
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    let table = new Table({
      head: ["Item ID", "Product Name", "Department", "Price", "# in Stock"],
      colWidths: [15, 35, 20, 10, 15]
    });
    for (let i = 0; i < res.length; i++) {
      table.push([
        res[i].item_id,
        res[i].product_name,
        res[i].department_name,
        res[i].price,
        res[i].stock_quantity
      ]);
    }
    console.log(table.toString());
    actionOptions();
  });
}

function lowInventory() {
  console.log("\nItems with less than 20 in stock:");
  connection.query("SELECT * FROM products WHERE stock_quantity < 20", function(
    err,
    res
  ) {
    if (err) throw err;
    let table = new Table({
      head: ["Item ID", "Product Name", "Department", "Price", "# in Stock"],
      colWidths: [15, 35, 20, 10, 15]
    });
    for (let i = 0; i < res.length; i++) {
      table.push([
        res[i].item_id,
        res[i].product_name,
        res[i].department_name,
        res[i].price,
        res[i].stock_quantity
      ]);
    }
    console.log(table.toString());
    actionOptions();
  });
}

function addToInventory() {
  inquirer
    .prompt([
      {
        name: "item",
        type: "input",
        message: "What is the item ID of the item you would like to restock?"
      },
      {
        name: "quantity",
        type: "input",
        message: "How many of this item do you want to add?"
      }
    ])
    .then(function(answer) {
      const stockItemID = answer.item;
      const stockItemQuantity = answer.quantity;
      addItems(stockItemID, stockItemQuantity);
    });
}

function addItems(itemID, itemQuantity) {
  connection.query("SELECT * FROM products WHERE item_id = " + itemID, function(
    err,
    res
  ) {
    if (err) throw err;
    const stock_quantity = Number(res[0].stock_quantity);
    const new_stock_quantity = stock_quantity + parseInt(itemQuantity);
    let query = connection.query(
      "UPDATE products SET ? WHERE ?",
      [
        {
          stock_quantity: new_stock_quantity
        },
        {
          item_id: itemID
        }
      ],
      function(err, res) {
        if (err) throw err;
        console.log("\nYou just added " + itemQuantity + " items!");
        actionOptions();
      }
    );
  });
}
