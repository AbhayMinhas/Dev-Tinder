import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";
import { motion, useMotionValue, useTransform } from "framer-motion";

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, photoUrl, age, gender, about, skills } = user;
  const dispatch = useDispatch();
  const [exitX, setExitX] = useState(0);

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);

  const handleSendRequest = async (status, userId) => {
    try {
      await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDragEnd = (event, info) => {
    if (Math.abs(info.offset.x) > 100) {
      setExitX(info.offset.x > 0 ? 200 : -200);
      const status = info.offset.x > 0 ? "interested" : "ignored";
      handleSendRequest(status, _id);
    }
  };

  return (
    <div className="relative w-full max-w-sm h-[70vh] mt-[4vh] mb-[10vh] flex items-center justify-center">
      <motion.div
        className="absolute w-full cursor-grab active:cursor-grabbing"
        style={{
          x,
          rotate,
          opacity,
        }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={handleDragEnd}
        animate={exitX !== 0 ? { x: exitX } : {}}
        transition={{ duration: 0.3 }}
      >
        <div className="card bg-slate-800/90 backdrop-blur-xl shadow-2xl overflow-hidden border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300">
          <figure className="h-[30vh] overflow-hidden relative">
            {photoUrl && (
              <>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent z-10"></div>
                <img
                  src={photoUrl}
                  alt={`${firstName} ${lastName}`}
                  className="w-full h-full object-cover"
                />
              </>
            )}
          </figure>
          <div className="card-body bg-gradient-to-b from-slate-800/95 to-slate-900/95 backdrop-blur-sm pb-4">
            <h2 className="card-title text-2xl text-slate-100">
              {firstName} {lastName}
              {age && <span className="text-base font-normal text-slate-400">, {age}</span>}
            </h2>
            {gender && (
              <p className="text-sm text-slate-400 capitalize flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                {gender}
              </p>
            )}
            {about && <p className="text-base mt-2 text-slate-300 leading-relaxed">{about}</p>}
            {skills && skills.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {skills.map((skill, index) => (
                  <span 
                    key={index} 
                    className="px-3 py-1 text-xs font-medium rounded-full bg-gradient-to-r from-purple-600/20 to-pink-600/20 text-purple-300 border border-purple-500/30 backdrop-blur-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}
            
            {/* Instruction text inside card */}
            <div className="mt-4 pt-4 border-t border-slate-700/50">
              <div className="flex items-center justify-center gap-3 px-4 py-2 bg-slate-700/30 backdrop-blur-sm rounded-full">
                <span className="text-rose-400 font-semibold text-lg">←</span>
                <span className="text-xs text-slate-300 font-medium">Swipe to decide</span>
                <span className="text-emerald-400 font-semibold text-lg">→</span>
              </div>
            </div>
          </div>
        </div>

        {/* Swipe indicators with darker theme */}
        <motion.div
          className="absolute top-10 left-10 text-5xl font-black text-rose-400 border-4 border-rose-400/80 px-6 py-3 rotate-[-20deg] pointer-events-none backdrop-blur-sm bg-slate-900/50 rounded-xl shadow-2xl"
          style={{
            opacity: useTransform(x, [-100, -50, 0], [1, 0.5, 0]),
          }}
        >
          NOPE
        </motion.div>
        <motion.div
          className="absolute top-10 right-10 text-5xl font-black text-emerald-400 border-4 border-emerald-400/80 px-6 py-3 rotate-[20deg] pointer-events-none backdrop-blur-sm bg-slate-900/50 rounded-xl shadow-2xl"
          style={{
            opacity: useTransform(x, [0, 50, 100], [0, 0.5, 1]),
          }}
        >
          LIKE
        </motion.div>
      </motion.div>
    </div>
  );
};

export default UserCard;
