const express = require('express');
const router = express.Router();
const {
    getAll,
    save,
    getById,
    update,
    destroy
} = require('../controllers/medications.controller.js');
const { checkAuth } = require('../middlewares/checkAuth'); // Import your auth middleware
const validateRequest = require('../utils/validateRequest');
const {
    readRequestSchema,
    createRequestSchema,
    updateRequestSchema,
    deleteRequestSchema,
} = require('../validations/medications.schema.js'); // Ensure the file name matches

router.use(checkAuth('admin')); // Import the middleware for authentication by role the admin
/**
 * @swagger
 * tags:
 *   name: Medications
 *   description: Endpoints related to medication operations
 */

/**
 * @swagger
 * /medications:
 *   get:
 *     summary: Retrieve all medications
 *     tags: [Medications]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of medications.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Medication"
 */
router.get('/', getAll);
/**
 * @swagger
 * /medications:
 *   post:
 *     summary: Create a new medication
 *     tags: [Medications]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Medication"
 *     responses:
 *       201:
 *         description: Medication created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Medication"
 *       400:
 *         description: Error creating medication.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 */
router.post('/', validateRequest(createRequestSchema), save);
/**
 * @swagger
 * /medications/{id}:
 *   get:
 *     summary: Retrieve a medication by ID
 *     tags: [Medications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The medication ID.
 *     responses:
 *       200:
 *         description: Medication details.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Medication"
 *       404:
 *         description: Medication not found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 */
router.get('/:id', validateRequest(readRequestSchema), getById);
/**
 * @swagger
 * /medications/{id}:
 *   put:
 *     summary: Update a medication by ID
 *     tags: [Medications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The medication ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Medication"
 *     responses:
 *       200:
 *         description: Medication updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Medication"
 *       404:
 *         description: Medication not found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 */
router.put('/:id', validateRequest(updateRequestSchema), update);
/**
 * @swagger
 * /medications/{id}:
 *   delete:
 *     summary: Delete a medication by ID
 *     tags: [Medications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The medication ID.
 *     responses:
 *       200:
 *         description: Medication deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Medication deleted successfully"
 *       404:
 *         description: Medication not found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 */
router.delete('/:id', validateRequest(deleteRequestSchema), destroy);

module.exports = router;