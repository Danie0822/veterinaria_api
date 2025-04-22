const { z } = require('zod');

/**
 * @swagger
 * components:
 *   schemas:
 *     Treatment:
 *       type: object
 *       required:
 *         - pet_id
 *         - assigned_by
 *         - start_date
 *         - details
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Identificador único del tratamiento.
 *           example: "550e8400-e29b-41d4-a716-446655440000"
 *         pet_id:
 *           type: string
 *           format: uuid
 *           description: Identificador de la mascota.
 *           example: "550e8400-e29b-41d4-a716-446655440000"
 *         assigned_by:
 *           type: string
 *           format: uuid
 *           description: Identificador del usuario que asignó el tratamiento.
 *           example: "550e8400-e29b-41d4-a716-446655440000"
 *         start_date:
 *           type: string
 *           format: date
 *           description: Fecha de inicio del tratamiento.
 *           example: "2023-10-01"
 *         end_date:
 *           type: string
 *           format: date
 *           description: Fecha de fin del tratamiento.
 *           example: "2023-10-15"
 *         details:
 *           type: string
 *           description: Detalles del tratamiento.
 *           example: "Tomar medicamento diario"
 */

const paramsSchema = z.object({
    id: z.string().uuid({ message: 'El ID debe ser un UUID válido' }),
});

const treatmentSchema = z.object({
    pet_id: z.string().uuid({ message: 'pet_id debe ser un UUID válido' }),
    assigned_by: z.string().uuid({ message: 'assigned_by debe ser un UUID válido' }),
    start_date: z.string().refine((value) => !isNaN(Date.parse(value)), {
        message: 'start_date debe ser una fecha válida',
    }),
    end_date: z.string().refine((value) => !isNaN(Date.parse(value)) || value === undefined, {
        message: 'end_date debe ser una fecha válida',
    }).optional(),
    details: z.string({
        required_error: 'Los detalles son obligatorios',
    }).min(1, 'Los detalles son obligatorios'),
});

const createTreatmentSchema = z.object({
    body: treatmentSchema,
});

const updateTreatmentSchema = z.object({
    params: paramsSchema,
    body: treatmentSchema.partial(),
});

const readTreatmentSchema = z.object({
    params: paramsSchema,
});

const deleteTreatmentSchema = z.object({
    params: paramsSchema,
});

module.exports = {
    createTreatmentSchema,
    updateTreatmentSchema,
    readTreatmentSchema,
    deleteTreatmentSchema,
};
