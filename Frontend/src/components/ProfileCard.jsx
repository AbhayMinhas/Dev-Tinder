import React from "react";

const ProfleCard = ({ user }) => {
  const { _id, firstName, lastName, photoUrl, age, gender, about } = user;

  return (
    <div className="card bg-base-300 w-96 shadow-sm">
      <figure>
        {photoUrl && (
          <img
            src={photoUrl}
            alt="photo"
          />
        )}
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        <p>{age && gender && age + ", " + gender}</p>
        <p>{about}</p>
      </div>
    </div>
  );
};

export default ProfleCard;
