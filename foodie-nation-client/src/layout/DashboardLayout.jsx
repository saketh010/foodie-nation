import React from 'react'
import { Outlet } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { MdDashboard } from "react-icons/md";
import { FaLocationArrow, FaQuestionCircle, FaUser } from "react-icons/fa";
import { FaBasketShopping, FaCartShopping } from "react-icons/fa6";
import { IoIosAddCircle } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import logo from "/logo.png";
import { MdDashboardCustomize } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import Login from "../components/Login";
import useAdmin from "../hooks/useAdmin";
import useAuth from '../hooks/useAuth';

const sharedLinks=(
  <>
    <li className='mt-3'>
      <Link to="/">
        <MdDashboard />Home
      </Link>
    </li>
    <li>
      <Link to="/menu"><FaCartShopping/>Menu</Link>
    </li>
    <li>
      <Link to="/menu"><FaLocationArrow/>Orders Tracking</Link>
    </li>
    <li>
      <Link to="/menu"><FaQuestionCircle/>Customer Support</Link>
    </li>
  </>
)

const DashboardLayout = () => {
  const{loading}=useAuth();
  const [isAdmin,isAdminLoading]=useAdmin();

  return (
    <div>
      {
        isAdmin ? <div className="drawer sm:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col sm:items-start sm:justify-start my-2">
            {/* Page content here */}
            <div className='flex items-center justify-between mx-4'>
              <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">
                <MdDashboardCustomize />
              </label>
            
              <button className='btn rounded-full px-6 bg-blue flex items-center gap-2 text-white sm:hidden'>
                <FaRegUser />Log Out
              </button>
            </div>
            <div className='mt-5 md:mt-2 mx-4'>
              <Outlet/>
            </div>
          </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
          <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
            <li>
              <Link to='/dashboard' className='flex justify-start mb-3'>
                <img src={logo} alt="" className='w-20'></img>
                <span className="badge badge-primary">admin</span>
              </Link>
            </li>
            <hr/>
            {/* Sidebar content here */}
            <li className='mt-3'><Link to="/dashboard"><MdDashboard />Dashboard</Link></li>
            <li><Link to="/dashboard"><FaBasketShopping />Manage Orders</Link></li>
            <li><Link to="/dashboard/add-menu"><IoIosAddCircle />Add Menu</Link></li>
            <li><Link to="/dashboard/manage-items"><FaEdit />Manage Items</Link></li>
            <li className='mb-3'><Link to="/dashboard/users"><FaUser />All Users</Link></li>

            {/* shared nav links */}
            {
              sharedLinks
            }
          </ul>
        </div>
      </div>: <Login/>
      }
    </div>
  )
}

export default DashboardLayout