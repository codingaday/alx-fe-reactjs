import React from "react";
import { Outlet } from "react-router-dom";

function Profile() {
  return (
    <div>
      <h2>Profile Page</h2>
      <nav>
        <ul>
          <li>
            <a href="/profile/details">Profile Details</a>
          </li>
          <li>
            <a href="/profile/settings">Profile Settings</a>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}

export default Profile;
