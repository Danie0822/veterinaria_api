const express = require('express');
const router = express.Router();
const {
    getAll,
    save,
    getById,
    update,
    destroy
} = require('../controllers/medicalRecords.controller');
const { checkAuth } = require('../middlewares/checkAuth');
const validateRequest = require('../utils/validateRequest');
const {
    createMedicalRecordSchema,
    updateMedicalRecordSchema,
    readMedicalRecordSchema,
    deleteMedicalRecordSchema,
} = require('../validations/medicalRecords.schema.js');

router.use(checkAuth('admin'));

/**
 * @swagger
 * tags:
 *   name: medicalrecords
 *   description: Endpoints para gestionar los registros médicos
 */

/**
 * @swagger
 * /medical-records:
 *   get:
 *     summary: Obtiene la lista de todos los registros médicos
 *     tags: [medicalrecords]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de registros médicos.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/MedicalRecord'
 */
router.get('/', getAll);

/**
 * @swagger
 * /medical-records:
 *   post:
 *     summary: Crea un nuevo registro médico
 *     tags: [medicalrecords]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MedicalRecord'
 *     responses:
 *       201:
 *         description: Registro médico creado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MedicalRecord'
 *       400:
 *         description: Error en la creación del registro médico.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/', validateRequest(createMedicalRecordSchema), save);

/**
 * @swagger
 * /medical-records/{id}:
 *   get:
 *     summary: Obtiene un registro médico por su ID
 *     tags: [medicalrecords]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID del registro médico a obtener.
 *     responses:
 *       200:
 *         description: Detalles del registro médico.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MedicalRecord'
 *       404:
 *         description: Registro médico no encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/:id', validateRequest(readMedicalRecordSchema), getById);

/**
 * @swagger
 * /medical-records/{id}:
 *   put:
 *     summary: Actualiza un registro médico por su ID
 *     tags: [medicalrecords]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID del registro médico a actualizar.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MedicalRecord'
 *     responses:
 *       200:
 *         description: Registro médico actualizado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MedicalRecord'
 *       404:
 *         description: Registro médico no encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.put('/:id', validateRequest(updateMedicalRecordSchema), update);

/**
 * @swagger
 * /medical-records/{id}:
 *   delete:
 *     summary: Elimina un registro médico por su ID
 *     tags: [medicalrecords]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID del registro médico a eliminar.
 *     responses:
 *       200:
 *         description: Registro médico eliminado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Registro médico eliminado exitosamente"
 *       404:
 *         description: Registro médico no encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.delete('/:id', validateRequest(deleteMedicalRecordSchema), destroy);

module.exports = router;
