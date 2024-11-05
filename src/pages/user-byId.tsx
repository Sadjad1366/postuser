import { AxiosError } from "axios";
import { useQuery } from "@tanstack/react-query";
import {
  Navigate,
  useParams,
  useLoaderData,
  LoaderFunctionArgs,
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

  return <div className="flex flex-col p-4 gap-3">
<p className="font-semibold "> {user.data?.firstName}</p>
<p> {user.data?.lastName}</p>
  </div>;
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
