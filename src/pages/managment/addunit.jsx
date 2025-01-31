import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUnits, addUnit, removeUnit } from '/src/store/managment/addunit/action';
import withRouter from '../../components/Common/withRouter';
import { createSelector } from 'reselect';

const AddUnit = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        // Fetch units as soon as the component mounts
        dispatch(fetchUnits());
    }, [dispatch]);

    // Reselect selector:
    //  - Extract the `units`, `loading`, and `error` fields from state.units (your unitReducer).
    const unitsSelector = createSelector(
        (state) => state.addUnit, // نام درست ریدوسر در rootReducer
        (unitReducer) => ({
            units: unitReducer?.units || [], // بررسی مقدار `undefined`
            loading: unitReducer?.loading || false,
            error: unitReducer?.error || null
        })
    );
    // Use the selector in useSelector
    const { units, loading, error } = useSelector(unitsSelector);

    // Local state for the new unit name
    const [unitName, setUnitName] = useState('');

    const handleAddUnit = () => {
        if (unitName.trim()) {
            // Dispatch the addUnit action to Redux Saga
            dispatch(addUnit({ name: unitName }));
            setUnitName('');
        }
    };

    const handleRemoveUnit = (id) => {
        // Dispatch the removeUnit action to Redux Saga
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
            {error && <p className="error">خطا در دریافت داده‌ها: {error}</p>}

            {units && units.length > 0 ? (
                <table>
                    <thead>
                    <tr>
                        <th>نام واحد</th>
                        <th>عملیات</th>
                    </tr>
                    </thead>
                    <tbody>
                    {units.map((unit) => (
                        <tr key={unit.ID}>
                            <td>{unit.name}</td>
                            <td>
                                <button onClick={() => handleRemoveUnit(unit.id)}>حذف</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            ) : (
                !loading && <p>هیچ واحدی وجود ندارد.</p>
            )}
        </div>
    );
};

export default withRouter(AddUnit);
