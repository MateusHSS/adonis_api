import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Client from "App/Models/Client";

export default class ClientsController {
	public async index (): Promise<Client[]> {
		const clients = Client.all();

		return clients;
	}

	public async store ({ request, response }: HttpContextContract): Promise<Client | void> {
		const { name, cpf, contact, address} = request.only(["name", "cpf", "contact", "address"]);

		const cpfAlreadyRegistered = await Client.findBy("cpf", cpf);

		if(cpfAlreadyRegistered)
			return response.status(400).json({ message: "CPF already registered" });

		const client = await Client.create({ name, cpf });
    
		if(contact)
			await client.related("contact").create(contact);
    
		if(address)
			await client.related("address").create(address);

		return client;
	}

	public async show ({ params }: HttpContextContract): Promise<Client | void> {
    
		const client = await Client.findOrFail(params.client_id);

		return client;
	}

	public async update ({}: HttpContextContract) {
	}

	public async destroy ({}: HttpContextContract) {
	}
}
