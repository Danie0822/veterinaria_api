const { z } = require('zod');

/**
 * @swagger
 * components:
 *   schemas:
 *     Appointment:
 *       type: object
 *       required:
 *         - pet_id
 *         - appointment_date
 *         - appointment_time
 *         - description
 *         - status
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Identificador único de la cita.
 *           example: "550e8400-e29b-41d4-a716-446655440000"
 *         pet_id:
 *           type: string
 *           format: uuid
 *           description: Identificador de la mascota.
 *           example: "550e8400-e29b-41d4-a716-446655440000"
 *         appointment_date:
 *           type: string
 *           format: date
 *           description: Fecha programada.
 *           example: "2023-10-01"
 *         appointment_time:
 *           type: string
 *           format: time
 *           description: Hora programada.
 *           example: "10:00:00"
 *         description:
 *           type: string
 *           description: Descripción de la cita.
 *           example: "Vacunación"
 *         status:
 *           type: string
 *           enum: [Pendiente, Confirmada, Cancelada, Realizada]
 *           description: Estado actual de la cita.
 *           example: "Pendiente"
 */

const paramsSchema = z.object({
    id: z.string().uuid({ message: 'El ID debe ser un UUID válido' }),
});

const appointmentSchema = z.object({
    pet_id: z.string().uuid({ message: 'pet_id debe ser un UUID válido' }),
    appointment_date: z.string().refine((value) => !isNaN(Date.parse(value)), {
        message: 'appointment_date debe ser una fecha válida',
    }),
    appointment_time: z.string().refine((value) => /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/.test(value), {
        message: 'appointment_time debe ser una hora válida en formato HH:mm:ss',
    }),
    description: z.string({
        required_error: 'La descripción es obligatoria',
    }).min(1, 'La descripción es obligatoria'),
    status: z.enum(['Pendiente', 'Confirmada', 'Cancelada', 'Realizada'], {
        required_error: 'El estado es obligatorio',
    }),
});

const createAppointmentSchema = z.object({
    body: appointmentSchema,
});

const updateAppointmentSchema = z.object({
    params: paramsSchema,
    body: appointmentSchema.partial(),
});

const readAppointmentSchema = z.object({
    params: paramsSchema,
});

const deleteAppointmentSchema = z.object({
    params: paramsSchema,
});

module.exports = {
    createAppointmentSchema,
    updateAppointmentSchema,
    readAppointmentSchema,
    deleteAppointmentSchema,
};
