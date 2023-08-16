import { UserRepository } from "./user.repository";
import { UserModel } from "./user.model";
import { Result } from "../base/resultModel";
import { PagincationModel } from "../base/paginationModel";

export class UserService {
  constructor(private readonly userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async loginUser(
    email: string,
    password: string
  ): Promise<Result<UserModel | null>> {
    return this.userRepository.loginUser(email, password);
  }

  public async getbyId(userId: number): Promise<Result<UserModel | null>> {
    return this.userRepository.getById(userId);
  }

  public async getUsers(
    pageSize: number,
    pageIndex: number,
    keyword?: string
  ): Promise<Result<PagincationModel<UserModel>>> {
    return this.userRepository.getUsers(pageSize, pageIndex, keyword);
  }

  public async getAllUsers(): Promise<Result<UserModel[]>> {
    return this.userRepository.getAllUsers();
  }

  public updateUser = async (
    userDetail: UserModel
  ): Promise<Result<UserModel | null>> => {
    return this.userRepository.updateUser(userDetail);
  };

  public createUser = async (userDetail: UserModel) => {
    return this.userRepository.createUser(userDetail);
  };

  public deleteUser = async (userId: number) => {
    return this.userRepository.deleteUser(userId);
  };
}
