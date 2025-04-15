const CrudService = require('../services/crudService');
const catchErrors = require('../utils/tryCatch');
const ApiResponse = require('../utils/apiResponse');
const { Medication } = require('../models');

class MedicationController {
    static service = new CrudService(Medication);
    static routes = '/medications';

    static getAll = catchErrors(async (req, res, next) => {
        const data = await this.service.findAll();
        return ApiResponse.success(res, { data, route: this.routes, message: 'Medication list' });
    });


    static getById = catchErrors(async (req, res, next) => {
        const data = await this.service.findById(req.params.id);
        if (data) {
            return ApiResponse.success(res, { data, route: this.routes });
        }
        return ApiResponse.error(res, { error: 'Medication not found', route: this.routes, status: 404 });
    });

    static save = catchErrors(async (req, res, next) => {
        const isUnique = await this.service.isUnique('name', req.body.name);
        if (isUnique === false) {
            return ApiResponse.error(res, {
                error: 'El nombre ya existe, ingrese otro nombre',
                route: this.routes,
                status: 400
            });
        }
        const dataCreate = await this.service.create(req.body);
        if (dataCreate) {
            return ApiResponse.success(res, { data: dataCreate, route: this.routes, message: 'Medication created' });
        }
        return ApiResponse.error(res, { dataCreate, route: this.routes });
    });

    static update = catchErrors(async (req, res, next) => {
        const isUniqueForUpdate = await this.service.isUniqueForUpdate(req.params.id, 'name', req.body.name);
        if (isUniqueForUpdate === false) {
            return ApiResponse.error(res, {
                error: 'El nombre ya existe, ingrese otro nombre',
                route: this.routes,
                status: 400
            });
        }
        const dataUpdate = await this.service.update(req.params.id, req.body);
        if (dataUpdate) {
            return ApiResponse.success(res, { data: dataUpdate, route: this.routes, message: 'Medication updated' });
        }
        return ApiResponse.error(res, { error, route: this.routes });
    });

    static destroy = catchErrors(async (req, res, next) => {
        const deleted = await this.service.delete(req.params.id);
        if (deleted) {
            return ApiResponse.success(res, { route: this.routes, message: 'Medication deleted' });
        }
        return ApiResponse.error(res, { error: 'Medication not found', route: this.routes, status: 404 });
    });
}
module.exports = MedicationController;