import React from 'react';

const index = () => {
  return <div>index</div>;
};

export default index;

// /* eslint-disable no-underscore-dangle */
// import { Col, Row, Avatar } from 'antd';
// import React, { useEffect, useState } from 'react';
// import { getInitials } from '@/utils/common';
// import leadsIcon from '@/assets/icons/leads.png';
// import allLeads from '@/assets/icons/allLeads.png';
// import { connect, useHistory } from 'umi';
// import { getLeadStats } from '@/services/event';

// const VendorAnalytics = ({ currentUser }) => {
//   // make stats state
//   const [stats, setStats] = useState({
//     my_leads: 0,
//     all_leads: 0,
//   });
//   useEffect(() => {
//     getLeadStats().then((res) => {
//       setStats(res);
//     });
//   }, []);
//   const history = useHistory();
//   const cards = [
//     {
//       name: 'My Leads',
//       key: 'my_leads',
//       icon: leadsIcon,
//       value: stats.myLeadsCount,
//       route: '/leads/my',
//     },
//     {
//       name: 'All Leads',
//       key: 'all_leads',
//       icon: allLeads,
//       value: stats.allLeadsCount,
//       route: '/leads/list',
//     },
//   ];
//   return (
//     <div className="">
//       <div className="flex justify-between">
//         <div className="text-2xl font-semibold text-gray-700 mb-4">
//           <Avatar
//             size="large"
//             className="bg-blue-800 w-8 uppercase"
//             style={{
//               backgroundColor: '#126E32',
//             }}
//           >
//             <div className="text-lg">{getInitials(currentUser?.name)}</div>
//           </Avatar>
//           <span className="text-gray-900 ml-2"> Hi {currentUser?.name}, Welcome Back!</span>
//         </div>
//         {/* <div className="mt-1">
//           <Link to="/service-user/create">
//             <Button type="primary" size="medium">
//               Create Service User <PlusSquareOutlined />
//             </Button>
//           </Link>
//         </div> */}
//       </div>
//       <div className="mt-4">
//         <Row gutter={[24, 24]} className="">
//           {cards.map((card) => (
//             <Col xl={8} lg={8} md={12} sm={24} xs={24} key={card?.key}>
//               <button onClick={() => { history.push(card.route) }} className="border-0  w-full cursor-pointer">
//                 <div
//                   className="shadow-lg rounded-lg  py-4  px-4 flex items-center justify-between"
//                   style={{ background: 'linear-gradient(135deg, #184e68 0%,#57ca85 100%)' }}
//                 >
//                   <div className="">
//                     <div className="text-lg text-white font-bold">{card.name}</div>
//                     <div className="text-3xl text-white font-bold">{card?.value || 0}</div>
//                   </div>
//                   <div className="">
//                     <img src={card.icon} alt="icon" className="h-16 w-16 contain" />
//                   </div>
//                 </div>
//               </button>
//             </Col>
//           ))}
//         </Row>
//       </div>
//     </div>
//   );
// };

// export default connect(({ user, event, order }) => ({
//   currentUser: user.currentUser,
//   orderList: order.orderList,
//   vendors: event.vendors,
// }))(VendorAnalytics);
