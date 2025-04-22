const { z } = require('zod');

/**
 * @swagger
 * components:
 *   schemas:
 *     MedicalRecord:
 *       type: object
 *       required:
 *         - pet_id
 *         - visit_date
 *         - reason
 *         - diagnosis
 *         - treatment
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Identificador único del registro médico.
 *           example: "550e8400-e29b-41d4-a716-446655440000"
 *         pet_id:
 *           type: string
 *           format: uuid
 *           description: Identificador de la mascota.
 *           example: "550e8400-e29b-41d4-a716-446655440000"
 *         visit_date:
 *           type: string
 *           format: date
 *           description: Fecha de la visita.
 *           example: "2023-10-01"
 *         reason:
 *           type: string
 *           description: Motivo de la consulta.
 *           example: "Revisión anual"
 *         diagnosis:
 *           type: string
 *           description: Diagnóstico establecido.
 *           example: "Sano"
 *         treatment:
 *           type: string
 *           description: Tratamiento aplicado.
 *           example: "Vacunas anuales"
 */

const paramsSchema = z.object({
    id: z.string().uuid({ message: 'El ID debe ser un UUID válido' }),
});

const medicalRecordSchema = z.object({
    pet_id: z.string().uuid({ message: 'pet_id debe ser un UUID válido' }),
    visit_date: z.string().refine((value) => !isNaN(Date.parse(value)), {
        message: 'visit_date debe ser una fecha válida',
    }),
    reason: z.string({
        required_error: 'El motivo es obligatorio',
    }).min(1, 'El motivo es obligatorio'),
    diagnosis: z.string({
        required_error: 'El diagnóstico es obligatorio',
    }).min(1, 'El diagnóstico es obligatorio'),
    treatment: z.string({
        required_error: 'El tratamiento es obligatorio',
    }).min(1, 'El tratamiento es obligatorio'),
});

const createMedicalRecordSchema = z.object({
    body: medicalRecordSchema,
});

const updateMedicalRecordSchema = z.object({
    params: paramsSchema,
    body: medicalRecordSchema.partial(),
});

const readMedicalRecordSchema = z.object({
    params: paramsSchema,
});

const deleteMedicalRecordSchema = z.object({
    params: paramsSchema,
});

module.exports = {
    createMedicalRecordSchema,
    updateMedicalRecordSchema,
    readMedicalRecordSchema,
    deleteMedicalRecordSchema,
};
