import { User, Role, UserPartial } from "./models";
import { UsersController } from "./api";

function main() {
  let control = new UsersController();

  let testUser1 = {
    first: "evan",
    last: "evan",
    id: "evan-evan",
    email: "evan@evan.com",
    role: Role.TeamCaptain
  };

  // Should succeed
  let status = control.addUser(testUser1 as UserPartial);

  let testUser2 = {
    first: "nave",
    last: "nave"
  };

  // Should fail
  let status2 = control.addUser(testUser2 as UserPartial);

  let testUser3 = {
    first: "evan",
    last: "derby",
    id: "evan-derby",
    email: "evan-derby", // bad
    role: Role.Member
  };

  // Should also fail
  let status3 = control.addUser(testUser3 as UserPartial);
}