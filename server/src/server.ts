import Fastify from "fastify";
import cors from '@fastify/cors'
import { PrismaClient } from "@prisma/client";

const app = Fastify();
const prisma = new PrismaClient();

app.register(cors)

app.get("/", () => {
	return "Hello1";
});

app.get("/hello", async () => {
	const habits = await prisma.habit.findMany();

	return habits;
});

app
	.listen({
		port: 8080,
	})
	.then(() => {
		console.log("waiting...");
	});
