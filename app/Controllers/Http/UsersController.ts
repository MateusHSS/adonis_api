import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import User from "App/Models/User";

export default class UsersController {
	public async index ({}: HttpContextContract) {
		const users = await User.all();

		return users;
	}

	public async store ({ request, response }: HttpContextContract) {
		const data = request.only(["username", "email", "password"]);

		const usernameInUse = await User.findBy("username", data.username);

		if(usernameInUse)
			return response.status(400).json({ message: "Username already in use" });

		const emailRegistered = await User.findBy("email", data.email);

		if(emailRegistered)
			return response.status(400).json({ message: "Email already registered" });

		const user = await User.create(data);

		return user;
	}

	public async show ({ params, response }: HttpContextContract) {
		const data = await User.findBy("id", params.id);

		if(!data)
			return response.status(400).json({message: "User not found"});
    
		return data;
	}

	public async update ({ request, params }: HttpContextContract) {
		const data = request.only(["username", "email", "password"]);

		const user = await User.findOrFail(params.id);

		user.merge(data);
		await user.save();

		return user;
	}

	public async destroy ({ params }: HttpContextContract) {
		const user = await User.findOrFail(params.id);

		await user.delete();
	}
}
