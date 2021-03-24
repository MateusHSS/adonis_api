import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Address from "App/Models/Address";
import Client from "App/Models/Client";

export default class AddressesController {
	public async store ({ request, params, response }: HttpContextContract): Promise<Client | void> {
		const data = request.only(["zip_code", "street", "number", "district", "city", "state", "country"]);

		const client = await Client.findOrFail(params.client_id);

		if(client.address_id != null){
			await client.load("address");
			return response.status(400).json({ message: "Client already have a address!", address: client.address });
		}

		const address = await Address.create(data);

		client.address_id = address.id;

		await client.related("address").save(address);

		return client;
	}

	public async show ({ params, response }: HttpContextContract): Promise<Address | void> {

		const client = await Client.findOrFail( params.client_id );

		if(client.address_id == null){
			return response.status(400).json({ message: "Client doesn`t have a registered address!"});
		}

		await client.load("address");

		return client.address;
	}

	public async update ({ request, params, response }: HttpContextContract): Promise<Address | void> {
		const data = request.only(["zip_code", "street", "number", "district", "city", "state", "country"]);

		const client = await Client.findOrFail(params.client_id);

		if(client.address_id == null){
			const address = await Address.create(data);

			client.address_id = address.id;
			await client.related("address").save(address);
			await client.load("address");
			await client.save();
			return client.address;
		}

		await client.load("address");
		await client.address.merge(data).save();

		return client.address;
	}

	public async destroy ({ params }: HttpContextContract): Promise<void> {

		const client = await Client.findOrFail(params.client_id);

		await client.load("address");

		await client.address.delete();

	}
}
