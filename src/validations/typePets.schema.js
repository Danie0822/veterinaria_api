const { z } = require('zod');
/**
 * @swagger
 * components:
 *   schemas:
 *     TypePet:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Identificador único del tipo de mascota.
 *           example: "550e8400-e29b-41d4-a716-446655440000"
 *         name:
 *           type: string
 *           description: Nombre del tipo de mascota.
 *           example: "Perro"
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           description: Mensaje de error.
 *           example: "Type pet not found"
 *         route:
 *           type: string
 *           description: Ruta donde ocurrió el error.
 *           example: "/typepets/550e8400-e29b-41d4-a716-446655440000"
 *         status:
 *           type: number
 *           description: Código de estado HTTP.
 *           example: 404
 */

const params = z.object({
    id: z.string().uuid({ message: 'The ID must be a valid UUID' }),
});

// Define the User schema
const typePetsSchema = z.object({
    id: z.string().uuid(),
    name: z.string({
        required_error: 'Name is required',
    })
        .min(2, 'Name must be at least 2 characters')
        .max(250, 'Name must not exceed 250 characters')
});



const readUserRequestSchema = z.object({
    params,
});

const createUserRequestSchema = z.object({
    body: typePetsSchema.omit({ id: true }),
});

const updateUserRequestSchema = z.object({
    params,
    body: typePetsSchema.omit({ id: true }),
});

const deleteUserRequestSchema = z.object({
    params,
});

module.exports = {
    readUserRequestSchema,
    createUserRequestSchema,
    updateUserRequestSchema,
    deleteUserRequestSchema,
};