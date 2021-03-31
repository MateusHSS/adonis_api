/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes/index.ts` as follows
|
| import './cart'
| import './customer'
|
*/

import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
	Route.resource("/clients", "ClientsController").apiOnly();
	Route.group(() => {
		Route.resource("/:client_id/address", "AddressesController").apiOnly().except(["index"]).as("address");
	}).prefix("/clients").as("client");

	Route.resource("users", "UsersController").apiOnly();
	Route.resource("employees", "EmployeesController").apiOnly();
	Route.resource("services", "ServicesController").apiOnly();
	Route.resource("service_orders", "ServiceOrdersController").apiOnly();
}).middleware("auth");

Route.group(() => {
	Route.post("/login", "AuthController.login").as("login");
	Route.post("/logout", "AuthController.logout").as("logout");
}).prefix("/auth");
