const express = require('express');
const router = express.Router();
const {
    getAll,
    save,
    getById,
    update,
    destroy
} = require('../controllers/treatments.controller');
const { checkAuth } = require('../middlewares/checkAuth');
const validateRequest = require('../utils/validateRequest');
const {
    createTreatmentSchema,
    updateTreatmentSchema,
    readTreatmentSchema,
    deleteTreatmentSchema,
} = require('../validations/treatments.schema.js');

router.use(checkAuth('admin'));

/**
 * @swagger
 * tags:
 *   name: treatments
 *   description: Endpoints para gestionar los tratamientos
 */

/**
 * @swagger
 * /treatments:
 *   get:
 *     summary: Obtiene la lista de todos los tratamientos
 *     tags: [treatments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de tratamientos.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Treatment'
 */
router.get('/', getAll);

/**
 * @swagger
 * /treatments:
 *   post:
 *     summary: Crea un nuevo tratamiento
 *     tags: [treatments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Treatment'
 *     responses:
 *       201:
 *         description: Tratamiento creado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Treatment'
 *       400:
 *         description: Error en la creación del tratamiento.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/', validateRequest(createTreatmentSchema), save);

/**
 * @swagger
 * /treatments/{id}:
 *   get:
 *     summary: Obtiene un tratamiento por su ID
 *     tags: [treatments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID del tratamiento a obtener.
 *     responses:
 *       200:
 *         description: Detalles del tratamiento.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Treatment'
 *       404:
 *         description: Tratamiento no encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/:id', validateRequest(readTreatmentSchema), getById);

/**
 * @swagger
 * /treatments/{id}:
 *   put:
 *     summary: Actualiza un tratamiento por su ID
 *     tags: [treatments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID del tratamiento a actualizar.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Treatment'
 *     responses:
 *       200:
 *         description: Tratamiento actualizado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Treatment'
 *       404:
 *         description: Tratamiento no encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.put('/:id', validateRequest(updateTreatmentSchema), update);

/**
 * @swagger
 * /treatments/{id}:
 *   delete:
 *     summary: Elimina un tratamiento por su ID
 *     tags: [treatments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID del tratamiento a eliminar.
 *     responses:
 *       200:
 *         description: Tratamiento eliminado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Tratamiento eliminado exitosamente"
 *       404:
 *         description: Tratamiento no encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.delete('/:id', validateRequest(deleteTreatmentSchema), destroy);

module.exports = router;
