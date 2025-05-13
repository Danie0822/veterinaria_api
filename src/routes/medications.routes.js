const express = require('express');
const router = express.Router();
const {
    getAll,
    save,
    getById,
    update,
    destroy
} = require('../controllers/medications.controller.js');
const { checkAuth } = require('../middlewares/checkAuth');
const validateRequest = require('../utils/validateRequest');
const {
    readRequestSchema,
    createRequestSchema,
    updateRequestSchema,
    deleteRequestSchema,
} = require('../validations/medications.schema.js');

router.use(checkAuth('admin'));

/**
 * @swagger
 * tags:
 *   name: medications
 *   description: Endpoints para gestionar los medicamentos
 */

/**
 * @swagger
 * /medications:
 *   get:
 *     summary: Obtiene la lista de todos los medicamentos
 *     tags: [medications]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de medicamentos.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Medication'
 */
router.get('/', getAll);

/**
 * @swagger
 * /medications:
 *   post:
 *     summary: Crea un nuevo medicamento
 *     tags: [medications]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Medication'
 *     responses:
 *       201:
 *         description: Medicamento creado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Medication'
 *       400:
 *         description: Error en la creación del medicamento.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/', validateRequest(createRequestSchema), save);

/**
 * @swagger
 * /medications/{id}:
 *   get:
 *     summary: Obtiene un medicamento por su ID
 *     tags: [medications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID del medicamento a obtener.
 *     responses:
 *       200:
 *         description: Detalles del medicamento.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Medication'
 *       404:
 *         description: Medicamento no encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/:id', validateRequest(readRequestSchema), getById);

/**
 * @swagger
 * /medications/{id}:
 *   put:
 *     summary: Actualiza un medicamento por su ID
 *     tags: [medications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID del medicamento a actualizar.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Medication'
 *     responses:
 *       200:
 *         description: Medicamento actualizado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Medication'
 *       404:
 *         description: Medicamento no encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.put('/:id', validateRequest(updateRequestSchema), update);

/**
 * @swagger
 * /medications/{id}:
 *   delete:
 *     summary: Elimina un medicamento por su ID
 *     tags: [medications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID del medicamento a eliminar.
 *     responses:
 *       200:
 *         description: Medicamento eliminado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Medicamento eliminado exitosamente"
 *       404:
 *         description: Medicamento no encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.delete('/:id', validateRequest(deleteRequestSchema), destroy);

module.exports = router;
