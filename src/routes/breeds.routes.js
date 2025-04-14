const express = require('express');
const router = express.Router();
const {
    getAll,
    save,
    getById,
    update,
    destroy
} = require('../controllers/breeds.controller');
const { checkAuth } = require('../middlewares/checkAuth'); // Import your auth middleware
const validateRequest = require('../utils/validateRequest');
const {
    readRequestSchema,
    createRequestSchema,
    updateRequestSchema,
    deleteRequestSchema,
} = require('../validations/breeds.schema'); // Ensure the file name matches

router.use(checkAuth('admin')); // Import the middleware for authentication by role the admin
/**
 * @swagger
 * tags:
 *   name: breeds
 *   description: Endpoints para gestionar las razas de mascotas
 */

/**
 * @swagger
 * /breeds:
 *   get:
 *     summary: Obtiene la lista de todas las razas de mascotas
 *     tags: [breeds]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de razas.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Breed'
 */
router.get('/', getAll);
/**
 * @swagger
 * /breeds:
 *   post:
 *     summary: Crea una nueva raza de mascota
 *     tags: [breeds]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Breed'
 *     responses:
 *       201:
 *         description: Raza creada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Breed'
 *       400:
 *         description: Error en la creación de la raza.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/', validateRequest(createRequestSchema), save);
/**
 * @swagger
 * /breeds/{id}:
 *   get:
 *     summary: Obtiene una raza de mascota por su ID
 *     tags: [breeds]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la raza a obtener.
 *     responses:
 *       200:
 *         description: Detalles de la raza.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Breed'
 *       404:
 *         description: Raza no encontrada.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/:id', validateRequest(readRequestSchema), getById);
/**
 * @swagger
 * /breeds/{id}:
 *   put:
 *     summary: Actualiza una raza de mascota por su ID
 *     tags: [breeds]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la raza a actualizar.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Breed'
 *     responses:
 *       200:
 *         description: Raza actualizada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Breed'
 *       404:
 *         description: Raza no encontrada.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.put('/:id', validateRequest(updateRequestSchema), update);
/**
 * @swagger
 * /breeds/{id}:
 *   delete:
 *     summary: Elimina una raza de mascota por su ID
 *     tags: [breeds]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la raza a eliminar.
 *     responses:
 *       200:
 *         description: Raza eliminada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Breed deleted successfully"
 *       404:
 *         description: Raza no encontrada.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.delete('/:id', validateRequest(deleteRequestSchema), destroy);

module.exports = router;

