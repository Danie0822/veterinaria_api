const express = require('express');
const router = express.Router();
const {
    getAll,
    save,
    getById,
    update,
    destroy
} = require('../controllers/pets.controller');
const { checkAuth } = require('../middlewares/checkAuth'); // Import your auth middleware
const validateRequest = require('../utils/validateRequest');
const {
    createPetSchema,
    updatePetSchema,
    readPetSchema,
    deletePetSchema,
} = require('../validations/pets.schema.js'); // Ensure the file name matches

router.use(checkAuth('admin')); // Import the middleware for authentication by role the admin
/**
 * @swagger
 * tags:
 *   name: Pets
 *   description: Endpoints related to pet operations
 */

/**
 * @swagger
 * /pets:
 *   get:
 *     summary: Retrieve all pets
 *     tags: [Pets]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of pets.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Pet"
 */
router.get('/', getAll);
/**
 * @swagger
 * /pets:
 *   post:
 *     summary: Create a new pet
 *     tags: [Pets]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Pet"
 *     responses:
 *       201:
 *         description: Pet created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Pet"
 *       400:
 *         description: Error creating pet.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 */
router.post('/', validateRequest(createPetSchema), save);
/**
 * @swagger
 * /pets/{id}:
 *   get:
 *     summary: Retrieve a pet by ID
 *     tags: [Pets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The pet ID.
 *     responses:
 *       200:
 *         description: Pet details.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Pet"
 *       404:
 *         description: Pet not found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 */
router.get('/:id', validateRequest(readPetSchema), getById);
/**
 * @swagger
 * /pets/{id}:
 *   put:
 *     summary: Update a pet by ID
 *     tags: [Pets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The pet ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Pet"
 *     responses:
 *       200:
 *         description: Pet updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Pet"
 *       404:
 *         description: Pet not found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 */
router.put('/:id', validateRequest(updatePetSchema), update);
/**
 * @swagger
 * /pets/{id}:
 *   delete:
 *     summary: Delete a pet by ID
 *     tags: [Pets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The pet ID.
 *     responses:
 *       200:
 *         description: Pet deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Pet deleted successfully"
 *       404:
 *         description: Pet not found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 */
router.delete('/:id', validateRequest(deletePetSchema), destroy);

module.exports = router;