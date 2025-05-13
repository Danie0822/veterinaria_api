const express = require('express');
const router = express.Router();
const {
    getAll,
    save,
    getById,
    update,
    destroy
} = require('../controllers/treatmentMedications.controller');
const { checkAuth } = require('../middlewares/checkAuth');
const validateRequest = require('../utils/validateRequest');
const {
    createTreatmentMedicationSchema,
    updateTreatmentMedicationSchema,
    readTreatmentMedicationSchema,
    deleteTreatmentMedicationSchema,
} = require('../validations/treatmentMedications.schema.js');

router.use(checkAuth('admin'));

/**
 * @swagger
 * tags:
 *   name: treatmentmedications
 *   description: Endpoints para gestionar los medicamentos de tratamiento
 */

/**
 * @swagger
 * /treatment-medications:
 *   get:
 *     summary: Obtiene la lista de todos los medicamentos de tratamiento
 *     tags: [treatmentmedications]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de medicamentos de tratamiento.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TreatmentMedication'
 */
router.get('/', getAll);

/**
 * @swagger
 * /treatment-medications:
 *   post:
 *     summary: Crea un nuevo medicamento de tratamiento
 *     tags: [treatmentmedications]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TreatmentMedication'
 *     responses:
 *       201:
 *         description: Medicamento de tratamiento creado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TreatmentMedication'
 *       400:
 *         description: Error en la creación del medicamento de tratamiento.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/', validateRequest(createTreatmentMedicationSchema), save);

/**
 * @swagger
 * /treatment-medications/{id}:
 *   get:
 *     summary: Obtiene un medicamento de tratamiento por su ID
 *     tags: [treatmentmedications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID del medicamento de tratamiento a obtener.
 *     responses:
 *       200:
 *         description: Detalles del medicamento de tratamiento.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TreatmentMedication'
 *       404:
 *         description: Medicamento de tratamiento no encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/:id', validateRequest(readTreatmentMedicationSchema), getById);

/**
 * @swagger
 * /treatment-medications/{id}:
 *   put:
 *     summary: Actualiza un medicamento de tratamiento por su ID
 *     tags: [treatmentmedications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID del medicamento de tratamiento a actualizar.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TreatmentMedication'
 *     responses:
 *       200:
 *         description: Medicamento de tratamiento actualizado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TreatmentMedication'
 *       404:
 *         description: Medicamento de tratamiento no encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.put('/:id', validateRequest(updateTreatmentMedicationSchema), update);

/**
 * @swagger
 * /treatment-medications/{id}:
 *   delete:
 *     summary: Elimina un medicamento de tratamiento por su ID
 *     tags: [treatmentmedications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID del medicamento de tratamiento a eliminar.
 *     responses:
 *       200:
 *         description: Medicamento de tratamiento eliminado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Medicamento de tratamiento eliminado exitosamente"
 *       404:
 *         description: Medicamento de tratamiento no encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.delete('/:id', validateRequest(deleteTreatmentMedicationSchema), destroy);

module.exports = router;
