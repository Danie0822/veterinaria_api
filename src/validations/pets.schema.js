const { z } = require('zod');

/**
 * @swagger
 * components:
 *   schemas:
 *     Pet:
 *       type: object
 *       required:
 *         - name
 *         - age
 *         - gender
 *         - type_pet_id
 *         - breed_id
 *         - owner_id
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Identificador único de la mascota.
 *           example: "550e8400-e29b-41d4-a716-446655440000"
 *         name:
 *           type: string
 *           description: Nombre de la mascota.
 *           example: "Firulais"
 *         age:
 *           type: integer
 *           description: Edad de la mascota.
 *           example: 5
 *         gender:
 *           type: string
 *           enum: [M, F]
 *           description: Género de la mascota.
 *           example: "M"
 *         type_pet_id:
 *           type: string
 *           format: uuid
 *           description: Identificador del tipo de mascota.
 *           example: "550e8400-e29b-41d4-a716-446655440000"
 *         breed_id:
 *           type: string
 *           format: uuid
 *           description: Identificador de la raza de la mascota.
 *           example: "550e8400-e29b-41d4-a716-446655440000"
 *         owner_id:
 *           type: string
 *           format: uuid
 *           description: Identificador del dueño.
 *           example: "550e8400-e29b-41d4-a716-446655440000"
 */

// Esquema para validar parámetros (por ejemplo, cuando se necesita el ID en la URL)
const paramsSchema = z.object({
    id: z.string().uuid({ message: 'El ID debe ser un UUID válido' }),
});

// Esquema de validación para la entidad Pet basado en el modelo proporcionado
const petSchema = z.object({
    name: z.string({
        required_error: 'El nombre es obligatorio',
    })
    .min(1, 'El nombre es obligatorio')
    .max(250, 'El nombre no debe exceder 250 caracteres'),
    
    age: z.number({
        required_error: 'La edad es obligatoria',
    })
    .int('La edad debe ser un número entero').positive('La edad debe ser un número positivo'),
    
    gender: z.enum(['M', 'F'], {
        required_error: 'El género es obligatorio',
    }),
    
    type_pet_id: z.string().uuid({ message: 'type_pet_id debe ser un UUID válido' }),
    
    breed_id: z.string().uuid({ message: 'breed_id debe ser un UUID válido' }),
    
    owner_id: z.string().uuid({ message: 'owner_id debe ser un UUID válido' }),
});

// Esquema para la operación de creación (POST)
const createPetSchema = z.object({
    body: petSchema,
});

// Esquema para la operación de actualización (PUT)
const updatePetSchema = z.object({
    params: paramsSchema,
    body: petSchema.omit({ id: true }),
});

// Esquema para la operación de lectura (GET)
const readPetSchema = z.object({
    params: paramsSchema,
});

// Esquema para la operación de eliminación (DELETE)
const deletePetSchema = z.object({
    params: paramsSchema,
});

module.exports = {
    createPetSchema,
    updatePetSchema,
    readPetSchema,
    deletePetSchema,
};
