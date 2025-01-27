import {
  GET_USERS_SUCCESS,
  GET_USERS_FAIL,
  ADD_USER_SUCCESS,
  ADD_USER_FAIL,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  GET_USER_PROFILE_SUCCESS,
  GET_USER_PROFILE_FAIL, GET_OPTIONS, GET_OPTIONS_SUCCESS, GET_OPTIONS_FAIL,
} from "./actionTypes"

const INIT_STATE = {
  users: [],
  userProfile: {},
  error: {},
  loading: false,

  // می‌توانیم برای نگه‌داشتن دیتاهای دریافتی از /preData از این فیلد استفاده کنیم
  options: {
    teams: [],
    units: [],
    employmentStatuses: [],
  },
};

const contacts = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_OPTIONS:
      return {
        ...state,
        loading: true,
      };

    case GET_OPTIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        // در پاسخ API شما، آبجکتی دارید که employmentStatuses، teams و units در آن هست.
        // می‌توانید مستقیماً همان را در استور بگذارید یا اگر خواستید جداگانه ذخیره کنید.
        options: {
          ...state.options,
          employmentStatuses: action.payload.employmentStatuses,
          teams: action.payload.teams,
          units: action.payload.units,
        },
      };

    case GET_OPTIONS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case GET_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload,
        loading: true
      }

    case GET_USERS_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case ADD_USER_SUCCESS:

      return {
        ...state,
        users: [action.payload, ...state.users],
      }

    case ADD_USER_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case GET_USER_PROFILE_SUCCESS:
      return {
        ...state,
        userProfile: action.payload,
      }

    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        users: state.users.map(user =>
          user.id.toString() === action.payload.id.toString()
            ? { user, ...action.payload }
            : user
        ),
      }

    case UPDATE_USER_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case DELETE_USER_SUCCESS:
      return {
        ...state,
        users: state.users.filter(
          user => user.id.toString() !== action.payload.toString()
        ),
      }

    case DELETE_USER_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case GET_USER_PROFILE_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    default:
      return state
  }
}

export default contacts
