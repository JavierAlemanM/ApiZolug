import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { DateTime } from "luxon";

const prisma = new PrismaClient();

export const employmentController = {
  // Crear un nuevo registro de empleo
  createEmployment: async (req: Request, res: Response) => {
    try {
      const {
        documentId,
        company,
        documentType,
        document,
        salary,
        city,
        direction,
        phone,
        email,
        detail,
        assignment
      } = req.body;

      let colombiaTime = DateTime.now().setZone("America/Bogota");
      colombiaTime = colombiaTime.minus({ hours: 5 });

      const newEmployment = await prisma.employment.create({
        data: {
          documentId: parseInt(documentId),
          company,
          documentType,
          document,
          salary,
          city,
          direction,
          phone,
          email,
          detail,
          assignment,
          createdAt: colombiaTime.toJSDate(),
          updatedAt: colombiaTime.toJSDate(),
        },
      });
      res.status(201).json(newEmployment);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  },

  // Obtener todos los registros de empleo
  getAllEmployments: async (_req: Request, res: Response) => {
    try {
      const employments = await prisma.employment.findMany();
      res.json(employments);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  },

  // Obtener un registro de empleo por ID
  getEmploymentById: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const employment = await prisma.employment.findUnique({
        where: { id: parseInt(id) },
      });
      if (employment) {
        res.json(employment);
      } else {
        res.status(404).json({ message: "Registro de empleo no encontrado" });
      }
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  },

  // Actualizar un registro de empleo
  updateEmployment: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const {
        documentId,
        company,
        documentType,
        document,
        salary,
        city,
        direction,
        phone,
        email,
        detail,
        assignment
      } = req.body;

      let colombiaTime = DateTime.now().setZone("America/Bogota");
      colombiaTime = colombiaTime.minus({ hours: 5 });

      const updatedEmployment = await prisma.employment.update({
        where: { id: parseInt(id) },
        data: {
          documentId: documentId ? parseInt(documentId) : undefined,
          company,
          documentType,
          document,
          salary,
          city,
          direction,
          phone,
          email,
          detail,
          assignment,
          updatedAt: colombiaTime.toJSDate(),
        },
      });
      res.json(updatedEmployment);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  },

  // Eliminar un registro de empleo
  deleteEmployment: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await prisma.employment.delete({
        where: { id: parseInt(id) },
      });
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  },
};