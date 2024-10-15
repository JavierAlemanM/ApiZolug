import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { DateTime } from "luxon";

const prisma = new PrismaClient();

export const managementController = {
  // Crear un nuevo registro de gestión
  createManagement: async (req: Request, res: Response) => {
    try {
      const {
        operation,
        bank,
        assignment,
        type,
        destiny,
        detail,
        channel,
        management,
        createStart,
        createEnd,
        contrast
      } = req.body;

      let colombiaTime = DateTime.now().setZone("America/Bogota");
      colombiaTime = colombiaTime.minus({ hours: 5 });

      const newManagement = await prisma.management.create({
        data: {
          operation: parseInt(operation),
          bank: parseInt(bank),
          assignment,
          type,
          destiny,
          detail,
          channel,
          management,
          createStart: new Date(createStart),
          createEnd: new Date(createEnd),
          contrast,
          updatedAt: colombiaTime.toJSDate(),
        },
      });
      res.status(201).json(newManagement);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  },

  // Obtener todos los registros de gestión
  getAllManagements: async (_req: Request, res: Response) => {
    try {
      const managements = await prisma.management.findMany();
      res.json(managements);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  },

  // Obtener un registro de gestión por ID
  getManagementById: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const management = await prisma.management.findUnique({
        where: { id: parseInt(id) },
      });
      if (management) {
        res.json(management);
      } else {
        res.status(404).json({ message: "Registro de gestión no encontrado" });
      }
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  },

  // Actualizar un registro de gestión
  updateManagement: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const {
        operation,
        bank,
        assignment,
        type,
        destiny,
        detail,
        channel,
        management,
        createStart,
        createEnd,
        contrast
      } = req.body;

      let colombiaTime = DateTime.now().setZone("America/Bogota");
      colombiaTime = colombiaTime.minus({ hours: 5 });

      const updatedManagement = await prisma.management.update({
        where: { id: parseInt(id) },
        data: {
          operation: operation ? parseInt(operation) : undefined,
          bank: bank ? parseInt(bank) : undefined,
          assignment,
          type,
          destiny,
          detail,
          channel,
          management,
          createStart: createStart ? new Date(createStart) : undefined,
          createEnd: createEnd ? new Date(createEnd) : undefined,
          contrast,
          updatedAt: colombiaTime.toJSDate(),
        },
      });
      res.json(updatedManagement);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  },

  // Eliminar un registro de gestión
  deleteManagement: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await prisma.management.delete({
        where: { id: parseInt(id) },
      });
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  },
};