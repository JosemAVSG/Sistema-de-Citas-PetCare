
import instance from "./axios";

export const getTurns = async () => {
    return await instance.get("/turns");
}
export const createTurn = async (data) => {
    return await instance.post("/turns/schedule", data);
}

export const cancelTurn = async (id) => {
    return await instance.put(`/turns/cancel/${id}`);
}

export const getTurnById = async (id) => {
    return await instance.get(`/turns/${id}`);
}

export const getTurnByUserId = async (id) => {
    return await instance.get(`/turns/user/${id}`);
}