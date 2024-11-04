import { IResDto } from "../types/globalType";
import { IPost } from "../types/posts.type";
import { IUser } from "../types/userType";
import { generateClient } from "./client";
import { urls } from "./urls";

interface IFetchUsersResDto extends IResDto {
      users: IUser[]
}
interface IFetchPostsResDto extends IResDto {
      posts: IPost[]
}
type fetchUsersListsType = ()=> Promise<IFetchUsersResDto>;
export const fetchUsersLists:fetchUsersListsType = async() => {
      const client = generateClient();
      const response = await client.get<IFetchUsersResDto>(urls.users.users)

      return response.data;
}

type fetchPostsListType = (skip: number, limit: number) => Promise<IFetchPostsResDto>;
export const fetchPostsList: fetchPostsListType = async (skip, limit) => {
  const client = generateClient();
  const response = await client.get<IFetchPostsResDto>(`${urls.posts.list}?skip=${skip}&limit=${limit}`);
  return response.data;
};

type fetchPostByIdType = (_: number) => Promise<IPost>;
export const fetchPostById: fetchPostByIdType = async (id: number) => {
  const client = generateClient();
  const response = await client.get<IPost>(urls.posts.byId(id));
  return response.data;
};

type fetchUserByIdType = (_: number) => Promise<IUser>;
export const fetchUserById: fetchUserByIdType = async (id: number) => {
  const client = generateClient();
  const response = await client.get<IUser>(urls.users.byId(id));
  return response.data;
};
