import UserController2 from "../src/controllers/userController2";
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

      const userController = new UserController2(userRepo);

      const returnedUser = await userController.GetById(fakeUser.id);

      expect(returnedUser).toEqual(fakeUser);
    });
  });
});
