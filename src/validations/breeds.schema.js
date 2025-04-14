const { z } = require('zod');
/**
 * @swagger
 * components:
 *   schemas:
 *     Breed:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Identificador único de la raza.
 *           example: "550e8400-e29b-41d4-a716-446655440000"
 *         name:
 *           type: string
 *           description: Nombre de la raza.
 *           example: "Labrador"
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           description: Mensaje de error.
 *           example: "Breed not found"
 *         route:
 *           type: string
 *           description: Ruta donde ocurrió el error.
 *           example: "/breeds/550e8400-e29b-41d4-a716-446655440000"
 *         status:
 *           type: number
 *           description: Código de estado HTTP.
 *           example: 404
 */

const params = z.object({
    id: z.string().uuid({ message: 'The ID must be a valid UUID' }),
});

// Define the User schema
const BreedsSchema = z.object({
    id: z.string().uuid(),
    name: z.string({
        required_error: 'Name is required',
    })
        .min(2, 'Name must be at least 2 characters')
        .max(250, 'Name must not exceed 250 characters')
});



const readRequestSchema = z.object({
    params,
});

const createRequestSchema = z.object({
    body: BreedsSchema.omit({ id: true }),
});

const updateRequestSchema = z.object({
    params,
    body: BreedsSchema.omit({ id: true }),
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