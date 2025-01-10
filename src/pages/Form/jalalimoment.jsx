import React from 'react';
import moment from 'jalali-moment';

const PersianDateComponent = () => {
  const today = moment().locale('fa').format('YYYY/MM/DD'); // تاریخ امروز به جلالی
  const customDate = moment('2024-12-30', 'YYYY-MM-DD').locale('fa').format('jYYYY/jMM/jDD'); // تبدیل تاریخ خاص

  return (
    <div>
      <h2>تاریخ امروز:</h2>
      <p>{today}</p>
      <h2>تاریخ خاص (۳۰ دسامبر ۲۰۲۴):</h2>
      <p>{customDate}</p>
    </div>
  );
};

export default PersianDateComponent;
