const fs = require("fs");
const args = process.argv.slice(2);
const id = args[0];
var attribute = args[1];

fs.readFile("data/employees.csv", "utf8", function (err, data) {
	if (err) {
		console.log(err.message);
		return;
	}

	let headers = data.slice(0, data.indexOf("\n")).split(",");
	let employeeData = data.slice(data.indexOf("\n") + 1).split("\n");

	//Read and format the info
	const employees = employeeData.map((row) => {
		let values = row.split(",");
		return headers.reduce(
			(object, curr, i) => ((object[curr] = values[i]), object),
			{}
		);
	});
	let employeesId = employees.filter((employee) => employee.id == id);

	//Checking valid ID's
	if (employeesId == "") {
		console.log("Not a valid ID");
		return;
	}

	//Looking fot the attribute
	if (attribute != null) {
		attribute = attribute.toLowerCase();
		if (attribute in employeesId[0]) {
			console.log({
				[attribute]: employeesId[0][attribute],
			});
			return;
		}
		console.log(
			"Attribute is not found. Please select one of the following attributes: \n-id \n-first_name \n-last_name \n-email \n-ip_address"
		);
		return;
	}

	console.log(employeesId[0]);
});
