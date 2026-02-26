import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";
import { useNavigate } from "react-router-dom";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!feed) return null;

  if (feed.length <= 0)
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] px-4 pt-2 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="text-center backdrop-blur-sm bg-slate-800/30 p-12 rounded-3xl border border-slate-700/50 shadow-2xl">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 blur-3xl"></div>
            <svg
              className="w-28 h-28 mx-auto mb-6 text-slate-400 relative z-10"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            No More Profiles
          </h2>
          <p className="text-slate-400 text-lg">
            You've seen everyone! Check back soon for new developers.
          </p>
        </div>
      </div>
    );

  return (
    <div className="flex justify-center items-start min-h-[calc(100vh-8rem)] px-4 pt-2 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Ambient background effects */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl"></div>
      
      <div className="relative w-full max-w-sm z-10 h-[650px]">
        {/* Stack of cards - show up to 3 cards like playing cards */}
        {feed.slice(0, 3).map((user, index) => {
          const rotations = [0, -3, -6]; // Slight rotation for each card
          const offsets = [
            { x: 0, y: 0 },      // Front card
            { x: -8, y: -12 },   // Second card
            { x: -16, y: -24 }   // Third card
          ];
          
          return (
            <div
              key={user._id}
              className="absolute w-full transition-all duration-300"
              style={{
                zIndex: 3 - index, // Front card has highest z-index
                transform: `
                  rotate(${rotations[index]}deg) 
                  translateX(${offsets[index].x}px) 
                  translateY(${offsets[index].y}px)
                `,
                transformOrigin: 'bottom center',
                opacity: index === 0 ? 1 : 0.6,
                pointerEvents: index === 0 ? "auto" : "none",
              }}
            >
              {index === 0 && <UserCard user={user} />}
              {index > 0 && (
                <div className="card bg-slate-800/70 backdrop-blur-sm border border-slate-700/50 shadow-2xl h-[600px] overflow-hidden">
                  <figure className="h-80 overflow-hidden bg-gradient-to-br from-slate-700/40 to-slate-800/40">
                    <div className="w-full h-full flex items-center justify-center">
                      <svg className="w-20 h-20 text-slate-600/30" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </figure>
                  <div className="card-body bg-gradient-to-b from-slate-800/95 to-slate-900/95">
                    <div className="h-8 w-3/4 bg-slate-700/30 rounded animate-pulse"></div>
                    <div className="h-4 w-1/2 bg-slate-700/20 rounded animate-pulse mt-2"></div>
                    <div className="h-16 w-full bg-slate-700/20 rounded animate-pulse mt-3"></div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Feed;
