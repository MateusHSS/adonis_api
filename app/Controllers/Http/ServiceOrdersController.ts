import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Service from "App/Models/Service";
import ServiceOrder from "App/Models/ServiceOrder";
export default class ServiceOrdersController {
	public async index (): Promise<ServiceOrder[]> {
		const service_orders = await ServiceOrder.all();

		return service_orders;
	}

	public async store ({ request }: HttpContextContract): Promise<ServiceOrder> {
		const data = request.only(["employee_id", "client_id", "services", "description", "deadline"]);

		const service_order = await ServiceOrder.create({ 
			employee_id: data.employee_id,
			client_id: data.client_id,
			description: data.description,
			deadline: data.deadline
		});

		await this.sync_services(service_order, data.services);

		await service_order.save();

		await service_order.load("services");

		return service_order;

	}

	public async show ({ params }: HttpContextContract): Promise<ServiceOrder | void> {
		const service_order = await ServiceOrder.findOrFail(params.id);

		await service_order.load("services");

		return service_order;
	}

	public async update ({ request, params }: HttpContextContract): Promise<ServiceOrder | void> {
		const service_order = await ServiceOrder.findOrFail(params.id);

		const data = request.only(["description", "deadline", "services" ]);

		service_order.merge(data);

		await this.sync_services(service_order, data.services);

		await service_order.save();

		await service_order.preload("services");

		return service_order;
	}

	public async destroy ({ params }: HttpContextContract): Promise<void> {
		const service_order = await ServiceOrder.findOrFail(params.id);
		await service_order.related("services").detach();

		await service_order.delete();
	}

	private async sync_services (service_order: ServiceOrder, services: {id: number, description: string}[]): Promise<void>{

		service_order.related("services").detach();

		services.forEach(async (service_info: {id: number, description: string}): Promise<void> => {
			const service = await Service.findOrFail(service_info.id);

			await service_order.related("services").attach({
				[service.id] : {
					service_description: service_info.description
				}
			});
		});

	}
}
