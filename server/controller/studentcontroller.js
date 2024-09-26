const mysql = require("mysql2");

// MySQL connection pool
const con = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

// View all records
exports.view = (req, res) => {
    // Check database connection
    con.getConnection((err, connection) => {
        if (err) throw err;
        connection.query("SELECT * FROM crud_node", (err, rows) => {
            connection.release();
            if (!err) {
                console.log("Good");
                res.render("home", { rows });
            } else {
                console.error("Error in Listing Data:", err);
                res.render("home", { msg: "Error fetching data" });
            }
        });
    });
};

// Render add user form
exports.adduser = (req, res) => {
    res.render('adduser');
};

// Save a new user
exports.save = (req, res) => {
    // Check database connection
    con.getConnection((err, connection) => {
        if (err) throw err;

        const { name, age, city } = req.body;

        // Validate age as a number
        if (isNaN(age)) {
            return res.render('adduser', { msg: "Invalid age, must be a number" });
        }

        connection.query("INSERT INTO crud_node (NAME, AGE, CITY) VALUES (?, ?, ?)", [name, age, city], (err, rows) => {
            connection.release();
            if (!err) {
                res.render('adduser', { msg: "User Details Added Successfully" });
            } else {
                console.error("Error in Adding Data:", err);
                res.render('adduser', { msg: "Error adding user" });
            }
        });
    });
};

// Render edit user form
exports.edituser = (req, res) => {
    // Check database connection
    con.getConnection((err, connection) => {
        if (err) throw err;

        // Get ID from URL
        const id = req.params.id;
        connection.query("SELECT * FROM crud_node WHERE ID = ?", [id], (err, rows) => {
            connection.release();
            if (!err) {
                res.render("edituser", { rows });
            } else {
                console.error("Error in Fetching Data:", err);
                res.render('edituser', { msg: "Error fetching user data" });
            }
        });
    });
};

// Update user details
exports.edit = (req, res) => {
    // Check database connection
    con.getConnection((err, connection) => {
        if (err) throw err;

        const id = req.params.id;
        const { name, age, city } = req.body;

        // Validate age as a number
        if (isNaN(age)) {
            return res.render('edituser', { msg: "Invalid age, must be a number" });
        }

        connection.query("UPDATE crud_node SET NAME = ?, AGE = ?, CITY = ? WHERE ID = ?", [name, age, city, id], (err, rows) => {
            connection.release();
            if (!err) {

                con.getConnection((err, connection) => {
                    if (err) throw err;
            
                    // Get ID from URL
                    const id = req.params.id;
                    connection.query("SELECT * FROM crud_node WHERE ID = ?", [id], (err, rows) => {
                        connection.release();
                        if (!err) {
                            res.render("edituser", { rows , msg: "User Details Updated Successfully"});
                        } else {
                            console.error("Error in Fetching Data:", err);
                            res.render('edituser', { msg: "Error fetching user data" });
                        }
                    });
                });
               
            } else {
                console.error("Error in Updating Data:", err);
                res.render('edituser', { msg: "Error updating user" });
            }
        });
    });
};

exports.deleteuser=(req,res) => {
    con.getConnection((err,connection) => {
        if(err) throw err
        //get id from url
        let id = req.params.id;

        connection.query("delete from crud_node where id=?",[id],(err,rows) => {
            connection.release();
            if(!err){
                res.redirect("/")
            }
            else{
                console.log(err);
            }
        });
    })
}