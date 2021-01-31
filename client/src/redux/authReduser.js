const LOGIN = 'authReuser/LOGIN';
const LOGOUT = 'authReuser/LOGOUT';
const SET_LOADED = 'authReuser/SET-LOADED';
const SET_TOKEN = 'authReuser/SET-TOKEN';
const SET_USER_ID = 'authReuser/SET-LOADED';
const SET_LOGIN = 'authReuser/SET-LOGIN';

let init = {
    token: null,
    userId: null,
    loaded: false,
    login: () => { },
    isAuth: false
};

const authReduser = (state = init, action) => {
    switch (action.type) {
        case LOGOUT:
            localStorage.removeItem('userData')
            return { ...state, token: null, userId: null }
        case SET_LOADED:
            return { ...state, loaded: action.loaded }
        case SET_TOKEN:
            return { ...state, token: action.token }
        case SET_USER_ID:
            return { ...state, userId: action.userId }
        case SET_LOGIN:
            return { ...state, login: action.login }
        default:
            return state
    }
}

export const login = (jwtToken, id) => ({ type: LOGIN, jwtToken, id });
export const logout = () => ({ type: LOGOUT, });
export const setLoaded = (loaded) => ({ type: SET_LOADED, loaded });
export const setToken = (token) => ({ type: SET_TOKEN, token });
export const setUserId = (userId) => ({ type: SET_USER_ID, userId });
export const setLogin = (login) => ({ type: SET_LOGIN, login });


export default authReduser