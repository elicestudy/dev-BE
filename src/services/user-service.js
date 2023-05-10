const { userDAO } = require('../db/dao/user-dao');

class UserService {
	async getUserByEmail(userEmail) {
		const user = await userDAO.findUserByEmail(userEmail);
		return user;
	}

	async getAllUsers() {
		const user = await userDAO.findAllUsers();
		return user;
	}

	async createUser(userInfo) {
		const user = await userDAO.createUser(userInfo);
		return user;
	}

	async updateUser(userEmail, updatedInfo) {
		const { password, nickname } = updatedInfo;
		const user = await userDAO.updateUser(userEmail, { password, nickname });
		return user;
	}

	async deleteUser(userEmail) {
		const user = await userDAO.deleteUser(userEmail);
		return user;
	}
}

const userService = new UserService();
module.exports = { userService };
