const userService = require("./userService");

const getDataControllerfn = async (req, res) => {
	const employee = await userService.getDataFromDBService();
	res.send({ status: true, data: employee });
};

const createUserControllerFn = async (req, res) => {
	const status = await userService.createUserDBService(req.body);
	if (status) {
		res.send({ status: true, message: "User created successfully" });
	} else {
		res.send({ status: false, message: "Error creating user" });
	}
};

const updateUserController = async (req, res) => {
	console.log(req.params.id);
	console.log(req.body);

	const result = await userService.updateUserDBService(req.params.id, req.body);

	if (result) {
		res.send({ status: true, message: "User Updateeeedddddd" });
	} else {
		res.send({ status: false, message: "User Updateeeedddddd Faileddddddd" });
	}
};

const deleteUserController = async (req, res) => {
	console.log(req.params.id);
	const result = await userService.removeUserDBService(req.params.id);
	if (result) {
		res.send({ status: true, message: "User Deleteddd" });
	} else {
		res.send({ status: false, message: "User Deleteddd Faileddddddd" });
	}
};
module.exports = {
	getDataControllerfn,
	createUserControllerFn,
	updateUserController,
	deleteUserController,
};
