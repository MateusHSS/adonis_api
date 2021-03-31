import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Employee from "App/Models/Employee";

export default class EmployeesController {
	public async index (): Promise<Employee[]> {
		const employees = await Employee.all();

		return employees;
	}

	public async store ({ request }: HttpContextContract): Promise<Employee> {
		const data = request.only(["name"]);

		const employee = await Employee.create(data);

		await employee.save();

		return employee;
	}

	public async show ({ params }: HttpContextContract): Promise<Employee | void> {
		const employee = await Employee.findOrFail(params.id);

		return employee;
	}

	public async update ({ request, params }: HttpContextContract): Promise<Employee | void> {
		const data = request.only([ "name" ]);

		const employee = await Employee.findOrFail(params.id);

		employee.merge(data);
		await employee.save();

		return employee;
	}

	public async destroy ({ params }: HttpContextContract): Promise<void> {
		const employee = await Employee.findOrFail(params.id);

		await employee.delete();
	}
}
