const { z } = require('zod');

/**
 * @openapi
 * components:
 *   schemas:
 *     Medication:
 *       type: object
 *       required:
 *         - name
 *         - description
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Unique identifier of the medication.
 *           example: "f3e1a6a8-bb95-4f60-999f-2b9a32a9b0d3"
 *         name:
 *           type: string
 *           description: Name of the medication.
 *           example: "Paracetamol"
 *         description:
 *           type: string
 *           description: Description of the medication.
 *           example: "Utilizado en medicina veterinaria para aliviar el dolor y reducir la fiebre en animales"
 */

const params = z.object({
    id: z.string().uuid({ message: 'The ID must be a valid UUID' }),
});

// Define the User schema
const MedicationsSchema = z.object({
    id: z.string().uuid(),
    name: z.string({
        required_error: 'Name is required',
    })
        .min(2, 'Name must be at least 2 characters')
        .max(250, 'Name must not exceed 250 characters'), 
    description: z.string({
        required_error: 'Description is required',
    })
        .min(2, 'Description must be at least 2 characters')
        .max(250, 'Description must not exceed 250 characters')
});



const readRequestSchema = z.object({
    params,
});

const createRequestSchema = z.object({
    body: MedicationsSchema.omit({ id: true }),
});

const updateRequestSchema = z.object({
    params,
    body: MedicationsSchema.omit({ id: true }),
});

const deleteRequestSchema = z.object({
    params,
});

module.exports = {
    readRequestSchema,
    createRequestSchema,
    updateRequestSchema,
    deleteRequestSchema,
};