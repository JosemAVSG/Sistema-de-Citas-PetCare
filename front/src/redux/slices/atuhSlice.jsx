import Cookie from 'js-cookie';
import {loginRequest, registerRequest, verifyToken,getUser, changeUserImg} from "../../api/auth";
import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isAuthenticated: false,
  user:null,
  errors: null,
  loading: true,
  userId:null 
  
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    UserId(state, action) {
      return {
        ...state,
        userId: action.payload
      }
    },
    Loading(state, action) {
      return {
        ...state,
        loading: action.payload,
      };
    },
    setError(state, action) {
      return {
        ...state,
        errors: action.payload,
      };
    },
    Authentication(state, action) {
      return {
        ...state,
        isAuthenticated: action.payload,
      };
    },
    User(state, action) {
      return {
        ...state,
        user: action.payload
      };
    },
    RegisterSucces(state, action) {
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    },
    LoginSucces(state, action) {
      return {
        ...state,
        isAuthenticated: true,
        errors: null,
        user: action.payload,
      };
    },
    LoginFail (state, action) {
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        errors: action.payload
      }
    },
    RegisterFail (state, action) {
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        errors: action.payload
      }
    },
    cleanError(state) {
      return {
        ...state,
        errors: null
      }
    }
  },
});

export const signupUser = (userData )=> {
    return async (dispatch) => {
      try {
        const res = await registerRequest(userData);
        console.log(res.data);
        dispatch(RegisterSucces(res.data));
      } catch (error) {
        dispatch(RegisterFail(error ));
      }
    };
  };
  
  export const signinUser = (userData)=> {
    return async (dispatch) => {
      try {
        const res = await loginRequest(userData);
        dispatch(LoginSucces(res.data));
        dispatch(verifyTokenAction()); // Verificar token después 6de iniciar sesión
      } catch (error) {
        dispatch(LoginFail(error));
      }
    };
  };

  export const verifyTokenAction = ()=> {
    return async (dispatch) => {

      const cookies = Cookie.get();
      try {
        if(!cookies.token){
          dispatch(Authentication(false));
          dispatch(Loading(false));
          return
        }
        const res = await verifyToken();
        if (!res.data){
          dispatch(Authentication(false));
        } 
        dispatch(Authentication(true));
        dispatch(Loading(false));
        const {decoded:{id}} = res.data
        dispatch(UserId(id));
        const user= await getUser(id);
        dispatch(User({login:true, user:user.data}));
      } catch (error) {
        dispatch(Authentication(false));
        dispatch(Loading(false));
      }
    
    };
  
  };
  export const changeimage =  (data) => {
   
    return async (dispatch) => {
      try {
        const res = await changeUserImg(data);
        console.log(res.data);
        dispatch(verifyTokenAction());
      } catch (error) {
        console.log(error);
      }
      
    }
  }

  export const logout = () => {
    return async (dispatch) => {
      Cookie.remove("token");
      dispatch(Authentication(false));
      dispatch(Loading(false));
    }
  }
export const { RegisterSucces, UserId , setError, LoginSucces, LoginFail, RegisterFail, Loading, Authentication, User, cleanError} = authSlice.actions;
export default authSlice.reducer