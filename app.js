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
  currentItems();
});

function currentItems() {
  console.log("Items currently avaialble for sell:");
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
    goShopping();
  });
}

function goShopping() {
  inquirer
    .prompt([
      {
        name: "item",
        type: "input",
        message: "What is the item ID of the item you would like to purchase?"
      },
      {
        name: "quantity",
        type: "input",
        message: "How many of this item do you want to buy?"
      }
    ])
    .then(function(answer) {
      const purchaseItemID = answer.item;
      const purchaseItemQuantity = answer.quantity;
      purchaseItems(purchaseItemID, purchaseItemQuantity);
    });
}

function purchaseItems(itemID, itemQuantity) {
  connection.query("SELECT * FROM products WHERE item_id = " + itemID, function(
    err,
    res
  ) {
    if (err) throw err;
    const itemPrice = res[0].price;
    const stock_quantity = res[0].stock_quantity;
    const new_stock_quantity = stock_quantity - itemQuantity;
    if (new_stock_quantity <= 0) {
      console.log("\nWe don't have that many items to sell, sorry!");
      currentItems();
    } else {
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
          const totalCost = itemPrice * itemQuantity;
          console.log("\nYou just bought " + itemQuantity + " items!");
          console.log("Total cost: $" + totalCost + "\n");
          currentItems();
        }
      );
    }
  });
}
