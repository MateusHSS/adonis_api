import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Service from "App/Models/Service";
import ServiceOrder from "App/Models/ServiceOrder";

export default class ServiceOrdersController {
	public async index (): Promise<ServiceOrder[]> {
		const service_orders = await ServiceOrder.all();

		return service_orders;
	}

	public async store ({ request }: HttpContextContract) {
		const data = request.only([ "employee_id", "client_id", "services", "description", "deadline" ]);

		const service_order = await ServiceOrder.create({ 
			employee_id: data.employee_id,
			client_id: data.client_id,
			description: data.description,
			deadline: data.deadline
		});

		for (let i = 0; i < data.services.length; i++) {
			const service_id = data.services[i];
      
			const service = await Service.findOrFail(service_id);

			await service_order.related("services").save(service);
		}

		await service_order.save();

		await service_order.load("services");

		return service_order;

	}

	public async show ({}: HttpContextContract) {
	}

	public async update ({}: HttpContextContract) {
	}

	public async destroy ({}: HttpContextContract) {
	}
}
