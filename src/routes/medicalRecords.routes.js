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
 *   name: MedicalRecords
 *   description: Endpoints related to medical record operations
 */

/**
 * @swagger
 * /medical-records:
 *   get:
 *     summary: Retrieve all medical records
 *     tags: [MedicalRecords]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of medical records.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/MedicalRecord"
 */
router.get('/', getAll);

/**
 * @swagger
 * /medical-records:
 *   post:
 *     summary: Create a new medical record
 *     tags: [MedicalRecords]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/MedicalRecord"
 *     responses:
 *       201:
 *         description: Medical record created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/MedicalRecord"
 *       400:
 *         description: Error creating medical record.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 */
router.post('/', validateRequest(createMedicalRecordSchema), save);

/**
 * @swagger
 * /medical-records/{id}:
 *   get:
 *     summary: Retrieve a medical record by ID
 *     tags: [MedicalRecords]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The medical record ID.
 *     responses:
 *       200:
 *         description: Medical record details.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/MedicalRecord"
 *       404:
 *         description: Medical record not found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 */
router.get('/:id', validateRequest(readMedicalRecordSchema), getById);

/**
 * @swagger
 * /medical-records/{id}:
 *   put:
 *     summary: Update a medical record by ID
 *     tags: [MedicalRecords]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The medical record ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/MedicalRecord"
 *     responses:
 *       200:
 *         description: Medical record updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/MedicalRecord"
 *       404:
 *         description: Medical record not found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 */
router.put('/:id', validateRequest(updateMedicalRecordSchema), update);

/**
 * @swagger
 * /medical-records/{id}:
 *   delete:
 *     summary: Delete a medical record by ID
 *     tags: [MedicalRecords]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The medical record ID.
 *     responses:
 *       200:
 *         description: Medical record deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Medical record deleted successfully"
 *       404:
 *         description: Medical record not found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 */
router.delete('/:id', validateRequest(deleteMedicalRecordSchema), destroy);

module.exports = router;
