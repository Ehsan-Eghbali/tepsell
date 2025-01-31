import {
    FETCH_UNITS_REQUEST,
    FETCH_UNITS_SUCCESS,
    FETCH_UNITS_FAILURE,
    ADD_UNIT_SUCCESS,
    REMOVE_UNIT_SUCCESS
  } from './actionTypes';
  
  const initialState = {
    units: [],
    loading: false,
    error: null,
  };
  
  const unitReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_UNITS_REQUEST:
        return { ...state, loading: true };
      case FETCH_UNITS_SUCCESS:
        return { ...state, loading: false, units: action.payload };
      case FETCH_UNITS_FAILURE:
        return { ...state, loading: false, error: action.payload };
  
      case ADD_UNIT_SUCCESS:
        return { ...state, units: [...state.units, action.payload] };
  
      case REMOVE_UNIT_SUCCESS:
        return { ...state, units: state.units.filter(unit => unit.id !== action.payload) };
  
      default:
        return state;
    }
  };
  
  export default unitReducer;
  