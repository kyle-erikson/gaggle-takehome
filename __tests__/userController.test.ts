import UserController from "../src/controllers/UserController";
import { User } from "../src/models/userModel";
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
    });
  });
});
