import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Service from "App/Models/Service";

export default class ServicesController {
	public async index () {
		const services = await Service.all();

		return services;
	}

	public async store ({ request }: HttpContextContract) {
		const data = request.only(["title", "description"]);

		const service = await Service.create(data);

		await service.save();

		return service;
	}

	public async show ({ params }: HttpContextContract) {
		const service = await Service.findOrFail(params.id);

		return service;
	}

	public async update ({ request, params }: HttpContextContract) {
		const data = request.only(["title", "description"]);

		const service = await Service.findOrFail(params.id);

		service.merge(data);
		service.save();

		return service;
	}

	public async destroy ({ params }: HttpContextContract) {
		const service = await Service.findOrFail(params.id);

		service.delete();
	}
}
