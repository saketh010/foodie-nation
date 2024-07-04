import React from 'react'
import useMenu from '../../../hooks/useMenu'
import menu from '../../menuPage/Menu';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import Swal from "sweetalert2";
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const ManageItems = () => {
  const [menu, , refetch] = useMenu();
  const axiosSecure = useAxiosSecure();
  const handleDeleteItem = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async(result) => {
      if (result.isConfirmed) {
        const res=await axiosSecure.delete(`/menu/${item._id}`);
        refetch();
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });
    console.log(item);
  };


  return (
    <div className="w-full md:w-[870px] px-4 mx-auto">
      <h2 className="text-2xl font-semibold my-4">Manage Menu</h2>
      {/* menu table  */}
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>
                  #
                </th>
                <th>Image</th>
                <th>Item Name</th>
                <th>Price</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {
                menu.map((item, index) => (
                  <tr key={index}>
                    <th>{index + 1}
                    </th>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <img src={item.image} alt="" />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{item.name}</td>
                    <td>₹{item.price}</td>
                    <td>
                      <Link to={`/dashboard/update-menu/${item._id}`}><button className="btn btn-ghost bg-pink-500 text-white btn-xs"><FaEdit /></button></Link>
                    </td>
                    <td>
                      <button onClick={() => handleDeleteItem(item)} className="btn btn-ghost btn-xs text-white"><FaTrashAlt /></button>
                    </td>
                  </tr>
                ))
              }
              {/* row 1 */}

            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ManageItems