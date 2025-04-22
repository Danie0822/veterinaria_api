const CrudService = require('../services/crudService');
const catchErrors = require('../utils/tryCatch');
const ApiResponse = require('../utils/apiResponse');
const { Treatment, Medication, TreatmentMedication } = require('../models');

class TreatmentMedicationsController {
    static service = new CrudService(TreatmentMedication);
    static routes = '/treatment-medications';

    static includes = [
        {
            model: Treatment,
            as: 'treatment',
            attributes: ['id', 'details']
        },
        {
            model: Medication,
            as: 'medication',
            attributes: ['id', 'name']
        }
    ];

    static getAll = catchErrors(async (req, res, next) => {
        const data = await this.service.findAll({ include: this.includes });
        return ApiResponse.success(res, { data, route: this.routes, message: 'Treatment Medication list' });
    });

    static getById = catchErrors(async (req, res, next) => {
        const data = await this.service.findById(req.params.id, { include: this.includes });
        if (data) {
            return ApiResponse.success(res, { data, route: this.routes });
        }
        return ApiResponse.error(res, { error: 'Treatment Medication not found', route: this.routes, status: 404 });
    });

    static save = catchErrors(async (req, res, next) => {
        const dataCreate = await this.service.create(req.body);
        if (dataCreate) {
            return ApiResponse.success(res, { data: dataCreate, route: this.routes, message: 'Treatment Medication created' });
        }
        return ApiResponse.error(res, { dataCreate, route: this.routes });
    });

    static update = catchErrors(async (req, res, next) => {
        const dataUpdate = await this.service.update(req.params.id, req.body);
        if (dataUpdate) {
            return ApiResponse.success(res, { data: dataUpdate, route: this.routes, message: 'Treatment Medication updated' });
        }
        return ApiResponse.error(res, { error, route: this.routes });
    });

    static destroy = catchErrors(async (req, res, next) => {
        const success = await this.service.delete(req.params.id);
        if (success) {
            ApiResponse.success(res, { route: this.routes, message: 'Treatment Medication deleted' });
        }
        return ApiResponse.error(res, { error: 'Treatment Medication not found', route: this.routes, status: 404 });
    });
}

module.exports = TreatmentMedicationsController;
