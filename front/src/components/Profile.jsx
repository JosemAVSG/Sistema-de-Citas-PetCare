import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import {useSelector, useDispatch } from "react-redux";
import imguser from "../assets/user.svg";
import { changeimage } from "../redux/slices/atuhSlice";
const Profile = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const handleEdit = (event) => {
    const file = event.target.files[0];
    const data ={
      image: file,
      id: user?.user?.id
    }
    dispatch(changeimage(data));
  };
  return (
    <>
      <section className=" flex items-center min-h-screen ">
        <div className="max-w-2xl mx-4 sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto mt-16 bg-white shadow-xl rounded-lg text-gray-900">
          <div className="rounded-t-lg h-32   overflow-hidden">
            <img
              className="object-cover object-top w-full"
              src="https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
              alt="Mountain"
            />
          </div>

          <div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full ">
            <img
              className="object-cover object-center w-32 h-32 rounded-full"
              src = {user.user.profileImage? user.user.profileImage : imguser}
              alt="Avatar"
            />

            <label htmlFor="file">
              <div
                
                className="absolute  -bottom-2 right-2 mr-2 mb-2 bg-blue-500 hover:bg-blue-700  font-bold py-1 px-2 rounded-full"
              >
                <FontAwesomeIcon className="text-white" icon={faPlus} />
              </div>
            </label>
            <input type="file" onChange={handleEdit} accept="image/png, image/gif, image/jpeg"  id="file" name="file" className="hidden" />
          </div>

          <div className="text-center mt-2">
            <h2 className="font-semibold">{user?.user?.name}</h2>
            <p className="text-gray-500">{user?.user?.email}</p>
          </div>
          <ul className="py-4 mt-2 text-gray-700 flex items-center justify-around">
            <li>DNI: {user?.user?.nDni}</li>
            <li>Birthdate:{user?.user?.birthdate}</li>
          </ul>
         
        </div>
      </section>
    </>
  );
};

export default Profile;
