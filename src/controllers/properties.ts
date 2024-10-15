import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { DateTime } from "luxon";

const prisma = new PrismaClient();

export const propertiesController = {
  // Crear una nueva propiedad
  createProperty: async (req: Request, res: Response) => {
    try {
      const {
        documentId,
        property,
        enrollment,
        registration,
        city,
        direction,
        detail,
        assignment
      } = req.body;

      let colombiaTime = DateTime.now().setZone("America/Bogota");
      colombiaTime = colombiaTime.minus({ hours: 5 });

      const newProperty = await prisma.properties.create({
        data: {
          documentId: parseInt(documentId),
          property,
          enrollment,
          registration,
          city,
          direction,
          detail,
          assignment,
          createdAt: colombiaTime.toJSDate(),
          updatedAt: colombiaTime.toJSDate(),
        },
      });
      res.status(201).json(newProperty);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  },

  // Obtener todas las propiedades
  getAllProperties: async (_req: Request, res: Response) => {
    try {
      const properties = await prisma.properties.findMany();
      res.json(properties);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  },

  // Obtener una propiedad por ID
  getPropertyById: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const property = await prisma.properties.findUnique({
        where: { id: parseInt(id) },
      });
      if (property) {
        res.json(property);
      } else {
        res.status(404).json({ message: "Propiedad no encontrada" });
      }
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  },

  // Actualizar una propiedad
  updateProperty: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const {
        documentId,
        property,
        enrollment,
        registration,
        city,
        direction,
        detail,
        assignment
      } = req.body;

      let colombiaTime = DateTime.now().setZone("America/Bogota");
      colombiaTime = colombiaTime.minus({ hours: 5 });

      const updatedProperty = await prisma.properties.update({
        where: { id: parseInt(id) },
        data: {
          documentId: documentId ? parseInt(documentId) : undefined,
          property,
          enrollment,
          registration,
          city,
          direction,
          detail,
          assignment,
          updatedAt: colombiaTime.toJSDate(),
        },
      });
      res.json(updatedProperty);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  },

  // Eliminar una propiedad
  deleteProperty: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await prisma.properties.delete({
        where: { id: parseInt(id) },
      });
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  },
};