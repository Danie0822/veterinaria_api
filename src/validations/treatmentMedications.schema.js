const { z } = require('zod');

/**
 * @swagger
 * components:
 *   schemas:
 *     TreatmentMedication:
 *       type: object
 *       required:
 *         - treatment_id
 *         - medication_id
 *         - recommendation
 *         - dosage
 *         - quantity
 *         - is_lifelong
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Identificador único del medicamento en tratamiento.
 *           example: "550e8400-e29b-41d4-a716-446655440000"
 *         treatment_id:
 *           type: string
 *           format: uuid
 *           description: Identificador del tratamiento.
 *           example: "550e8400-e29b-41d4-a716-446655440000"
 *         medication_id:
 *           type: string
 *           format: uuid
 *           description: Identificador del medicamento.
 *           example: "550e8400-e29b-41d4-a716-446655440000"
 *         recommendation:
 *           type: string
 *           description: Recomendación de uso.
 *           example: "Tomar con alimentos"
 *         dosage:
 *           type: string
 *           description: Dosis específica.
 *           example: "10 mg"
 *         quantity:
 *           type: integer
 *           description: Cantidad asignada.
 *           example: 30
 *         is_lifelong:
 *           type: boolean
 *           description: Indica si es medicación permanente.
 *           example: false
 *         end_date:
 *           type: string
 *           format: date
 *           description: Fecha límite para medicación temporal.
 *           example: "2023-12-01"
 */

const paramsSchema = z.object({
    id: z.string().uuid({ message: 'El ID debe ser un UUID válido' }),
});

const treatmentMedicationSchema = z.object({
    treatment_id: z.string().uuid({ message: 'treatment_id debe ser un UUID válido' }),
    medication_id: z.string().uuid({ message: 'medication_id debe ser un UUID válido' }),
    recommendation: z.string({
        required_error: 'La recomendación es obligatoria',
    }).min(1, 'La recomendación es obligatoria'),
    dosage: z.string({
        required_error: 'La dosis es obligatoria',
    }).min(1, 'La dosis es obligatoria').max(100, 'La dosis no debe exceder 100 caracteres'),
    quantity: z.number({
        required_error: 'La cantidad es obligatoria',
    }).int('La cantidad debe ser un número entero').positive('La cantidad debe ser un número positivo'),
    is_lifelong: z.boolean({
        required_error: 'El campo is_lifelong es obligatorio',
    }),
    end_date: z.string().refine((value) => !isNaN(Date.parse(value)) || value === undefined, {
        message: 'end_date debe ser una fecha válida',
    }).optional(),
});

const createTreatmentMedicationSchema = z.object({
    body: treatmentMedicationSchema,
});

const updateTreatmentMedicationSchema = z.object({
    params: paramsSchema,
    body: treatmentMedicationSchema.partial(),
});

const readTreatmentMedicationSchema = z.object({
    params: paramsSchema,
});

const deleteTreatmentMedicationSchema = z.object({
    params: paramsSchema,
});

module.exports = {
    createTreatmentMedicationSchema,
    updateTreatmentMedicationSchema,
    readTreatmentMedicationSchema,
    deleteTreatmentMedicationSchema,
};
