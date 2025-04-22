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
 *   name: TreatmentMedications
 *   description: Endpoints related to treatment medication operations
 */

/**
 * @swagger
 * /treatment-medications:
 *   get:
 *     summary: Retrieve all treatment medications
 *     tags: [TreatmentMedications]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of treatment medications.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/TreatmentMedication"
 */
router.get('/', getAll);

/**
 * @swagger
 * /treatment-medications:
 *   post:
 *     summary: Create a new treatment medication
 *     tags: [TreatmentMedications]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/TreatmentMedication"
 *     responses:
 *       201:
 *         description: Treatment medication created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/TreatmentMedication"
 *       400:
 *         description: Error creating treatment medication.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 */
router.post('/', validateRequest(createTreatmentMedicationSchema), save);

/**
 * @swagger
 * /treatment-medications/{id}:
 *   get:
 *     summary: Retrieve a treatment medication by ID
 *     tags: [TreatmentMedications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The treatment medication ID.
 *     responses:
 *       200:
 *         description: Treatment medication details.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/TreatmentMedication"
 *       404:
 *         description: Treatment medication not found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 */
router.get('/:id', validateRequest(readTreatmentMedicationSchema), getById);

/**
 * @swagger
 * /treatment-medications/{id}:
 *   put:
 *     summary: Update a treatment medication by ID
 *     tags: [TreatmentMedications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The treatment medication ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/TreatmentMedication"
 *     responses:
 *       200:
 *         description: Treatment medication updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/TreatmentMedication"
 *       404:
 *         description: Treatment medication not found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 */
router.put('/:id', validateRequest(updateTreatmentMedicationSchema), update);

/**
 * @swagger
 * /treatment-medications/{id}:
 *   delete:
 *     summary: Delete a treatment medication by ID
 *     tags: [TreatmentMedications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The treatment medication ID.
 *     responses:
 *       200:
 *         description: Treatment medication deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Treatment medication deleted successfully"
 *       404:
 *         description: Treatment medication not found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 */
router.delete('/:id', validateRequest(deleteTreatmentMedicationSchema), destroy);

module.exports = router;
