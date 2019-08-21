import { Maybe, Nothing, Just, predicateMaybe, fmapMaybe, isJust, ignoreMaybe } from "./maybe";
import { User, UserPartial, Role } from "./models";

export class Database<K> {
  private dict : { [key: string] : K } = {};
  get(key: string) : Maybe<K> {
    let val = this.dict[key];
    if (val === undefined) return Nothing;
    return Just(val);
  };
  set(key: string, value: K) : void {
    this.dict[key] = value;
  }
}

export class UsersController {
  private database : Database<User>;
  private modelUser : User;

  constructor() {
    this.database = new Database<User>();
    this.modelUser = {
      id: "example-id",
      first: "example",
      last: "example",
      email: "example@example.com",
      role: Role.Member
    };
  }

  private storeUser(u : User) : void {
    this.database.set(u.id, u);
  }

  private userPartialToUser(up : UserPartial) : Maybe<User> {
    let partialKeysCount = Object.keys(up).length;
    let totalKeysCount = Object.keys(this.modelUser).length;
    if (partialKeysCount === totalKeysCount) return Just(up as User);
    return Nothing;
  }

  private validateUserEmail(u: User) : boolean {
    return u.email.includes('@') && u.email.includes('.');
  }

  private setUserDefaultRole(u : User) : User {
    u.role = Role.Member;
    return u;
  }

  addUser(values: UserPartial) : boolean {
    let result = ignoreMaybe(
                      predicateMaybe(
                              fmapMaybe(this.userPartialToUser(values),
                                        this.setUserDefaultRole),
                                        this.validateUserEmail),
                                        this.storeUser);
    return isJust(result);
  }
}
