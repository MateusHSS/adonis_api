import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Address from "App/Models/Address";
import Client from "App/Models/Client";
import Contact from "App/Models/Contact";

export default class ClientsController {
	public async index (): Promise<Client[]> {
		const clients = await Client.query().preload("address").preload("contact");

		return clients;
	}

	public async store ({ request, response }: HttpContextContract): Promise<Client | void> {
		const data = request.only(["name", "cpf", "contact", "address"]);

		const cpfAlreadyRegistered = await Client.findBy("cpf", data.cpf);

		if(cpfAlreadyRegistered)
			return response.status(400).json({ message: "CPF already registered" });

		const client = await Client.create({ name: data.name, cpf: data.cpf });

		if(data.contact){
			const contact = await Contact.create(data.contact);

			client.contact_id = contact.id;
			await client.related("contact").save(contact);
		}

		if(data.address){
			const address = await Address.create(data.address);

			client.address_id = address.id;
			await client.related("address").save(address);
		}

		await client.save();

		return client;
	}

	public async show ({ params }: HttpContextContract): Promise<Client | void> {

		const client = await Client.findOrFail(params.id);
    
		await client.load("address");
		await client.load("contact");

		return client;
	}

	public async update ({ request, params }: HttpContextContract): Promise<Client | void> {
		const data = request.only(["name", "contact", "address"]);
		const client = await Client.findOrFail(params.id);
		await client.load("address");
		await client.load("contact");

		await client.merge(data).save();
		
		await client.contact.merge(data.contact).save();

		await client.address.merge(data.address).save();
		
		return client;
	}

	public async destroy ({ params }: HttpContextContract): Promise<void>{
		const client = await Client.findOrFail(params.id);

		await client.delete();
	}
}
