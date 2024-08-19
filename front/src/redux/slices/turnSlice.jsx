import { createSlice } from "@reduxjs/toolkit";
import {  cancelTurn, createTurn, getTurnByUserId} from "../../api/turn";

const initialState = {
    userTurns: [],
    loading: true,
    error: null
};

const turnSlice = createSlice({
  name: "turn",
  initialState,
  reducers: {
    gettingTurns: (state, action) => {
        return {
            ...state,
            // loading: false,
            userTurns: action.payload

        }
    },
    setError: (state, action) => {
        return {
            ...state,
            // loading: false,
            error: action.payload

        }
    },
    setLoading: (state) => {
      state.loading = true;
    },
  },
});

export const turnsAction = (id)=> {
    return async (dispatch) => {
      try {  
        dispatch(setLoading());  
        const res   = await getTurnByUserId(id);
        // if(!res.data) throw new Error('No hay turnos');
        dispatch(gettingTurns(res.data));
      } catch (error) {
          dispatch(setError(error)); 
      }
    }
  }

  export const createTurnAction = (data) => {
    return async (dispatch) => {
      try {   
        dispatch(setLoading());
        const res   = await createTurn(data);
        const turn   = await getTurnByUserId(data.userId);
        console.log(res.data);
        console.log(turn.data);
        dispatch(gettingTurns(turn.data));
      } catch (error) {
          dispatch(setError(error )); 
      }
    }
  }

  export const cancelTurnAction = (id, userid)=> {
   
    return async (dispatch) => {
      try {    
        dispatch(setLoading());
        const res = await cancelTurn(id);
        const data  = await getTurnByUserId(userid);
        console.log(res.data);
        console.log(data.data);
        dispatch(gettingTurns(data.data));
      } catch (error) {
        console.log(error);
          dispatch(setError(error)); 
      }
    }

  }

  const { gettingTurns, setError, setLoading } = turnSlice.actions;
  export default turnSlice.reducer