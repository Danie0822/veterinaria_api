const express = require('express');
const router = express.Router();
const {
    getAll,
    save,
    getById,
    update,
    destroy
} = require('../controllers/appointments.controller');
const { checkAuth } = require('../middlewares/checkAuth');
const validateRequest = require('../utils/validateRequest');
const {
    createAppointmentSchema,
    updateAppointmentSchema,
    readAppointmentSchema,
    deleteAppointmentSchema,
} = require('../validations/appointments.schema.js');

router.use(checkAuth('admin'));

/**
 * @swagger
 * tags:
 *   name: appointments
 *   description: Endpoints para gestionar las citas
 */

/**
 * @swagger
 * /appointments:
 *   get:
 *     summary: Obtiene la lista de todas las citas
 *     tags: [appointments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de citas.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Appointment'
 */
router.get('/', getAll);

/**
 * @swagger
 * /appointments:
 *   post:
 *     summary: Crea una nueva cita
 *     tags: [appointments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Appointment'
 *     responses:
 *       201:
 *         description: Cita creada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Appointment'
 *       400:
 *         description: Error en la creación de la cita.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/', validateRequest(createAppointmentSchema), save);

/**
 * @swagger
 * /appointments/{id}:
 *   get:
 *     summary: Obtiene una cita por su ID
 *     tags: [appointments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID de la cita a obtener.
 *     responses:
 *       200:
 *         description: Detalles de la cita.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Appointment'
 *       404:
 *         description: Cita no encontrada.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/:id', validateRequest(readAppointmentSchema), getById);

/**
 * @swagger
 * /appointments/{id}:
 *   put:
 *     summary: Actualiza una cita por su ID
 *     tags: [appointments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID de la cita a actualizar.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Appointment'
 *     responses:
 *       200:
 *         description: Cita actualizada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Appointment'
 *       404:
 *         description: Cita no encontrada.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.put('/:id', validateRequest(updateAppointmentSchema), update);

/**
 * @swagger
 * /appointments/{id}:
 *   delete:
 *     summary: Elimina una cita por su ID
 *     tags: [appointments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID de la cita a eliminar.
 *     responses:
 *       200:
 *         description: Cita eliminada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Cita eliminada exitosamente"
 *       404:
 *         description: Cita no encontrada.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.delete('/:id', validateRequest(deleteAppointmentSchema), destroy);

module.exports = router;
