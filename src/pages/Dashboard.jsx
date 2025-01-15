import AdminDashboard from '../components/AdminDashboard'
import UserDashboard from '../components/UserDashboard'


const Dashboard = ({userData}) => {

  return (
    <>
    {userData?.user_type==="user"?<UserDashboard userData={userData}/>:<AdminDashboard userData={userData}/>}
    </>
  );
};

export default Dashboard;
