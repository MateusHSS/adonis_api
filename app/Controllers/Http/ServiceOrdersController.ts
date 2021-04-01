import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import ServiceOrder from "App/Models/ServiceOrder";

export default class ServiceOrdersController {
	public async index (): Promise<ServiceOrder[]> {
		const service_orders = await ServiceOrder.all();

		return service_orders;
	}

	public async store ({ request }: HttpContextContract) {
		const data = request.only(["employee_id", "client_id", "services", "description", "deadline"]);

		const service_order = await ServiceOrder.create({ 
			employee_id: data.employee_id,
			client_id: data.client_id,
			description: data.description,
			deadline: data.deadline
		});

		await service_order.related("services").sync(data.services);

		await service_order.save();

		await service_order.load("services");

		return service_order;

	}

	public async show ({ params }: HttpContextContract) {
		const service_order = await ServiceOrder.findOrFail(params.id);

		await service_order.load("services");

		return service_order;
	}

	public async update ({ request, params }: HttpContextContract) {
		const service_order = await ServiceOrder.findOrFail(params.id);

		const data = request.only(["description", "deadline", "services" ]);

		service_order.merge(data);
		await service_order.related("services").sync(data.services);

		await service_order.save();

		await service_order.preload("services");

		return service_order;
	}

	public async destroy ({ params }: HttpContextContract) {
		const service_order = await ServiceOrder.findOrFail(params.id);
		await service_order.related("services").detach();
		
		await service_order.delete();
	}
}
