const express = require('express');
const router = express.Router();
const {
    getAll,
    save,
    getById,
    update,
    destroy
} = require('../controllers/typePets.controller');
const { checkAuth } = require('../middlewares/checkAuth'); // Import your auth middleware
const validateRequest = require('../utils/validateRequest');
const {
    readUserRequestSchema,
    createUserRequestSchema,
    updateUserRequestSchema,
    deleteUserRequestSchema,
} = require('../validations/typePets.schema'); // Ensure the file name matches

router.use(checkAuth('admin')); // Import the middleware for authentication by role the admin
/**
 * @swagger
 * tags:
 *   name: TypePets
 *   description: Endpoints para gestionar los tipos de mascotas
 */

/**
 * @swagger
 * /type-pets:
 *   get:
 *     summary: Obtiene la lista de todos los tipos de mascotas
 *     tags: [TypePets]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de tipos de mascotas.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TypePet'
 */
router.get('/', getAll);

/**
 * @swagger
 * /type-pets:
 *   post:
 *     summary: Crea un nuevo tipo de mascota
 *     tags: [TypePets]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TypePet'
 *     responses:
 *       201:
 *         description: Tipo de mascota creado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TypePet'
 *       400:
 *         description: Error en la creación del tipo de mascota.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/', validateRequest(createUserRequestSchema), save);

/**
 * @swagger
 * /type-pets/{id}:
 *   get:
 *     summary: Obtiene un tipo de mascota por su ID
 *     tags: [TypePets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del tipo de mascota a obtener.
 *     responses:
 *       200:
 *         description: Detalles del tipo de mascota.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TypePet'
 *       404:
 *         description: Tipo de mascota no encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/:id', validateRequest(readUserRequestSchema), getById);
/**
 * @swagger
 * /type-pets/{id}:
 *   put:
 *     summary: Actualiza un tipo de mascota por su ID
 *     tags: [TypePets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del tipo de mascota a actualizar.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TypePet'
 *     responses:
 *       200:
 *         description: Tipo de mascota actualizado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TypePet'
 *       404:
 *         description: Tipo de mascota no encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.put('/:id', validateRequest(updateUserRequestSchema), update);

/**
 * @swagger
 * /type-pets/{id}:
 *   delete:
 *     summary: Elimina un tipo de mascota por su ID
 *     tags: [TypePets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del tipo de mascota a eliminar.
 *     responses:
 *       200:
 *         description: Tipo de mascota eliminado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Type pet deleted successfully"
 *       404:
 *         description: Tipo de mascota no encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.delete('/:id', validateRequest(deleteUserRequestSchema), destroy);

module.exports = router;