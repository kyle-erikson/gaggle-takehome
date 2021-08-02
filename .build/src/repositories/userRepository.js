"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const typedi_1 = require("typedi");
const typeorm_1 = require("typeorm");
const userModel_1 = require("../models/userModel");
const Repository_1 = require("typeorm/repository/Repository");
let UserRepository = class UserRepository extends Repository_1.Repository {
    findById(id) {
        return this.findOne(id, {
            where: {
                first_name: typeorm_1.Not(typeorm_1.IsNull()),
                last_name: typeorm_1.Not(typeorm_1.IsNull())
            }
        });
    }
    searchForUsers(searchTerm) {
        const users = this.createQueryBuilder("user")
            .where('user.first_name IS NOT NULL')
            .andWhere('user.last_name IS NOT NULL')
            .andWhere(`LOWER(CONCAT(user.first_name, ' ', user.last_name)) LIKE '%${searchTerm.toLowerCase()}%'`)
            .getMany();
        return users;
    }
};
UserRepository = __decorate([
    typedi_1.Service(),
    typeorm_1.EntityRepository(userModel_1.User)
], UserRepository);
exports.UserRepository = UserRepository;
