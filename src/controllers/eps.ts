import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { DateTime } from "luxon";

const prisma = new PrismaClient();

export const epsController = {
  // Crear una nueva EPS
  createEps: async (req: Request, res: Response) => {
    try {
      const { documentId, name, type, detail, assignment } = req.body;
      let colombiaTime = DateTime.now().setZone("America/Bogota");
      colombiaTime = colombiaTime.minus({ hours: 5 });
      const eps = await prisma.eps.create({
        data: {
          documentId: parseInt(documentId),
          name,
          type,
          detail,
          assignment,
          createdAt: colombiaTime.toJSDate(),
          updatedAt: colombiaTime.toJSDate(),
        },
      });
      res.status(201).json(eps);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  },

  // Obtener todas las EPS
  getAllEps: async (_req: Request, res: Response) => {
    try {
      const epsList = await prisma.eps.findMany();
      res.json(epsList);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  },

  // Obtener una EPS por ID
  getEpsById: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const eps = await prisma.eps.findUnique({
        where: { id: parseInt(id) },
      });
      if (eps) {
        res.json(eps);
      } else {
        res.status(404).json({ message: "EPS no encontrada" });
      }
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  },

  // Actualizar una EPS
  updateEps: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { documentId, name, type, detail, assignment } = req.body;
      const updatedEps = await prisma.eps.update({
        where: { id: parseInt(id) },
        data: {
          documentId: documentId ? parseInt(documentId) : undefined,
          name,
          type,
          detail,
          assignment,
          updatedAt: new Date(),
        },
      });
      res.json(updatedEps);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  },

  // Eliminar una EPS
  deleteEps: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await prisma.eps.delete({
        where: { id: parseInt(id) },
      });
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  },
};