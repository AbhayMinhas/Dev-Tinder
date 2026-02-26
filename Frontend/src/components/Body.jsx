import React from "react";
import NavBar from "./NavBar";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useEffect } from "react";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);

  const fetchUser = async () => {
    //fetch profile of user and update the store
    if (userData) return;
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (err) {
      if (err.status === 400) {
        navigate("/login");
      }
      console.error(err);
      //otherwise for some other errors you can make an error page and redirect to that error page. handle error properly 
    }
  };
  //once component is loaded this will happen on first load of the component
  useEffect(() => {
   
      fetchUser();
   
  }, []);

  return (
    <div>
      <div className="fixed w-full z-50">

      <NavBar />
      </div>
      <main className="pt-18 pb-20 ">

      <Outlet />
      </main>
      {/* Child route content will render here */}
      <div className="fixed w-full z-50">

      <Footer />
      </div>
    </div>
  );
};

export default Body;
