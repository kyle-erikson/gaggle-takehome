"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserController_1 = __importDefault(require("../src/controllers/UserController"));
const userRepository_1 = require("../src/repositories/userRepository");
jest.mock("../src/repositories/userRepository.ts");
describe("UserController", () => {
    describe("GetById", () => {
        test("Find user for id = 1, should return user", async () => {
            const fakeUser = {
                id: 1,
                first_name: "Kyle",
                last_name: "Erikson",
            };
            const userRepo = new userRepository_1.UserRepository();
            userRepo.findById = jest.fn().mockReturnValue(fakeUser);
            const userController = new UserController_1.default(userRepo);
            const returnedUser = await userController.GetById(fakeUser.id);
            expect(returnedUser).toEqual(fakeUser);
        });
    });
});
