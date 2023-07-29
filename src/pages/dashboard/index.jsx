import React from 'react';
import { connect } from 'umi';
import AnalyticsCards from './AnalyticsCards';

import styles from './index.less';

const DashBoard = () => {
  // useEffect(() => {
  //   if (['vendor', 'partner'].includes(user.role)) {
  //     // dispatch({
  //     //   type: 'vendor/getStats',
  //     // });
  //     console.log('implement vendor dashboard');
  //   } else {
  //     dispatch({
  //       type: 'event/getStats',
  //     });
  //   }
  // }, [dispatch, user.role]);

  return (
    <div className=" ">
      <div className={styles.DashBoard}>
        {/* {['vendor', 'partner'].includes(user.role) ? (
          <VendorAnalytics />
        ) : ( */}
        <div className="mb-8">
          <AnalyticsCards />
        </div>
        {/* )} */}
      </div>
    </div>
  );
};

export default connect(({ user }) => ({
  user: user.currentUser,
}))(DashBoard);
