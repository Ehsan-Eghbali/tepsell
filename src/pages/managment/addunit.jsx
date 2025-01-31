import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUnits, addUnit, removeUnit } from '/src/store/managment/addunit/action';
import withRouter from '../../components/Common/withRouter';
import { options } from 'toastr';
import { createSelector } from "reselect";
const AddUnit = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchUnits());
  }, [dispatch]);
  // بررسی مقدار state و جلوگیری از undefined
  const ContactsProperties = createSelector(
    (state) => state.units,
    (unitReducer) => ({
        units: unitReducer.units,
    })
);
    const { units, loading, options } = useSelector(ContactsProperties);
    console.log(options)
  const [unitName, setUnitName] = useState('');
    const [isLoading, setLoading] = useState(loading);

  
  // console.log(units)
  const handleAddUnit = () => {
    if (unitName.trim()) {
      dispatch(addUnit({ name: unitName }));
      setUnitName('');
    }
  };

  const handleRemoveUnit = (id) => {
    dispatch(removeUnit(id));
  };

  return (
    <div className="unit-container">
      <h2>واحدها</h2>
      <input
        type="text"
        value={unitName}
        onChange={(e) => setUnitName(e.target.value)}
        placeholder="نام واحد"
      />
      <button onClick={handleAddUnit}>افزودن</button>

      {loading && <p>در حال بارگذاری...</p>}
      {/* {error && <p className="error"></p>} */}

      {units && units.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>نام واحد</th>
              <th>عملیات</th>
            </tr>
          </thead>
          <tbody>
            {units.map(unit => (
              <tr key={unit.id}>
                <td>{unit.name}</td>
                <td>
                  <button onClick={() => handleRemoveUnit(unit.id)}>حذف</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>هیچ واحدی وجود ندارد.</p>
      )}
    </div>
  );
};

export default withRouter(AddUnit);
