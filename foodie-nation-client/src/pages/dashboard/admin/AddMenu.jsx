import React from "react";
import { FaUtensils } from "react-icons/fa";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from 'sweetalert2'

const AddMenu = () => {
  const { register, handleSubmit, reset } = useForm();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
  // console.log(image_hosting_key);
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('image', data.image[0]);

    try {
      const hostingImg = await axiosPublic.post(image_hosting_api, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (hostingImg.data.success) {
        const menuItem = {
          name: data.name,
          category: data.category,
          price: parseFloat(data.price),
          recipe: data.recipe,
          image: hostingImg.data.data.display_url,
        };

        const postMenuItem = await axiosSecure.post('/menu', menuItem);
        if (postMenuItem) {
          reset();
          Swal.fire({
            position: 'top-end',  
            icon: 'success',
            title: 'Item added successfully!',
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Failed to upload the item!',
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div className="w-full md:w-[870px] px-4 mx-auto">
      <h2 className="text-2xl font-semibold my-4">Upload A New Menu Item</h2>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Item Name *</span>
            </label>
            <input
              type="text"
              {...register("name", { required: true })}
              placeholder="Recipe Name"
              className="input input-bordered w-full"
            />
          </div>
          <div className="flex items-center gap-4">
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Category *</span>
              </label>
              <select
                {...register("category", { required: true })}
                className="select select-bordered"
                defaultValue="default"
              >
                <option disabled value="default">
                  Select a category
                </option>
                <option value="salad">Salad</option>
                <option value="soup">Soup</option>
                <option value="popular">Popular</option>
                <option value="MainCourse">Main Course</option>
                <option value="dessert">Dessert</option>
                <option value="drinks">Drinks</option>
                
              </select>
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Price *</span>
              </label>
              <input
                type="number"
                {...register("price", { required: true })}
                placeholder="Price"
                className="input input-bordered w-full"
              />
            </div>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Details</span>
            </label>
            <textarea
              {...register("recipe", { required: true })}
              className="textarea textarea-bordered h-24"
              placeholder="Item Description"
            ></textarea>
          </div>
          <div className="form-control w-full my-6">
            <input
              {...register("image", { required: true })}
              type="file"
              className="file-input w-full max-w-xs"
            />
          </div>
          <button className="btn bg-blue text-white px-6">
            Add Item <FaUtensils />
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddMenu;
