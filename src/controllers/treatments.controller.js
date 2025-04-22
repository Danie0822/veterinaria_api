const CrudService = require('../services/crudService');
const catchErrors = require('../utils/tryCatch');
const ApiResponse = require('../utils/apiResponse');
const { Pet, User, Treatment } = require('../models');

class TreatmentsController {
    static service = new CrudService(Treatment);
    static routes = '/treatments';

    static includes = [
        {
            model: Pet,
            as: 'pet',
            attributes: ['id', 'name']
        },
        {
            model: User,
            as: 'assignedBy',
            attributes: ['id', 'full_name', 'email']
        }
    ];

    static getAll = catchErrors(async (req, res, next) => {
        const data = await this.service.findAll({ include: this.includes });
        return ApiResponse.success(res, { data, route: this.routes, message: 'Treatment list' });
    });

    static getById = catchErrors(async (req, res, next) => {
        const data = await this.service.findById(req.params.id, { include: this.includes });
        if (data) {
            return ApiResponse.success(res, { data, route: this.routes });
        }
        return ApiResponse.error(res, { error: 'Treatment not found', route: this.routes, status: 404 });
    });

    static save = catchErrors(async (req, res, next) => {
        const dataCreate = await this.service.create(req.body);
        if (dataCreate) {
            return ApiResponse.success(res, { data: dataCreate, route: this.routes, message: 'Treatment created' });
        }
        return ApiResponse.error(res, { dataCreate, route: this.routes });
    });

    static update = catchErrors(async (req, res, next) => {
        const dataUpdate = await this.service.update(req.params.id, req.body);
        if (dataUpdate) {
            return ApiResponse.success(res, { data: dataUpdate, route: this.routes, message: 'Treatment updated' });
        }
        return ApiResponse.error(res, { error, route: this.routes });
    });

    static destroy = catchErrors(async (req, res, next) => {
        const success = await this.service.delete(req.params.id);
        if (success) {
            ApiResponse.success(res, { route: this.routes, message: 'Treatment deleted' });
        }
        return ApiResponse.error(res, { error: 'Treatment not found', route: this.routes, status: 404 });
    });
}

module.exports = TreatmentsController;
