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
import { CgGirl } from "react-icons/cg";
import { FaUserCircle, FaEnvelope, FaBirthdayCake, FaPhone, FaVenusMars, FaEye, FaGenderless } from "react-icons/fa";
import { IUser } from "../types/userType";
import { fetchUserById } from "../apis/users.api";

export const UserById: React.FC = () => {
  const { id } = useParams();
  const loaderData = useLoaderData();
  const validId = !isNaN(Number(id));

  console.log("loaderData ", loaderData);

  const user = useQuery({
    queryKey: ["fetching-users", id],
    queryFn: () => fetchUserById(Number(id)),
    enabled: validId,
  });

  if (!validId || (user.error as AxiosError)?.status === 404) {
    return <Navigate to="/404" />;
  }

  return (
    <div className="px-2 py-8">
      <div className="flex flex-col bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-8">
          <img className="w-32 h-32 rounded-full object-cover" src={user.data?.image} alt={user.data?.username} />

          <div className="flex flex-col">
            <h1 className="text-2xl font-bold">{user.data?.username}</h1>
            <p className="text-gray-600 text-lg">{user.data?.age} years old</p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="flex items-center">
            <FaUserCircle className="text-gray-500 mr-2" />
            <p>{user.data?.username}</p>
          </div>
          <div className="flex items-center">
            <FaEnvelope className="text-gray-500 mr-2" />
            <p>{user.data?.email}</p>
          </div>
          <div className="flex items-center">
            <FaBirthdayCake className="text-gray-500 mr-2" />
            <p>BirthDate: {user.data?.birthDate}</p>
          </div>
          <div className="flex items-center">
            <FaVenusMars className="text-gray-500 mr-2" />
            <p>Blood Group: {user.data?.bloodGroup}</p>
          </div>
          <div className="flex items-center">
            <FaPhone className="text-gray-500 mr-2" />
            <p>Phone: {user.data?.phone}</p>
          </div>
          <div className="flex items-center">
            <FaEye className="text-gray-500 mr-2" />
            <p>Eye Color: {user.data?.eyeColor}</p>
          </div>
          <div className="flex items-center">
            <FaGenderless className="text-gray-500 mr-2" />
            <p>Gender: {user.data?.gender}</p>
          </div>
          <div className="flex items-center">
            <CgGirl  className="text-gray-500 mr-2" />
            <p>Hair: {user.data?.hair.color}, {user.data?.hair.type}</p>
          </div>
        </div>
        <div className="mt-6 flex justify-end space-x-4">
          <Link to={`user/${id}/posts`}>
            <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors">
              Posts
            </button>
          </Link>
        </div>
      </div>

      <div className="mt-6">
        <Outlet />
      </div>
    </div>
  );
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
