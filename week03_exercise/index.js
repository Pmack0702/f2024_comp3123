var http = require("http");
const employee = require("./Employee")

// Define Server Port
const port = process.env.PORT || 8084;  

// Create Web Server using CORE API
const server = http.createServer((req, res) => {
    res.setHeader("Content-Type", "application/json"); // Set header to return JSON
    
    if (req.method !== 'GET') {
        res.statusCode = 405; // Method not allowed
        return res.end(JSON.stringify({ error: http.STATUS_CODES[405] }));
    }

    if (req.url === '/') {
        // Display welcome message
        return res.end(JSON.stringify({ message: "<h1>Welcome to Lab Exercise 03</h1>" }));
    }

    if (req.url === '/employee') {
        // Display all employee details
        return res.end(JSON.stringify(employee.getAllEmployees()));
    }

    if (req.url === '/employee/names') {
        // Display employee names in ascending order
        return res.end(JSON.stringify(employee.getAllEmployeeNames()));
    }

    if (req.url === '/employee/totalsalary') {
        // Display total salary of employees
        return res.end(JSON.stringify({ total_salary: employee.getTotalSalary() }));
    }

    // If none of the routes match, return 404
    res.statusCode = 404;
    return res.end(JSON.stringify({ error: http.STATUS_CODES[404] }));
});

// Start Server
server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
