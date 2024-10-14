import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { DateTime } from "luxon";

const prisma = new PrismaClient();

export const assignmentController = {

	// Crear un nuevo assignment  
	createAssignment: async (req: Request, res: Response) => {
		try {
			const { operation, bank, assignment } = req.body;
			let colombiaTime = DateTime.now().setZone("America/Bogota");
			colombiaTime = colombiaTime.minus({ hours: 5 });
			let id = operation.toString() + bank.toString();
			const assignments = await prisma.assignment.create({
				data: {
					id,
					operation,
					bank,
					assignment,
					createdAt: colombiaTime.toJSDate(),
					updatedAt: colombiaTime.toJSDate(),
				},
			});
			res.status(201).json(assignments);
		} catch (error) { 
			res.status(400).json({ error: (error as Error).message });
		}
	},

	// Obtener todos los assignments
	getAllAssignments: async (req: Request, res: Response) => {
		try {
			const assignments = await prisma.assignment.findMany();
			res.status(200).json(assignments);
		} catch (error) {
			res.status(400).json({ error: (error as Error).message });
		}
	},

	// Obtener un assignment por ID
	getAssignmentById: async (req: Request, res: Response) => {
		try {
			const { operation, bank } = req.params;
			let id = parseInt(operation.toString() + bank.toString());
			const assignment = await prisma.assignment.findUnique({
				where: { id: id },
			});
			res.status(200).json(assignment);
		} catch (error) {
			res.status(400).json({ error: (error as Error).message });
		}
	},

	// Actualizar un assignment por ID
	updateAssignment: async (req: Request, res: Response) => {
		try {
			const { operation, bank, assignment } = req.body;
			let id = parseInt(operation.toString() + bank.toString());
         let colombiaTime = DateTime.now().setZone("America/Bogota");
			colombiaTime = colombiaTime.minus({ hours: 5 });
			const updatedAssignment = await prisma.assignment.update({
				where: { id: id },
				data: {
               operation: parseInt(operation),
               bank: parseInt(bank),
               assignment,
               updatedAt: colombiaTime.toJSDate(),
            },
			});
			res.status(200).json(updatedAssignment);
		} catch (error) {
			res.status(400).json({ error: (error as Error).message });
		}
	},

	// Eliminar un assignment por ID
	deleteAssignment: async (req: Request, res: Response) => {
		try {
			const { operation, bank } = req.params;
			let id = parseInt(operation.toString() + bank.toString());
			await prisma.assignment.delete({
				where: { id: id },
			});
			res.status(200).json({ message: "Assignment eliminado correctamente" });
		} catch (error) {
			res.status(400).json({ error: (error as Error).message });
		}
	},

};




            

            


