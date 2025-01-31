import {
  FETCH_UNITS_REQUEST,
  FETCH_UNITS_SUCCESS,
  FETCH_UNITS_FAILURE,
  ADD_UNIT_REQUEST,
  ADD_UNIT_SUCCESS,
  ADD_UNIT_FAILURE,
  REMOVE_UNIT_REQUEST,
  REMOVE_UNIT_SUCCESS,
  REMOVE_UNIT_FAILURE
} from './actionTypes';

  
  export const fetchUnits = () => ({
    type: FETCH_UNITS_REQUEST,
  });
  
  export const fetchUnitsSuccess = (units) => ({
    type: FETCH_UNITS_SUCCESS,
    payload: units,
  });
  
  export const fetchUnitsFailure = (error) => ({
    type: FETCH_UNITS_FAILURE,
    payload: error,
  });
  
  export const addUnit = (unit) => ({
    type: ADD_UNIT_REQUEST,
    payload: unit,
  });
  
  export const addUnitSuccess = (unit) => ({
    type: ADD_UNIT_SUCCESS,
    payload: unit,
  });
  
  export const addUnitFailure = (error) => ({
    type: ADD_UNIT_FAILURE,
    payload: error,
  });
  
  export const removeUnit = (unitId) => ({
    type: REMOVE_UNIT_REQUEST,
    payload: unitId,
  });
  
  export const removeUnitSuccess = (unitId) => ({
    type: REMOVE_UNIT_SUCCESS,
    payload: unitId,
  });
  
  export const removeUnitFailure = (error) => ({
    type: REMOVE_UNIT_FAILURE,
    payload: error,
  });
  