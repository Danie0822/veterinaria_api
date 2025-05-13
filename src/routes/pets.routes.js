const express = require('express');
const router = express.Router();
const {
    getAll,
    save,
    getById,
    update,
    destroy
} = require('../controllers/pets.controller');
const { checkAuth } = require('../middlewares/checkAuth');
const validateRequest = require('../utils/validateRequest');
const {
    createPetSchema,
    updatePetSchema,
    readPetSchema,
    deletePetSchema,
} = require('../validations/pets.schema.js');

router.use(checkAuth('admin'));

/**
 * @swagger
 * tags:
 *   name: pets
 *   description: Endpoints para gestionar las mascotas
 */

/**
 * @swagger
 * /pets:
 *   get:
 *     summary: Obtiene la lista de todas las mascotas
 *     tags: [pets]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de mascotas.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Pet'
 */
router.get('/', getAll);

/**
 * @swagger
 * /pets:
 *   post:
 *     summary: Crea una nueva mascota
 *     tags: [pets]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Pet'
 *     responses:
 *       201:
 *         description: Mascota creada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pet'
 *       400:
 *         description: Error en la creación de la mascota.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/', validateRequest(createPetSchema), save);

/**
 * @swagger
 * /pets/{id}:
 *   get:
 *     summary: Obtiene una mascota por su ID
 *     tags: [pets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID de la mascota a obtener.
 *     responses:
 *       200:
 *         description: Detalles de la mascota.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pet'
 *       404:
 *         description: Mascota no encontrada.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/:id', validateRequest(readPetSchema), getById);

/**
 * @swagger
 * /pets/{id}:
 *   put:
 *     summary: Actualiza una mascota por su ID
 *     tags: [pets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID de la mascota a actualizar.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Pet'
 *     responses:
 *       200:
 *         description: Mascota actualizada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pet'
 *       404:
 *         description: Mascota no encontrada.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.put('/:id', validateRequest(updatePetSchema), update);

/**
 * @swagger
 * /pets/{id}:
 *   delete:
 *     summary: Elimina una mascota por su ID
 *     tags: [pets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID de la mascota a eliminar.
 *     responses:
 *       200:
 *         description: Mascota eliminada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Mascota eliminada exitosamente"
 *       404:
 *         description: Mascota no encontrada.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.delete('/:id', validateRequest(deletePetSchema), destroy);

module.exports = router;
