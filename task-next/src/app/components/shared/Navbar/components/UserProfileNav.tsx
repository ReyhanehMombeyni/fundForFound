import { useState } from "react";
import UserProfileModals from "./UserProfileModals";
import { PiUserCircleFill } from "react-icons/pi";

const UserProfileNav: React.FC = ( profileType ) => {
  const [showModals, setShowModals] = useState(false);

  const closeModals = () => setShowModals(false);
  return (
    <>
      {profileType === 1 ? (
        <div>
          <div onClick={() => setShowModals(true)}>
            <div className="p-1 rounded-full border-2 border-solid border-gray-200 bg-gray-100 text-blue-800 text-sm">
              AM
            </div>
          </div>
          {showModals && <UserProfileModals closeModals={closeModals} />}
        </div>
      ) : (
        <div className="rounded-full bg-gray-100 text-gray-300 text-5xl">
          <PiUserCircleFill />
        </div>
      )}
    </>
  );
};

export default UserProfileNav;
