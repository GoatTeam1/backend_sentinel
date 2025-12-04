import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import PDFDocument from 'pdfkit';

const prisma = new PrismaClient();

export async function generateReport(req: Request, res: Response) {
    const { mes, año } = req.query;

    const fechaInicio = new Date(Number(año), Number(mes) - 1, 1);
    const fechaFin = new Date(Number(año), Number(mes), 0, 23, 59, 59);

    // 1. Consultas Prisma
    const ataques = await prisma.attack.findMany({
        where: {
            timestamp: {
                gte: fechaInicio,
                lte: fechaFin
            }
        }
    });

    const intentos = await prisma.loginAttemp.findMany({
        where: {
            timestamp: {
                gte: fechaInicio,
                lte: fechaFin
            }
        }
    });

    const ipInfo = await prisma.ipInfo.findMany({
        where: {
            lastActivity: {
                gte: fechaInicio,
                lte: fechaFin
            }
        }
    });

    // 2. Crear PDF
    const doc = new PDFDocument({ margin: 40 });

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=reporte.pdf');

    doc.pipe(res);

    // Título
    doc.fontSize(20).text('Reporte Mensual', { underline: true });
    doc.moveDown();

    doc.fontSize(12).text(`Mes: ${mes}/${año}`);
    doc.moveDown(2);

    // 3. Secciones
    doc.fontSize(16).text('Ataques');
    doc.moveDown();
    ataques.forEach(a => {
        doc.fontSize(11).text(`IP: ${a.ip} | Puerto: ${a.port} | Protocolo: ${a.protocol} | OS: ${a.os}`);
        doc.text(`Fecha: ${a.timestamp}`);
        doc.text(`Comportamiento: ${a.behavior}`);
        doc.moveDown();
    });

    doc.addPage();

    doc.fontSize(16).text('Intentos de Login');
    doc.moveDown();
    intentos.forEach(i => {
        doc.fontSize(11).text(`Usuario: ${i.username} | Fecha: ${i.timestamp}`);
        doc.moveDown();
    });

    doc.addPage();

    doc.fontSize(16).text('IP Info');
    doc.moveDown();
    ipInfo.forEach(ip => {
        doc.fontSize(11).text(`IP: ${ip.ip}`);
        doc.text(`País: ${ip.geolocation.country} | Ciudad: ${ip.geolocation.city}`);
        doc.text(`Última actividad: ${ip.lastActivity}`);
        doc.moveDown();
    });

    doc.end();
}
