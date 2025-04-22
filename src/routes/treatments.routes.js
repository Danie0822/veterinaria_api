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
 *   name: Treatments
 *   description: Endpoints related to treatment operations
 */

/**
 * @swagger
 * /treatments:
 *   get:
 *     summary: Retrieve all treatments
 *     tags: [Treatments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of treatments.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Treatment"
 */
router.get('/', getAll);

/**
 * @swagger
 * /treatments:
 *   post:
 *     summary: Create a new treatment
 *     tags: [Treatments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Treatment"
 *     responses:
 *       201:
 *         description: Treatment created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Treatment"
 *       400:
 *         description: Error creating treatment.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 */
router.post('/', validateRequest(createTreatmentSchema), save);

/**
 * @swagger
 * /treatments/{id}:
 *   get:
 *     summary: Retrieve a treatment by ID
 *     tags: [Treatments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The treatment ID.
 *     responses:
 *       200:
 *         description: Treatment details.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Treatment"
 *       404:
 *         description: Treatment not found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 */
router.get('/:id', validateRequest(readTreatmentSchema), getById);

/**
 * @swagger
 * /treatments/{id}:
 *   put:
 *     summary: Update a treatment by ID
 *     tags: [Treatments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The treatment ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Treatment"
 *     responses:
 *       200:
 *         description: Treatment updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Treatment"
 *       404:
 *         description: Treatment not found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 */
router.put('/:id', validateRequest(updateTreatmentSchema), update);

/**
 * @swagger
 * /treatments/{id}:
 *   delete:
 *     summary: Delete a treatment by ID
 *     tags: [Treatments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The treatment ID.
 *     responses:
 *       200:
 *         description: Treatment deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Treatment deleted successfully"
 *       404:
 *         description: Treatment not found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 */
router.delete('/:id', validateRequest(deleteTreatmentSchema), destroy);

module.exports = router;
