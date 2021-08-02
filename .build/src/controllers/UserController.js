"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const userRepository_1 = require("../repositories/userRepository");
const logger_1 = __importDefault(require("../logger"));
let UserController = class UserController {
    constructor(userRepository) {
        this.userRepository = userRepository;
        this.GetById = async (id) => {
            let user = undefined;
            try {
                user = await this.userRepository.findById(id);
            }
            catch (error) {
                logger_1.default.error(error);
                throw { statusCode: 500, message: error.message };
            }
            if (!user) {
                const message = `No user found for id: ${id}`;
                logger_1.default.warn(message);
                throw {
                    statusCode: 404,
                    message,
                };
            }
            return user;
        };
        this.SearchForUser = async (searchTerm) => {
            let users = [];
            try {
                users = await this.userRepository.searchForUsers(searchTerm);
            }
            catch (error) {
                throw { statusCode: 500, message: error.message };
            }
            if (users.length <= 0) {
                const message = `No user(s) found for search term: ${searchTerm}`;
                logger_1.default.warn(message);
                throw {
                    statusCode: 404,
                    message,
                };
            }
            return users;
        };
    }
};
UserController = __decorate([
    typedi_1.Service(),
    __param(0, typeorm_typedi_extensions_1.InjectRepository()),
    __metadata("design:paramtypes", [userRepository_1.UserRepository])
], UserController);
exports.default = UserController;
