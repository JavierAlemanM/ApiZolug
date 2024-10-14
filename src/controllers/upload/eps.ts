import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import * as XLSX from "xlsx";
import { DateTime } from "luxon";

const prisma = new PrismaClient();

export const epsUploadController = {
  uploadEps: async (req: Request, res: Response) => {
    try {
      if (!req.file) {
        res.status(400).json({ message: "No se ha subido ningún archivo" });
        return;
      }

      const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(sheet);

      const epsList = await Promise.all(
        data.map(async (row: any) => {
          // Verificar que los campos requeridos estén presentes
          if (!row.documentId || !row.name || !row.type || !row.detail || !row.assignment) {
            throw new Error(
              `Datos incompletos en la fila: ${JSON.stringify(row)}`,
            );
          }

          try {
            let colombiaTime = DateTime.now().setZone("America/Bogota");
            colombiaTime = colombiaTime.minus({ hours: 5 });

            return await prisma.eps.create({
              data: {
                documentId: parseInt(row.documentId),
                name: String(row.name),
                type: String(row.type),
                detail: String(row.detail),
                assignment: String(row.assignment),
                createdAt: colombiaTime.toJSDate(),
                updatedAt: colombiaTime.toJSDate(),
              },
            });
          } catch (error: any) {
            throw error;
          }
        }),
      );

      res.status(201).json({
        message: `${epsList.length} registros de EPS importados con éxito`,
      });
    } catch (error) {
      console.error("Error al importar registros de EPS:", error);
      res.status(400).json({ error: (error as Error).message });
    }
	},
};
