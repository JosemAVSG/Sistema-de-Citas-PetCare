import instance from "./axios";
export const registerRequest = async (data ) => {
    return await instance.post("/users/resgister", data);
}

export const loginRequest = async (data) => {
    return await instance.post("/users/login", data);
}

export const getUser = async (id) => {
   const data = await instance.get(`/users/${id}`);
   return data ;
}
export const verifyToken = async () => {
    return await instance.get("/verify");
}
export const changeUserImg = async (data) => {
   
    const file = {
        image: data.image
    }

    return await instance.put(`/users/${data.id}/image`, file ,{
        headers: {
            'Content-Type': 'multipart/form-data'

        }
    });
}