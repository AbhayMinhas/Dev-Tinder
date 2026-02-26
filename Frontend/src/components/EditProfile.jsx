import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import axios from "axios";
import UserCard from "./UserCard";
import ProfleCard from "./ProfileCard";

const EditProfile = () => {
  const user = useSelector((store) => store.user);
  useEffect(() => {
  if (user) {
    setFirstName(user.firstName ?? "");
    setLastName(user.lastName ?? "");
    setAge(user.age ?? "");
    setAbout(user.about ?? "");
    setPhotoUrl(user.photoUrl ?? "");
    setGender(user.gender ?? "");
  }
}, [user]);


  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [age, setAge] = useState(user?.age || "");
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [about, setAbout] = useState(user?.about || "");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);
  // Sync local state whenever Redux user changes

  const saveProfile = async () => {
    //clear errors
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          photoUrl,
          age,
          gender,
          about,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      const i = setTimeout(() => {
        setShowToast(false);
      }, 3000);
      //no need for clear interval
    } catch (err) {
      setError(err.response.data);
    }
  };
  if (!user) {
    return <p>loading...</p>;
  }
  return (
    <>
      <div className="flex justify-center-safe">
        <div className="flex justify-center mx-8">
          <div className="card bg-base-300 w-96 shadow-sm">
            <div className="card-body">
              <h2 className="card-title justify-center">Edit Profile</h2>

              <div>
                <fieldset className="fieldset my-2">
                  <legend className="fieldset-legend">First Name:</legend>
                  <input
                    type="text"
                    value={firstName}
                    className="input"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset my-2">
                  <legend className="fieldset-legend">LastName </legend>
                  <input
                    type="text"
                    value={lastName}
                    className="input"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset my-2">
                  <legend className="fieldset-legend">Photo URL: </legend>
                  <input
                    type="text"
                    value={photoUrl}
                    className="input"
                    onChange={(e) => setPhotoUrl(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset my-2">
                  <legend className="fieldset-legend">Age: </legend>
                  <input
                    type="text"
                    value={age}
                    className="input"
                    onChange={(e) => setAge(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset my-2">
                  <legend className="fieldset-legend">Gender: </legend>
                  <select
                    value={gender || ""}
                    onChange={(e) => setGender(e.target.value)}
                    className="select"
                  >
                    <option
                      value=""
                      disabled
                    >
                      select a gender
                    </option>
                    <option value="male">male</option>
                    <option value="female">female</option>
                  </select>
                </fieldset>

                <fieldset className="fieldset my-2">
                  <legend className="fieldset-legend">About: </legend>

                  <textarea
                    type="text"
                    value={about}
                    className="textarea"
                    placeholder="about"
                    onChange={(e) => setAbout(e.target.value)}
                  ></textarea>
                </fieldset>
              </div>

              <p className="text-red-500">{error}</p>

              <div className="card-actions justify-center my-2">
                <button
                  className="btn btn-primary"
                  onClick={saveProfile}
                >
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>
        <ProfleCard
          user={{ firstName, lastName, photoUrl, age, gender, about }}
        />
      </div>

      {showToast && (
        <div className="toast toast-top toast-center pt-15">
          <div className="alert alert-success">
            <span>Profile saved sucessfully.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
