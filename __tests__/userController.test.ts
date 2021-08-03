import UserController from "../src/controllers/userController";
import { QueryError } from "../src/interfaces/errors";
import logger from "../src/logger";
import { User } from "../src/models/user.entity";
import { UserRepository } from "../src/repositories/userRepository";
jest.mock("../src/repositories/userRepository.ts");

describe("UserController", () => {
  describe("GetById", () => {
    test("Find user for id = 1, should return user", async () => {
      const fakeUser = {
        id: 1,
        first_name: "Kyle",
        last_name: "Erikson",
      };
      const userRepo = new UserRepository();
      userRepo.findById = jest.fn().mockReturnValue(fakeUser);

      const userController = new UserController(userRepo);

      const returnedUser = await userController.GetById(fakeUser.id);

      expect(returnedUser).toEqual(fakeUser);
      expect(userRepo.findById).toHaveBeenCalledTimes(1);
    });

    test("No user exists for id, should throw 404 error", async () => {
      const fakeUser = {
        id: 999,
        first_name: "Kyle",
        last_name: "Erikson",
      };
      const userRepo = new UserRepository();
      userRepo.findById = jest.fn().mockReturnValue(undefined);

      const userController = new UserController(userRepo);
      try {
        await userController.GetById(fakeUser.id);
      } catch (error) {
        expect(userRepo.findById).toHaveBeenCalledTimes(1);
        expect(error).toEqual({
          message: `No user found for id: ${fakeUser.id}`,
          statusCode: 404,
        } as QueryError);
      }
    });

    test("Server error when searching for user, should throw 500 error", async () => {
      const fakeUser = {
        id: 999,
        first_name: "Kyle",
        last_name: "Erikson",
      };
      const userRepo = new UserRepository();
      const errorMessage = "Server error";
      userRepo.findById = jest.fn().mockImplementation(() => {
        throw new Error(errorMessage);
      });

      const userController = new UserController(userRepo);
      try {
        await userController.GetById(fakeUser.id);
      } catch (error) {
        expect(userRepo.findById).toHaveBeenCalledTimes(1);
        expect(error).toEqual({
          message: errorMessage,
          statusCode: 500,
        } as QueryError);
      }
    });
  });

  describe("SearchForUser", () => {
    test("Find users for search term, should return multiple users", async () => {
      const fakeUsers = [
        {
          id: 1,
          first_name: "Kyle",
          last_name: "Erikson",
        },
        {
          id: 2,
          first_name: "Kyle",
          last_name: "Reece",
        },
      ];
      const userRepo = new UserRepository();
      userRepo.searchForUsers = jest.fn().mockReturnValue(fakeUsers);

      const userController = new UserController(userRepo);

      const returnedUser = await userController.SearchForUser("kyle");

      expect(returnedUser).toEqual(fakeUsers);
      expect(userRepo.searchForUsers).toHaveBeenCalledTimes(1);
    });

    test("No users exist for search term, should throw 404 error", async () => {
      const userRepo = new UserRepository();
      userRepo.searchForUsers = jest.fn().mockReturnValue([]);

      const userController = new UserController(userRepo);
      const searchTerm = "john";
      try {
        await userController.SearchForUser(searchTerm);
      } catch (error) {
        expect(userRepo.searchForUsers).toHaveBeenCalledTimes(1);
        expect(error).toEqual({
          message: `No user(s) found for search term: ${searchTerm}`,
          statusCode: 404,
        } as QueryError);
      }
    });

    test("Server error when searching for users, should throw error", async () => {
      const userRepo = new UserRepository();
      const errorMessage = "Server error";
      userRepo.searchForUsers = jest.fn().mockImplementation(() => {
        throw new Error(errorMessage);
      });

      const userController = new UserController(userRepo);
      const searchTerm = "john";
      try {
        await userController.SearchForUser(searchTerm);
      } catch (error) {
        expect(userRepo.searchForUsers).toHaveBeenCalledTimes(1);
        expect(error).toEqual({
          message: errorMessage,
          statusCode: 500,
        } as QueryError);
      }
    });
  });

  describe("GetAllUsers", () => {
    test("Get all users, should return array of users", async () => {
      const fakeUsers = [
        {
          id: 1,
          first_name: "Kyle",
          last_name: "Erikson",
        },
        {
          id: 2,
          first_name: "Kyle",
          last_name: "Reece",
        },
      ];
      const userRepo = new UserRepository();
      userRepo.find = jest.fn().mockReturnValue(fakeUsers);

      const userController = new UserController(userRepo);

      const returnedUser = await userController.GetAllUsers();

      expect(returnedUser).toEqual(fakeUsers);
      expect(userRepo.find).toHaveBeenCalledTimes(1);
    });

    test("No users exist in database, should throw 404 error", async () => {
      const userRepo = new UserRepository();
      userRepo.find = jest.fn().mockReturnValue([]);

      const userController = new UserController(userRepo);
      try {
        await userController.GetAllUsers();
      } catch (error) {
        expect(userRepo.find).toHaveBeenCalledTimes(1);
        expect(error).toEqual({
          message: `No user(s) found.`,
          statusCode: 404,
        } as QueryError);
      }
    });

    test("Server error when getting all users, should throw error", async () => {
      const userRepo = new UserRepository();
      const errorMessage = "Server error";
      userRepo.find = jest.fn().mockImplementation(() => {
        throw new Error(errorMessage);
      });

      const userController = new UserController(userRepo);
      try {
        await userController.GetAllUsers();
      } catch (error) {
        expect(userRepo.find).toHaveBeenCalledTimes(1);
        expect(error).toEqual({
          message: errorMessage,
          statusCode: 500,
        } as QueryError);
      }
    });
  });
});
