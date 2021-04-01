import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Service from "App/Models/Service";
import slugify from "slugify";

export default class ServicesController {
	public async index (): Promise<Service[]> {
		const services = await Service.all();

		return services;
	}

	public async store ({ request, response }: HttpContextContract): Promise<Service | void> {
		const data = request.only(["title", "description"]);

		const serviceAlreadyExists = await Service.findBy("slug", slugify(data.title, { replacement: "_", lower: true, locale: "pt-BR" }));

		if(serviceAlreadyExists){
			return response.status(400).json({ error: true, message: "A service with this title already exists!" }) ; 
		}

		const service = await Service.create(data);

		await service.save();

		return service;
	}

	public async show ({ params }: HttpContextContract): Promise<Service | void> {
		const service = await Service.findOrFail(params.id);

		return service;
	}

	public async update ({ request, params, response }: HttpContextContract): Promise<Service | void> {
		const data = request.only(["title", "description"]);

		const service = await Service.findOrFail(params.id);

		if(data.title){
			const serviceAlreadyExists = await Service.findBy("slug", slugify(data.title, { replacement: "_", lower: true, locale: "pt-BR" }));

			if(serviceAlreadyExists){
				return response.status(400).json({ error: true, message: "Title already in use!" }) ; 
			}
		}

		service.merge(data);
		await service.save();

		return service;
	}

	public async destroy ({ params }: HttpContextContract): Promise<void> {
		const service = await Service.findOrFail(params.id);

		await service.delete();
	}
}
