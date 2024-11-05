import { AxiosError } from "axios";
import { useQuery } from "@tanstack/react-query";
import {
  Navigate,
  useParams,
  useLoaderData,
  LoaderFunctionArgs,
  Link,
  Outlet,
} from "react-router-dom";

import { IUser } from "../types/userType";
import { fetchUserById } from "../apis/users.api";

export const UserById: React.FC = () => {
  const { id } = useParams();
  const loaderData = useLoaderData();
  const validId = !isNaN(Number(id));

  console.log("loaderData ",loaderData);

  const user = useQuery({
    queryKey: ["fetching-users", id],
    queryFn: () => fetchUserById(Number(id)),
    enabled: validId,
  });

  if (!validId || (user.error as AxiosError)?.status === 404) {
    return <Navigate to="/404" />;
  }

  return <><div className="flex flex-col p-4 gap-3 bg-slate-200">
<p className="font-semibold "> {user.data?.firstName} {user.data?.lastName}</p>
<p>username:{user.data?.username} </p>
<p>{user.data?.email} </p>
<img className="size-10" src={user.data?.image} alt="" />


  </div>
<div className="mt-3 px-2">
<div><Link to={`user/${id}/posts`}><button className=" bg-green-400 p-3 text-white rounded-lg">posts</button></Link></div>
<div><Outlet/></div>
</div>
  </>
};

export const fetchUserByIdLoader = async (data: LoaderFunctionArgs) => {
  let user: IUser | undefined = undefined;
  try {
    user = await fetchUserById(Number(data.params.id));
  } catch (error) {
    console.log("error", error);
  }
  return { user };
};
