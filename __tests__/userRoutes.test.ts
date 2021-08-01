import supertest from "supertest";
import { Container } from "typedi";
import UserController from "../src/controllers/UserController";
import UserController2 from "../src/controllers/userController2"
import server from "../src/loaders/server";
import { main } from "../src/main";
import { UserRepository } from "../src/repositories/userRepository";
jest.mock('../src/controllers/userController2.ts');
jest.mock('../src/repositories/userRepository.ts');

//This is not working for some reason
const requestWithSupertest = supertest(main);

describe('UserRoutes', () => {
  describe('GET /users/:id', () => {
    test('GET /users/1 should return existing user', async () => {
      const fakeUser = {
        id: 1,
        first_name: "Kyle",
        last_name: "Erikson",
      };
      const userRepo = new UserRepository();
      userRepo.findById = jest.fn().mockReturnValue(fakeUser);

      const mockedUserController = new UserController2(userRepo);

      Container.set(UserController2, mockedUserController);

      const res = await requestWithSupertest.get("/users/1");

      expect(res.status).toEqual(200);
      expect(res.headers["content-type"]).toEqual(
        "application/json; charset=utf-8"
      );
      expect(res.body).toEqual(fakeUser);
    })
  })
})