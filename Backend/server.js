const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const app = express();
var bodyParser = require('body-parser');
var router = express.Router();
const connection = require('./config/dbconnect.js')
const { authJwt } = require("../Backend/middleware");
const fs = require('fs');
const config = require("./config/auth.config.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
var CryptoJS = require("crypto-js");
const ExcelJS = require('exceljs');
const Razorpay = require('razorpay');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.use(express.urlencoded({ extended: true }));
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const { v4: uuidv4 } = require('uuid');

app.use(cors({
  credentials: true,
  origin: ["http://localhost:4200"], //Frontend site http://ec2-3-110-173-239.ap-south-1.compute.amazonaws.com
}));

//database
const db = require("./models");
const authConfig = require("./config/auth.config");
const dbConfig = require("./config/db.config");
const Role = db.role;
const Route = db.route;
const http = require('http');

db.sequelize.sync().then(() => {
});

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "Shuttle-session",
    secret: "COOKIE_SECRET", // should use as secret environment variable
    httpOnly: true
  })
);

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Shuttle Services." });
});

//rouetes
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.create({
    id: 1,
    name: "user"
  });
 
  Role.create({
    id: 2,
    name: "moderator"
  });
 
  Role.create({
    id: 3,
    name: "admin"
  });

  Role.create({
    id: 4,
    name: "locator"
  });

  Role.create({
    id: 5,
    name: "superadmin"
  });
}

// Define API endpoints
app.post('/buspage', [authJwt.verifyToken], (req, res) => {
  const user = req.body;

  // First, insert data into the busdetails table
  connection.query('INSERT INTO busdetails SET ?', user, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal Server Error' });
      return;
    }

    // Check if the busRoute exists in the station table
    connection.query(
      'SELECT * FROM stations WHERE routeName = ?',
      [user.busRoute],
      (err, stations) => {
        if (err) {
          console.error(err);
          res.status(500).json({ message: 'Internal Server Error' });
          return;
        }

        if (stations.length === 0) {
          // Route doesn't exist in the station table, handle accordingly
          res.status(404).json({ message: 'Route not found in the station table' });
          return;
        }

        // Check if records for the same busName already exist in stationstatus
        connection.query(
          'SELECT * FROM stationstatus WHERE  routeName = ? AND busName = ?',
          [user.busRoute,user.busName],
          (err, existingRecords) => {
            if (err) {
              console.error(err);
              res.status(500).json({ message: 'Internal Server Error' });
              return;
            }

            // If no records with the same busName exist, insert new records
            if (existingRecords.length === 0) {
              const routeName = user.busRoute;
              const busName = user.busName;

              const insertData = stations.map((station) => [
                routeName,
                busName,
                'notPassed',
                station.station,
                station.stationNo,
                station.latitude,
                station.longitude
              ]);

              connection.query('INSERT INTO stationstatus (routeName, busName, stationPassed, stations, stationNo, latitude, longitude) VALUES ?', [insertData], (err, result) => {
                if (err) {
                  console.error(err);
                  res.status(500).json({ message: 'Internal Server Error' });
                  return;
                }

                res.status(200).json({ message: 'Created Successfully' });
              });
            } else {
              // Records with the same busName already exist, handle accordingly
              res.status(409).json({ message: 'Records already exist for this busName' });
            }
          }
        );
      }
    );
  });
});

app.get('/buspage', [authJwt.verifyToken], (req, res) => {
  connection.query('SELECT * FROM busdetails', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.put('/buspage/:id', [authJwt.verifyToken], (req, res) => {
  const id = req.params.id;
  const user = req.body;
  connection.query('UPDATE busdetails SET ? WHERE id = ?', [user, id], (err, result) => {
    if (err) throw err;
    res.status(200).json({ message: 'Updated Successfully' });  });
});

app.delete('/buspage/:id', [authJwt.verifyToken], (req, res) => {
  const id = req.params.id;
  connection.query('DELETE FROM busdetails WHERE id = ?', id, (err, result) => {
    if (err) throw err;
    res.status(200).json({ message: 'Deleted Successfully' });  });
});

app.get('/routes', [authJwt.verifyToken], (req, res) => {
  connection.query('SELECT * FROM busroute', (err, results) => {
    if (err) throw err;
    res.json(results);
});
});


app.get('/buses', [authJwt.verifyToken], (req, res) => {
  // Assume you have an array of bus objects
  const route = req.query.route;
  let query = 'SELECT * FROM busdetails';
  if (route) {
    query += ` WHERE available = 'true' AND busRoute = '${route}' `;
  }
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching buses from MySQL:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.json(results);
  });
});

app.get('/seats', [authJwt.verifyToken], (req, res) => {
  // Assume you have an array of bus objects
  const id = req.query.id;
  let query = 'SELECT * FROM busdetails';
  if (id) {
    query += ` WHERE id = '${id}'`;
  }
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching buses from MySQL:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.json(results);
  });
});

app.get('/stations', [authJwt.verifyToken], (req, res) => {
  // Assume you have an array of bus objects
  const route = req.query.route;
  let query = 'SELECT * FROM stations';
  if (route) {
    query += ` WHERE routeName = '${route}'`;
  }
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching buses from MySQL:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.json(results);
  });
});

app.post('/bookticket', [authJwt.verifyToken], async (req, res) => {
  try {
    const {
      ticketId,
      timestamp,
      route,
      busId,
      pickUp,
      dropPoint,
      totalseats,
      totalDistance,
      finalfare,
      userId,
      busType,
      verificationStatus,
      PaymentType
    } = req.body;

    // Insert the ticket data into the MySQL database
    await connection.query(
      'INSERT INTO tickets (TicketID, Timestamp, SelectedRoute, SelectedBusID, SelectedPickUpPoint, SelectedDropPoint, TotalSeats, TotalDistance, Fare, userId, busType, verificationStatus,PaymentType) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?)',
      [
        ticketId,
        timestamp,
        route,
        busId,
        pickUp,
        dropPoint,
        totalseats,
        totalDistance,
        finalfare,
        userId,
        busType,
        verificationStatus,
        PaymentType
        
      ]
    );

    

    res.status(200).json({ message: 'Ticket booked successfully' });
  } catch (error) {
    console.error('Error booking ticket:', error);
    res.status(500).json({ error: 'An error occurred while booking the ticket' });
  }
});



app.get('/users/:userId/tickets',[authJwt.verifyToken], (req, res) => {
  const userId = req.params.userId;

  // Fetch user tickets from the database
  const query = `SELECT * FROM tickets WHERE userId = ?`;
  connection.query(query, [userId], (error, results) => {
    if (error) {
      console.error('Error fetching tickets:', error);
      res.status(500).json({ error: 'Failed to fetch tickets' });
    } else {
      res.json(results);
    }
  });
});


app.get('/userlist', [authJwt.verifyToken], (req, res) => {
  connection.query('SELECT * FROM users', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});


app.get('/dashboardUser/counts', [authJwt.verifyToken], (req, res) => {
  const query = 'SELECT COUNT(*) as totalCount FROM users';

  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error retrieving count:', error);
      res.status(500).json({ error: 'An error occurred while retrieving count' });
    } else {
      const totalCount = results[0].totalCount;
      res.json({ totalCount });
    }
  });
});


app.get('/dashboardBus/counts', [authJwt.verifyToken], (req, res) => {
  const query = 'SELECT COUNT(*) as totalCount FROM busdetails';

  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error retrieving count:', error);
      res.status(500).json({ error: 'An error occurred while retrieving count' });
    } else {
      const totalCount = results[0].totalCount;
      res.json({ totalCount });
    }
  });
});


app.get('/dashboardRoutes/counts', [authJwt.verifyToken], (req, res) => {
  const query = 'SELECT COUNT(*) as totalCount FROM busroute';

  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error retrieving count:', error);
      res.status(500).json({ error: 'An error occurred while retrieving count' });
    } else {
      const totalCount = results[0].totalCount;
      res.json({ totalCount });
    }
  });
});


app.get('/dashboardStations/counts', [authJwt.verifyToken], (req, res) => {
  const query = 'SELECT COUNT(*) as totalCount FROM stations';

  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error retrieving count:', error);
      res.status(500).json({ error: 'An error occurred while retrieving count' });
    } else {
      const totalCount = results[0].totalCount;
      res.json({ totalCount });
    }
  });
});


app.delete('/deleteusers/:id', [authJwt.verifyToken],  (req, res) => {
  const userId = parseInt(req.params.id);

  connection.query('DELETE FROM users WHERE id = ?', [userId], (err, result) => {
    if (err) {
      console.error('Error deleting user from MySQL:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Delete user roles
    connection.query('DELETE FROM user_roles WHERE userId = ?', [userId], (err, result) => {
      if (err) {
        console.error('Error deleting user roles from MySQL:', err);
        return res.status(500).json({ message: 'Internal server error' });
      }

    return res.status(204).end();
  });
  });
});


app.get('/stationlist', [authJwt.verifyToken], (req, res) => {
  connection.query('SELECT * FROM stations', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.delete('/deletestation/:station', [authJwt.verifyToken], (req, res) => {
  const station = req.params.station;

  const deleteStationQuery = 'DELETE FROM stations WHERE station = ?';
  connection.query(deleteStationQuery, [station], (err, result) => {
    if (err) {
      console.error('Error deleting station from MySQL:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Station not found' });
    }

      return res.status(204).end();
    });
  });

  app.post('/addstation', [authJwt.verifyToken], (req, res) => {
    const { busRoute, station, Km,latitude, longitude, stationNo  } = req.body;
  
    // Perform the MySQL insert query
    const sql = 'INSERT INTO stations (station, Km, routeName, latitude, longitude, stationNo) VALUES (?, ?, ?,?,?,?)';
    connection.query(sql, [station, Km, busRoute, latitude, longitude, stationNo], (err, result) => {
      if (err) {
        console.error('Error executing MySQL query:', err);
        res.status(500).json({ error: 'Failed to insert data into the database' });
        return;
      }
  
      console.log('Data inserted successfully');
      res.json({ success: true });
    });
  });

  app.get('/routelist', [authJwt.verifyToken], (req, res) => {
    connection.query('SELECT * FROM busroute', (err, results) => {
      if (err) throw err;
      res.json(results);
    });
  });

  
app.delete('/deleteroute/:routeName', [authJwt.verifyToken], (req, res) => {
  const route = req.params.routeName;

  const deleteRouteQuery = 'DELETE FROM busroute WHERE routeName = ?';
  connection.query(deleteRouteQuery, [route], (err, result) => {
    if (err) {
      console.error('Error deleting station from MySQL:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Station not found' });
    }

      return res.status(204).end();
    });
  });

  app.post('/addroute', [authJwt.verifyToken], (req, res) => {
    const { routeName } = req.body;
  
    // Perform the MySQL insert query
    const sql = 'INSERT INTO busroute (routeName) VALUES (?)';
    connection.query(sql, [routeName], (err, result) => {
      if (err) {
        console.error('Error executing MySQL query:', err);
        res.status(500).json({ error: 'Failed to insert data into the database' });
        return;
      }
  
      console.log('Data inserted successfully');
      res.json({ success: true });
    });
  });


  app.post('/verifyticket', [authJwt.verifyToken], (req, res) => {
    const qrdata = req.body.ticket;
    const ticketTimestamp = qrdata.ticketTimestamp;
    const ticketId = qrdata.ticketId;
    const totalSeats = qrdata.totalSeats;
  
    const checkQuery = 'SELECT * FROM verifiedticket WHERE TicketID = ?';
    connection.query(checkQuery, [ticketId], (checkError, checkResults) => {
      if (checkError) {
        console.error('Error checking ticket in MySQL database:', checkError);
        res.status(500).json({ message: 'Error checking ticket in MySQL database' });
      } else {
        if (checkResults.length > 0) {
          // Ticket already exists, return an error
          console.log('Ticket already registered:', ticketId);
          res.status(200).json({ message: 'Ticket already registered' });
        } else {
          // Ticket doesn't exist, proceed with registration
          const insertQuery = 'INSERT INTO verifiedticket (TicketID, Timestamp, TotalSeats) VALUES (?, ?, ?)';
          const values = [ticketId, ticketTimestamp, totalSeats];
          
  
          connection.query(insertQuery, values, (insertError, insertResults) => {
            if (insertError) {
              console.error('Error saving ticket to MySQL database:', insertError);
              res.status(500).json({ message: 'Error saving ticket to MySQL database' });
            } else {
              console.log('Ticket saved to MySQL database');
               // Update the verificationStatus in the tickets table
            const updateQuery = 'UPDATE tickets SET verificationStatus = ?, refundStatus = ? WHERE TicketID = ?';
            const updateValues = ['Verified','not-applicable', ticketId];

            connection.query(updateQuery, updateValues, (updateError, updateResults) => {
              if (updateError) {
                console.error('Error updating verification status in MySQL database:', updateError);
                res.status(500).json({ message: 'Error updating verification status in MySQL database' });
              } else {
                console.log('Verification status updated in the tickets table');
                const ticket = {
                  ticketId: ticketId,
                  ticketTimestamp: ticketTimestamp,
                  valid: true // Indicate ticket validity based on your business logic
                };
                res.status(200).json({ ticket: ticket });
              }
            });
          }
        });
      }
    }
  });
});


  app.get('/getverifiedticket', [authJwt.verifyToken],(req, res) => {
    connection.query('SELECT * FROM verifiedticket', (err, results) => {
      if (err) throw err;
      res.json(results);
    });
  });


  app.put('/verifyticketsManual/:id', [authJwt.verifyToken],(req, res) => {
    const ticketId = req.params.id;
    console.log(ticketId);
    
    // Update the ticket's verification status in the database
    const updateQuery = 'UPDATE tickets SET verificationStatus = ? WHERE TicketID = ?';
    const updateValues = ['Verified', ticketId];

    connection.query(updateQuery, updateValues, (updateError, updateResults) => {
      if (updateError) {
        console.error('Error updating verification status in MySQL database:', updateError);
        res.status(500).json({ message: 'Error updating verification status in MySQL database' });
      } else {
        console.log('Verification status updated in the tickets table');
      }
    });
});


app.get('/ticketbuslist', [authJwt.verifyToken],(req, res) => {
  connection.query('SELECT * FROM busdetails', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.get('/allticketlist', [authJwt.verifyToken],(req, res) => {
  connection.query('SELECT * FROM tickets', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.get('/signuptoken', (req, res) => {
  // encryption
  const encryptAES = (text, key) => {
    const encrypted = CryptoJS.AES.encrypt(text, key).toString();
    return encrypted;
  };

  const encryptedToken = encryptAES("signuptoken", config.secret);

  res.json({ token: encryptedToken });
});


app.post('/changepassword',[authJwt.verifyToken], (req, res) => {
  const { currentPassword, newPassword, userId } = req.body;

  // Get the user's old password from the database
  const selectQuery = `SELECT password FROM users WHERE id = ?`;

  connection.query(selectQuery, [userId], (err, results) => {
    if (err) {
      console.error('Error:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }

    if (results.length === 0) {
      return res.status(400).json({ message: 'User not found' });
    }

    const oldPassword = results[0].password;

    // Validate the current password
    bcrypt.compare(currentPassword, oldPassword, (err, passwordIsValid) => {
      if (err) {
        console.error('Error:', err);
        return res.status(500).json({ message: 'Internal server error' });
      }

      if (!passwordIsValid) {
        return res.status(400).json({ message: 'Incorrect current password' });
      }

      // Hash the new password
      const hashedPassword = bcrypt.hashSync(newPassword, 10);

      // Update the password in the database
      const updateQuery = `UPDATE users SET password = ? WHERE id = ?`;

      connection.query(updateQuery, [hashedPassword, userId], (err, results) => {
        if (err) {
          console.error('Error:', err);
          return res.status(500).json({ message: 'Internal server error' });
        }

        res.status(200).json({ message: 'Password changed successfully' });
      });
    });
  });
});

  app.post('/updatePaymentStatus',[authJwt.verifyToken], (req, res) => {
    const { ticketId, paymentId, paymentStatus,refundStatus } = req.body;
    console.log(paymentStatus);
    // Update the payment status in the database
    const updatePaymentQuery = 'UPDATE tickets SET PaymentStatus = ?, refundStatus = ?, paymentId = ? WHERE TicketID = ?';
    connection.query(updatePaymentQuery, [paymentStatus,refundStatus,paymentId, ticketId], (error, results) => {
      if (error) {
        console.error('Error updating payment status:', error);
        res.status(500).json({ error: 'Failed to update payment status in the database' });
      } else {
        console.log('Payment status updated successfully in the database.');
        res.status(200).json({ message: 'Payment status updated successfully' });
      }
    });
  });


      // Creating Razorpay order with the fetched fare as the amount
const instance = new Razorpay({ key_id: 'rzp_test_396sVNGGUfkuAL', key_secret: 'T6BHLQWa6CohKMXf6utk6fIS' });

app.post('/razorpayorder',[authJwt.verifyToken], async (req, res) => {
  const { ticketId } = req.body;
  
  try {
    // Fetch the fare from MySQL based on the ticketId
    connection.query('SELECT Fare FROM tickets WHERE TicketID = ?', [ticketId], (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Something went wrong while fetching the fare.' });
      }

      if (!results || results.length === 0) {
        return res.status(404).json({ error: 'Ticket not found or fare is not available.' });
      }

      const fare = results[0]?.Fare;
     

      if (fare === undefined) {
        return res.status(500).json({ error: 'Fare data is missing in the database or has an incorrect property name.' });
      }

      
      const instance = new Razorpay({ key_id: 'rzp_test_396sVNGGUfkuAL', key_secret: 'T6BHLQWa6CohKMXf6utk6fIS' });

      var options = {
        amount: fare * 100, // amount in the smallest currency unit, assuming fare is in INR
        currency: "INR",
        receipt: `Order_${Date.now()}`,
        payment_capture: true,
      };
      

      instance.orders.create(options, function(err, order) {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Something went wrong while creating the order.' });
        }

        // Sending the order ID to the frontend
        res.json({ orderId: order.id });
        
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong while processing the request.' });
  }
});

app.get('/graphtickets/:userId',[authJwt.verifyToken], (req, res) => {
  const userId = req.params.userId;
  const query = 'SELECT DATE_FORMAT(STR_TO_DATE(Timestamp, "%c/%e/%Y, %h:%i:%s %p"), "%Y-%m") AS ticketMonth, COUNT(TicketID) AS ticketCount FROM tickets WHERE userId = ? GROUP BY ticketMonth';
  connection.query(query, [userId], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Error fetching data from the database' });
    } else {
      res.json(result);
    }
  });
});

app.get('/getgraphTickets/:userid',[authJwt.verifyToken], (req, res) => {
  const { userid } = req.params;

  const query = 'SELECT Count(TicketID) AS total_tickets FROM tickets WHERE userid = ? AND PaymentStatus = "successful"';

  connection.query(query, [userid], (err, result) => {
    if (err) {
      console.error('Error querying the database: ', err);
      res.status(500).json({ error: 'Error querying the database' });
    } else {
      const totalTickets = result[0].total_tickets || 0;
      res.json({ totalTickets });
    }
  });
});



app.get('/getTotalFare/:userid',[authJwt.verifyToken], (req, res) => {
  const { userid } = req.params;

  const query = 'SELECT SUM(Fare) AS total_fare FROM tickets WHERE userid = ? AND PaymentStatus = "successful"';

  connection.query(query, [userid], (err, result) => {
    if (err) {
      console.error('Error querying the database: ', err);
      res.status(500).json({ error: 'Error querying the database' });
    } else {
      const totalFare = result[0].total_fare || 0;
      res.json({ totalFare });
    }
  });
});



app.get('/export-excel', (req, res) => {
  const selectedDate = req.query.date;
// Split the string into day, month, and year parts
const month = selectedDate.substr(0, 2);
const day = selectedDate.substr(2, 2);
const year = selectedDate.substr(4);

// Construct a new date object in the desired format
const formattedDate = new Date(`${year}-${month}-${day}`);
const formattedDateString = `${formattedDate.getMonth() + 1}/${formattedDate.getDate()}/${formattedDate.getFullYear()}`;
  
  
  connection.query('SELECT * FROM tickets WHERE Timestamp = ? AND refundStatus = ? AND verificationStatus = ?', [formattedDateString, 'applicable', 'Not-verified'], (error, results) => {
    if (error) {
      console.error('Error fetching data:', error);
      return res.status(500).send('Error fetching data');
    }

    // Create a new Excel workbook and worksheet
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Ticket Data');

    // Add data to the worksheet
    worksheet.columns = [
      // Define your column headers here
      { header: 'TicketID', key: 'TicketID', width: 50 },
      { header: 'Timestamp (MM/DD/YYYY)', key: 'Timestamp', width: 30 },
      { header: 'verificationStatus', key: 'verificationStatus', width: 20 },
      { header: 'PaymentStatus', key: 'PaymentStatus', width: 20 },
      { header: 'refundStatus', key: 'refundStatus', width: 20 },
      { header: 'Fare', key: 'Fare', width: 20 },
      { header: 'paymentId', key: 'paymentId', width: 50 },
      { header: 'PaymentType', key: 'PaymentType', width: 20 },
      { header: 'userId', key: 'userId', width: 30 },

      

      // Add more columns as needed
    ];

    results.forEach(row => {
      // Convert MySQL date format '8/5/2023, 5:43:29 PM' to '2023-08-07'
      const originalDate = new Date(row.Timestamp);
      const formattedDate = `${originalDate.getMonth() + 1}/${originalDate.getDate()}/${originalDate.getFullYear()}`;
      
      worksheet.addRow({ ...row, Timestamp: formattedDate });
    });

    // Generate the Excel file and send it as a response
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader(
      'Content-Disposition',
      'attachment; filename=' + 'ticket_data.xlsx'
    );
    workbook.xlsx.write(res).then(() => {
      res.end();
    });
  });
});


app.post('/uploadExcel', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded.' });
    }

    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(req.file.path);

    const worksheet = workbook.worksheets[0];
    const refundData = [];

    let isFirstRow = true;

    worksheet.eachRow((row) => {
      if (isFirstRow) {
        isFirstRow = false;
        return; // Skip processing the first row
      }

      refundData.push({
        PaymentType: row.getCell(8).value,
        paymentId: row.getCell(7).value,
        refundAmount: row.getCell(6).value,
        userId: row.getCell(9).value,
        TicketID: row.getCell(1).value
      });
    });

    // Initiate refund API calls for each entry in refundData
    const refundResults = [];

    for (const item of refundData) {
      try {
        if (item.PaymentType === 'Wallet') {
          // Handle wallet refund
          await updateWalletBalance(item.userId, item.refundAmount, item.TicketID, res);
        } else {
          // Handle other payment types (e.g., online payments)
          const refund = await initiateRefund(item.paymentId, item.refundAmount);

          // Update status in the database on successful refund
          if (refund.id) {
            updateStatusInDatabase(item.paymentId, refund.id);
          }

          refundResults.push({ paymentId: item.paymentId, refundId: refund.id, "status": "successful" });
        }
      } catch (error) {
        console.error(error);
        refundResults.push({ paymentId: item.paymentId, error: 'Refund failed' });
      }
    }

    res.json({ refundResults });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong while processing the file.' });
  }
});

async function updateWalletBalance(userId, refundAmount, TicketID, res) {
  // Update the wallet balance in the database
  // Check if the user exists in the wallet table
  const checkUserSql = 'SELECT * FROM wallet WHERE userID = ?';
  const checkUserValues = [userId];

  connection.query(checkUserSql, checkUserValues, (checkUserErr, checkUserResult) => {
    if (checkUserErr) {
      console.error('Failed to check user:', checkUserErr);
      return res.status(500).json({ error: 'Failed to check user' }); // Send the response and return
    }

    if (checkUserResult.length > 0) {
      // User exists, update the balance by adding the amount
      const existingBalance = parseFloat(checkUserResult[0].Balance);
      const updatedBalance = existingBalance + parseFloat(refundAmount);

      // Update the balance for the existing user
      const updateBalanceSql = 'UPDATE wallet SET Balance = ? WHERE userID = ?';
      const updateBalanceValues = [updatedBalance, userId];
       
      // Define the query for updating transaction status
      const updatetransactionstatus = `UPDATE tickets SET verificationStatus = 'Refunded', PaymentStatus = 'Refunded', refundStatus = 'Refunded' WHERE TicketID = '${TicketID}'`;

      // Execute both queries
      connection.query(updateBalanceSql, updateBalanceValues, (updateErr, updateResult) => {
        if (updateErr) {
          console.error('Failed to update balance:', updateErr);
          return res.status(500).json({ error: 'Failed to update balance' }); // Send the response and return
        }

        // Execute the transaction status update query
        connection.query(updatetransactionstatus, (transactionStatusErr, transactionStatusResult) => {
          if (transactionStatusErr) {
            console.error('Failed to update transaction status:', transactionStatusErr);
            return res.status(500).json({ error: 'Failed to update transaction status' }); // Send the response and return
          }

          
        });
      });
    } else {
      // Handle the case where the user does not exist in the wallet table
      // You can insert a new user here if needed
    }
  });
}

async function initiateRefund(paymentId, refundAmount) {
  return new Promise((resolve, reject) => {
    instance.payments.refund(paymentId, {
      amount: refundAmount * 100,
      speed: 'normal',
      receipt: `Refund_${Date.now()}`
    }, (err, refund) => {
      if (err) {
        reject(err);
      } else {
        resolve(refund);
      }
    });
  });
}

function updateStatusInDatabase(paymentId, refundId) {
  const query = `UPDATE tickets SET PaymentStatus = 'Refunded', refundStatus = 'Refunded', verificationStatus = 'Refunded', refund_id = '${refundId}' WHERE paymentId = '${paymentId}'`;

  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error updating status in database:', error);
    } else {
      console.log('Status updated in database:');
    }
  });
}


app.post('/helpticketuser', async (req, res) => {
  try {
    const { name, email,issue_type, issue_description } = req.body;
    const ticketId = uuidv4(); // Generate a unique ticket ID
    console.log(name,email,issue_description);
    

    await connection.query(
      'INSERT INTO helpchat (ticket_id,name,email,issue_type,issue_description,status) VALUES (?, ?,?, ?, ?,?)',
      [ticketId, name, email,issue_type, issue_description,'Open']
    );

    res.json({ ticketId });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred while submitting the ticket.' });
  }
});

app.get('/get-ticket/:ticketId', (req, res) => {
  connection.query('SELECT * FROM helpchat WHERE ticket_id = ?', [req.params.ticketId], (error, rows) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ error: 'Ticket not found' });
    }
  });
});

// API to get comments for a ticket
app.get('/get-comments/:ticketId', (req, res) => {
  connection.query('SELECT * FROM comments WHERE ticket_id = ?', [req.params.ticketId], (error, rows) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }

    res.json(rows);
  });
});


app.post('/add-comment', (req, res) => {
  const { ticketId, commentText } = req.body;
  if (!ticketId || !commentText) {
    return res.status(400).json({ error: 'Ticket ID and comment text are required' });
  }

  connection.query('INSERT INTO comments (ticket_id, comment) VALUES (?, ?)', [ticketId, commentText], (error) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }

    res.json({ message: 'Comment added successfully' });
  });
});


app.get('/helpticketlist', (req, res) => {
  connection.query('SELECT * FROM helpchat', (error, results) => {
    if (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'An error occurred while fetching help tickets.' });
    } else {
      res.json(results);
    }
  });
});


app.post('/update-location', (req, res) => {
  const { latitude, longitude, username } = req.body;

  console.log(latitude, longitude, username);

  // Check if the username exists in the table
  const selectSql = 'SELECT COUNT(*) AS count FROM bus_locations WHERE username = ?';
  connection.query(selectSql, [username], (selectErr, selectResult) => {
    if (selectErr) {
      console.error('Error checking username:', selectErr);
      res.status(500).json({ message: 'Error checking username' });
    } else {
      const recordCount = selectResult[0].count;
      if (recordCount > 0) {
        // Update the location
        const updateSql = 'UPDATE bus_locations SET latitude=?, longitude=? WHERE username=?';
        connection.query(updateSql, [latitude, longitude, username], (updateErr, updateResult) => {
          if (updateErr) {
            console.error('Error updating location:', updateErr);
            res.status(500).json({ message: 'Error updating location' });
          } else {
            
            res.status(200).json({ message: 'Location updated successfully' });
          }
        });
      } else {
        // Insert the location
        const insertSql = 'INSERT INTO bus_locations (username, latitude, longitude) VALUES (?, ?, ?)';
        connection.query(insertSql, [username, latitude, longitude], (insertErr, insertResult) => {
          if (insertErr) {
            console.error('Error inserting location:', insertErr);
            res.status(500).json({ message: 'Error inserting location' });
          } else {
            
            res.status(200).json({ message: 'Location inserted successfully' });
          }
        });
      }
    }
  });
});

app.get('/bus-location/:busName', (req, res) => {
  const busName = req.params.busName;
  connection.query('SELECT * FROM bus_locations WHERE username = ?', [busName], (error, results) => {
    if (error) {
      console.error('Error querying MySQL:', error);
      res.status(500).json({ error: 'Error fetching bus location' });
      return;
    }

    if (results.length > 0) {
      res.json(results[0]);
    } else {
      res.status(404).json({ error: 'Bus not found' });
    }
  });
});

app.get('/bus-locations', (req, res) => {
  connection.query('SELECT * FROM bus_locations', (error, results) => {
    if (error) {
      console.error('Error querying MySQL:', error);
      res.status(500).json({ error: 'Error fetching bus locations' });
    } else {
      res.json(results);
    }
  });
});

const queryAsync = (connection, query, values) => {
  return new Promise((resolve, reject) => {
    connection.query(query, values, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

app.get('/getTicketStats', (req, res) => {
  const query = `
    SELECT
      SUM(CASE WHEN verificationStatus = 'Verified' THEN 1 ELSE 0 END) AS verifiedTickets,
      SUM(CASE WHEN PaymentStatus = 'failed' THEN 1 ELSE 0 END) AS failedTickets,
      SUM(CASE WHEN refundStatus = 'Refunded' THEN 1 ELSE 0 END) AS refundedTickets
    FROM tickets
  `;

  // Assuming you have an existing 'connection' object
  queryAsync(connection, query, []).then((ticketStats) => {
    res.json(ticketStats);
  }).catch((err) => {
    console.error('Error executing the query:', err);
    res.status(500).json({ error: 'An error occurred while fetching ticket statistics' });
  });
});


app.post('/onlyusersignup', async (req, res) => {
  try {
    // Assuming you have a variable `userRole` representing the user's role
    const { roles } = req.body;
    userRole =roles;
    const BASE_URL = 'localhost'; // Replace with the actual hostname

    // Check if the user has the 'user' role
    if (userRole === 'user') {
      // Forward the request data to the /api/auth/signup endpoint
      const { username, email, password, phone } = req.body;

      // Make a request to retrieve the token
      const tokenRequest = http.request(
        {
          hostname: BASE_URL,
          port: 3000, // Replace with the actual port
          path: '/signuptoken', // Replace with the actual path
          method: 'GET',
        },
        (tokenResponse) => {
          let tokenData = '';

          tokenResponse.on('data', (chunk) => {
            tokenData += chunk;
          });

          tokenResponse.on('end', () => {
            try {
              const token = JSON.parse(tokenData).token;
             

              // Define the data to be sent
              const postData = JSON.stringify({ username, email, password, phone });

              // Define the options for the request
              const signupRequest = http.request(
                {
                  hostname: BASE_URL,
                  port: 3000, // Replace with the actual port
                  path: '/api/auth/signup', // Replace with the actual path
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': postData.length,
                    'x-access-signuptoken': `Bearer ${token}`, // Include the retrieved token in the headers
                  },
                },
                (signupResponse) => {
                  let responseData = '';

                  signupResponse.on('data', (chunk) => {
                    responseData += chunk;
                  });

                  signupResponse.on('end', () => {
                    res.status(signupResponse.statusCode).json(JSON.parse(responseData));
                  });
                }
              );

              signupRequest.on('error', (error) => {
                res.status(500).send({ message: error.message });
              });

              // Send the request data
              signupRequest.write(postData);
              signupRequest.end();
            } catch (error) {
              res.status(500).send({ message: 'Invalid token response' });
            }
          });
        }
      );

      tokenRequest.on('error', (error) => {
        res.status(500).send({ message: error.message });
      });

      // Send the token request
      tokenRequest.end();
    } else {
      res.status(403).json({ message: 'Insufficient permissions' });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});



app.post('/customroleadduser', async (req, res) => {
  try {
    // Assuming you have a variable `userRole` representing the user's role
    const { currentrole } = req.body;
    userRole = currentrole;
    const BASE_URL = 'localhost'; // Replace with the actual hostname
    console.log(userRole);
    // Check if the user has the 'superadmin' role
    if (currentrole.includes('ROLE_SUPERADMIN')) {
      // Forward the request data to the /api/auth/signup endpoint
      const { username, email, password, phone, roles } = req.body;

      // Make a request to retrieve the token
      const tokenRequest = http.request(
        {
          hostname: BASE_URL,
          port: 3000, // Replace with the actual port
          path: '/signuptoken', // Replace with the actual path
          method: 'GET',
        },
        (tokenResponse) => {
          let tokenData = '';

          tokenResponse.on('data', (chunk) => {
            tokenData += chunk;
          });

          tokenResponse.on('end', () => {
            try {
              const token = JSON.parse(tokenData).token;
             

              // Define the data to be sent
              const postData = JSON.stringify({ username, email, password, phone, roles });

              // Define the options for the request
              const signupRequest = http.request(
                {
                  hostname: BASE_URL,
                  port: 3000, // Replace with the actual port
                  path: '/api/auth/signup', // Replace with the actual path
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': postData.length,
                    'x-access-signuptoken': `Bearer ${token}`, // Include the retrieved token in the headers
                  },
                },
                (signupResponse) => {
                  let responseData = '';

                  signupResponse.on('data', (chunk) => {
                    responseData += chunk;
                  });

                  signupResponse.on('end', () => {
                    res.status(signupResponse.statusCode).json(JSON.parse(responseData));
                  });
                }
              );

              signupRequest.on('error', (error) => {
                res.status(500).send({ message: error.message });
              });

              // Send the request data
              signupRequest.write(postData);
              signupRequest.end();
            } catch (error) {
              res.status(500).send({ message: 'Invalid token response' });
            }
          });
        }
      );

      tokenRequest.on('error', (error) => {
        res.status(500).send({ message: error.message });
      });

      // Send the token request
      tokenRequest.end();
    } else {
      res.status(403).json({ message: 'Insufficient permissions' });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});


app.post('/moneyorder', (req, res) => {
  const { transactionId, finalfare, userId } = req.body;

  if (!finalfare || finalfare <= 0 || !userId) {
    // Handle validation errors or missing data
    res.status(400).json({ error: 'Invalid request data' });
    return;
  }

  // Insert the wallet transaction into the database
  const sql = 'INSERT INTO wallet_transactions (transactionId, userId, amount) VALUES (?, ?, ?)';
  const values = [transactionId, userId, finalfare];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error('Failed to add money transaction:', err);
      res.status(500).json({ error: 'Failed to add money transaction' });
    } else {
      
      res.json({ message: 'Money added successfully', transactionId });
    }
  });
});


app.post('/walletordercreate', async (req, res) => {
  const { transactionId } = req.body;
  
  try {
    // Fetch the fare from MySQL based on the ticketId
    connection.query('SELECT amount FROM wallet_transactions WHERE transactionId = ?', [transactionId], (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Something went wrong while fetching the amount.' });
      }

      if (!results || results.length === 0) {
        return res.status(404).json({ error: 'Transaction not found or amount is not available.' });
      }

      const amount = results[0]?.amount;
     

      if (amount === undefined) {
        return res.status(500).json({ error: 'amount data is missing in the database or has an incorrect property name.' });
      }

      
      const instance = new Razorpay({ key_id: 'rzp_test_396sVNGGUfkuAL', key_secret: 'T6BHLQWa6CohKMXf6utk6fIS' });

      var options = {
        amount: amount * 100, // amount in the smallest currency unit, assuming fare is in INR
        currency: "INR",
        receipt: `Order_${Date.now()}`,
        payment_capture: true,
      };
      

      instance.orders.create(options, function(err, order) {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Something went wrong while creating the order.' });
        }

        // Sending the order ID to the frontend
        res.json({ orderId: order.id });
        
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong while processing the request.' });
  }
});




app.post('/userwallet', [authJwt.verifyToken], (req, res) => {
  const {transactionId, userID, amount, paymentStatus, paymentId, orderID } = req.body;

  // Insert the data into the wallet_transactions table
  const sql = 'INSERT INTO user_wallet (transactionId, userId, amount, paymentStatus, paymentId, orderId) VALUES (?, ?, ?,?,?,?)';
  const values = [transactionId, userID,amount ,paymentStatus,paymentId,orderID];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error('Failed to insert wallet transaction:', err);
      res.status(500).json({ error: 'Failed to insert wallet transaction' });
    } else {
      
      // Optionally, you can update the payment status or perform other actions here
      res.json({ message: 'Wallet transaction inserted successfully' });
    }
  });
});

app.post('/wallet', [authJwt.verifyToken], (req, res) => {
  const { userID, amount } = req.body;

  // Check if the user exists in the wallet table
  const checkUserSql = 'SELECT * FROM wallet WHERE userID = ?';
  const checkUserValues = [userID];

  connection.query(checkUserSql, checkUserValues, (checkUserErr, checkUserResult) => {
    if (checkUserErr) {
      console.error('Failed to check user:', checkUserErr);
      res.status(500).json({ error: 'Failed to check user' });
      return;
    }

    if (checkUserResult.length > 0) {
      // User exists, update the balance by adding the amount
      const existingBalance = parseFloat(checkUserResult[0].Balance); // Parse the existing balance as a float
      const updatedBalance = existingBalance + parseFloat(amount); // Parse the amount as a float

      // Update the balance for the existing user
      const updateBalanceSql = 'UPDATE wallet SET Balance = ? WHERE userID = ?';
      const updateBalanceValues = [updatedBalance, userID];

      connection.query(updateBalanceSql, updateBalanceValues, (updateErr, updateResult) => {
        if (updateErr) {
          console.error('Failed to update balance:', updateErr);
          res.status(500).json({ error: 'Failed to update balance' });
        } else {
          
          res.json({ message: 'Balance updated successfully' });
        }
      });
    } else {
      // User does not exist, create a new record
      const insertSql = 'INSERT INTO wallet (userID, Balance) VALUES (?, ?)';
      const insertValues = [userID, amount];

      connection.query(insertSql, insertValues, (insertErr, insertResult) => {
        if (insertErr) {
          console.error('Failed to create new record:', insertErr);
          res.status(500).json({ error: 'Failed to create new record' });
        } else {
          console.log('New record created successfully');
          res.json({ message: 'New record created successfully' });
        }
      });
    }
  });
});

app.get('/walletbalance/:userID', (req, res) => {
  const userID = req.params.userID;

  // Replace 'your_wallet_table' and 'your_user_id_column' with your actual table and column names
  const sql = 'SELECT Balance FROM wallet WHERE userID = ?';

  connection.query(sql, [userID], (err, result) => {
    if (err) {
      console.error('Failed to fetch wallet balance:', err);
      res.status(500).json({ error: 'Failed to fetch wallet balance' });
      return;
    }

    if (result.length > 0) {
      const balance = result[0].Balance;
      res.json({ balance });
    } else {
      // If the user does not exist in the wallet table, you can handle it accordingly
      res.status(404).json({ error: 'User not found' });
    }
  });
});

app.put('/updatewallet/:userID', (req, res) => {
  const userID = req.params.userID;
  const { newBalance } = req.body;

  // Replace 'your_wallet_table' and 'your_user_id_column' with your actual table and column names
  const updateSql = 'UPDATE wallet SET Balance = ? WHERE userID = ?';

  connection.query(updateSql, [newBalance, userID], (err, result) => {
    if (err) {
      console.error('Failed to update wallet balance:', err);
      res.status(500).json({ error: 'Failed to update wallet balance' });
      return;
    }

    if (result.affectedRows === 1) {
      res.json({ message: 'Wallet balance updated successfully' });
    } else {
      // If no rows were affected, it means the user does not exist in the wallet table
      res.status(404).json({ error: 'User not found' });
    }
  });
});


// Define the updateticketwallet route
app.post('/updateticketwallet', (req, res) => {
  const { ticketId, PaymentStatus, RefundStatus, PaymentId } = req.body;
  
  // Update the ticket status in the database
  const sql = `UPDATE tickets SET PaymentStatus = ?, RefundStatus = ?, PaymentId = ? WHERE ticketId = ?`;

  connection.query(sql, [PaymentStatus, RefundStatus, PaymentId, ticketId], (err, result) => {
    if (err) {
      console.error('Error updating ticket status:', err);
      res.status(500).json({ error: 'Error updating ticket status' });
    } else {
      res.status(200).json({ message: 'Ticket status updated successfully' });
    }
  });
});

app.post('/updatehelpticketstatus', (req, res) => {
  const { ticketId, status } = req.body;

  // Update the ticket status in the MySQL database
  connection.query('UPDATE helpchat SET status = ? WHERE ticket_id = ?', [status, ticketId], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Error updating ticket status' });
    } else {
      res.status(200).json({ message: 'Ticket status updated successfully' });
    }
  });
});


// Haversine formula to calculate distance between two sets of coordinates
function degreesToRadians(degrees) {
  return (degrees * Math.PI) / 180;
}

function calculateDistance(lat1, lon1, lat2, lon2) {
  const earthRadiusKm = 6371; // Radius of the Earth in kilometers
  lat1 = degreesToRadians(lat1);
  lon1 = degreesToRadians(lon1);
  lat2 = degreesToRadians(lat2);
  lon2 = degreesToRadians(lon2);

  const dLat = lat2 - lat1;
  const dLon = lon2 - lon1;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distanceKm = earthRadiusKm * c;
  const distanceMeters = distanceKm * 1000; // Convert to meters

  return distanceMeters;
}

app.post('/stationstatusupdate', (req, res) => {
  const { latitude, longitude, username, routeName } = req.body;
  console.log(`Bus Latitude: ${latitude}, Bus Longitude: ${longitude}`);

  // Fetch station details for the current bus name, ordered by stationNo
  connection.query(
    'SELECT * FROM stationstatus WHERE busName = ? AND routeName = ? ORDER BY stationNo ASC',
    [username, routeName],
    (err, stations) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
        return;
      }

      // Process station data and check distance for each station
      let insidearea = false;
      let prevStation = null; // Track the previous station

      for (const station of stations) {
        const stationLatitude = parseFloat(station.latitude); // Convert to float
        const stationLongitude = parseFloat(station.longitude); // Convert to float

        console.log("Station Latitude:", stationLatitude);
        console.log("Station Longitude:", stationLongitude);

        // Check if latitude and longitude values are valid numbers
        if (isNaN(stationLatitude) || isNaN(stationLongitude)) {
          console.error("Invalid latitude or longitude for station:", station.station);
          continue; // Skip this station and move to the next one
        }

        // Calculate the distance between bus location and station location
        const distance = calculateDistance(latitude, longitude, stationLatitude, stationLongitude);
        console.log("Distance:", distance);

        if (distance <= 30) {
          insidearea = true;
        } else {
          insidearea = false;
        }

        // If the station has already been passed, update the previous station
        if (station.stationPassed === 'passed') {
          prevStation = station;
        }

        // Check if the bus has left the previous station
        if (prevStation && prevStation.stationPassed === 'passed' && insidearea === false) {
          // Update the station status in the database
          connection.query(
            'UPDATE stationstatus SET stationPassed = ? WHERE stationNo = ? AND busName = ? AND routeName = ?',
            ['passed', prevStation.stationNo, username, routeName],
            (updateErr) => {
              if (updateErr) {
                console.error(updateErr);
                // Handle the update error
              }
            }
          );
          prevStation = null; // Reset the previous station
        }

        // Update stationPassed based on conditions
        if (insidearea === true && station.stationPassed !== 'passed') {
          // Update the station status in the database
          connection.query(
            'UPDATE stationstatus SET stationPassed = ? WHERE stationNo = ? AND busName = ? AND routeName = ?',
            ['passed', station.stationNo, username, routeName],
            (updateErr) => {
              if (updateErr) {
                console.error(updateErr);
                // Handle the update error
              }
            }
          );
        }
        
      }
      

      // Respond with appropriate messages
      res.status(200).json({ insidearea });
    }
  );
});

app.get('/get-station-status', (req, res) => {
  const currentBusName = req.query.busName; // Get the current bus name from the query parameter (adjust this as needed)
  const routeName = req.query.routeName;

  const query = 'SELECT * FROM stationstatus WHERE busName = ? AND routeName = ?';
  
  connection.query(query, [currentBusName,routeName], (err, results) => {
    if (err) {
      console.error('Error fetching station status:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    res.json(results);
  });
});

app.post('/resetcurrentroute', (req, res) => {
  const { busName, newRoute, previousRoute } = req.body;

  connection.query(
    'UPDATE busdetails SET available = "true" WHERE busName = ? AND busRoute = ?',
    [busName, newRoute],
    (err, result) => {
      if (err) {
        console.error('Error changing route:', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }

      // Update stationPassed for the new route
      connection.query(
        'UPDATE stationstatus SET stationPassed = "notPassed" WHERE busName = ? AND routeName = ?',
        [busName, newRoute],
        (err, result) => {
          if (err) {
            console.error('Error resetting stationPassed for new route:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
          }

          // Update busdeatils 
          connection.query(
            'UPDATE busdetails SET available = "false" WHERE busName = ? AND busRoute = ?',
            [busName, previousRoute],
            (err, result) => {
              if (err) {
                console.error('Error resetting stationPassed for previous route:', err);
                res.status(500).json({ error: 'Internal Server Error' });
                return;
              }

              res.status(200).json({ message: `Route changed for bus ${busName} to ${newRoute}` });
            }
          );
        }
      );
    }
  );
});


app.get('/getRouteNameForBus', (req, res) => {
  const { busName } = req.query;
  console.log(busName);
  // Assuming you have a 'buses' table with columns 'busName', 'routeName', and 'available'
  const sql = `SELECT busRoute FROM busdetails WHERE busName = ? AND available = 'true'`; // Assuming 1 represents "True" for availability

  connection.query(sql, [busName], (err, result) => {
    if (err) {
      console.error('Error retrieving routeName:', err);
      res.status(500).json({ error: 'Error retrieving routeName' });
    } else {
      if (result.length > 0) {
        const routeName = result[0].busRoute;
        res.status(200).json({ routeName });
        console.log(routeName);
      } else {
        res.status(404).json({ message: 'Bus not found or not available' });
      }
    }
  });
});



app.post('/sendprevioustroute', (req, res) => {
  const { busName, previousRoute } = req.body;

  // Update the stationPassed status in MySQL for the current bus and route
  connection.query(
    'UPDATE stationstatus SET stationPassed = ? WHERE busName = ? AND routeName = ?',
    ['notPassed', busName, previousRoute],
    (err, result) => {
      if (err) {
        console.error('Error updating station status:', err);
        res.status(500).json({ message: 'Internal Server Error' });
      } else {
        console.log('Station status updated successfully');
        res.status(200).json({ message: 'Station status updated successfully' });
      }
    }
  );
});


app.get('/getfilterstationstatus', (req, res) => {
  const route = req.query.route;
  const busName = req.query.busName;
  
  // Query the database to get station status based on the provided route
  const query = `SELECT * FROM stationstatus WHERE routeName = ? AND busName = ?`;
  connection.query(query, [route,busName], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(results);
    }
  });
});



// Define a route to fetch route stations by name
app.get('/getRouteStations', (req, res) => {
  const routeName = req.query.routeName;

  // Query the database to fetch stations for the given routeName
  connection.query(
    'SELECT station, latitude, longitude FROM stations WHERE routeName = ?',
    [routeName],
    (err, results) => {
      if (err) {
        console.error('Error fetching stations:', err);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        res.json(results);
      }
    }
  );
});


app.get('/getRouteByBusName', (req, res) => {
  const busName = req.query.busName;
  
  // Query the database to fetch the route name based on the bus name
  connection.query(
    `SELECT busRoute FROM busdetails WHERE busName = ? AND available = 'true'`,
    [busName],
    (err, results) => {
      if (err) {
        console.error('Error fetching route by bus name:', err);
        res.status(500).json({ error: 'Internal server error' });
      } else if (results.length === 0) {
        res.status(404).json({ error: 'Bus not found' });
      } else {
        res.json(results[0].busRoute);
        
      }
    }
  );
});