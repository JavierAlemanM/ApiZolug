import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { DateTime } from "luxon";

const prisma = new PrismaClient();

export const paymentController = {
   
    // Crear un nuevo pago 
    createPayment: async (req: Request, res: Response) => {
        try {
            const { operation, bank, value, assignment, date } = req.body;
            let colombiaTime = DateTime.now().setZone("America/Bogota");
            colombiaTime = colombiaTime.minus({ hours: 5 });
            const payment = await prisma.payment.create({
                data: {
                    operation: parseInt(operation),
                    bank: parseInt(bank),
                    value: parseInt(value),
                    assignment,
                    date: DateTime.fromISO(date).toJSDate(),
                    createdAt: colombiaTime.toJSDate(),
                },
            });
            res.status(201).json(payment);
        } catch (error) {
            res.status(400).json({ error: (error as Error).message });
        }
    },

    // Obtener todos los pagos
    getPayments: async (req: Request, res: Response) => {
        try {
            const payments = await prisma.payment.findMany();
            res.status(200).json(payments);
        } catch (error) {
            res.status(400).json({ error: (error as Error).message });
        }
    },

    // Obtener un pago por ID
    getPaymentById: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const payment = await prisma.payment.findUnique({
                where: { id: parseInt(id) },
            });
            res.status(200).json(payment);
        } catch (error) {
            res.status(400).json({ error: (error as Error).message });
        }
    },

    // Actualizar un pago
    updatePayment: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const { operation, bank, value, assignment, date } = req.body;
            let colombiaTime = DateTime.now().setZone("America/Bogota");
            colombiaTime = colombiaTime.minus({ hours: 5 });
            const payment = await prisma.payment.update({
                where: { id: parseInt(id) },
                data: {
                    operation: parseInt(operation),
                    bank: parseInt(bank),
                    value: parseInt(value),
                    assignment,
                    date: DateTime.fromISO(date).toJSDate(),
                },
            });
            res.status(200).json(payment);
        } catch (error) {
            res.status(400).json({ error: (error as Error).message });
        }
    },

    // Eliminar un pago
    deletePayment: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            await prisma.payment.delete({
                where: { id: parseInt(id) },
            });
            res.status(200).json({ message: "Payment deleted successfully" });
        } catch (error) {
            res.status(400).json({ error: (error as Error).message });
        }
    },
};


