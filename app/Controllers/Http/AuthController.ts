import { Response } from "@adonisjs/http-server/build/standalone";
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class AuthController {
	public async login ({ request, auth }: HttpContextContract) {
		const email = request.input("email");
		const password = request.input("password");

		const token = await auth.use("api").attempt(email, password);
		
		return token.toJSON();
	}

	public async logout({ auth, response }): Promise<Response>{
		await auth.use("api").logout();

		return response.json({ message: "Deslogado com sucesso" }); 
	}
}