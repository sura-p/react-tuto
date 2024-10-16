import React from "react";
const Sidebar = ({ user=[], loader=false ,onSelectUser}) => {
  // const users = [
  //   { name: 'John Doe', avatar: 'https://bootdey.com/img/Content/avatar/avatar1.png', time: '18:18' },
  //   { name: 'Jane Smith', avatar: 'https://bootdey.com/img/Content/avatar/avatar2.png', time: '18:18' },
  //   // Add more users here
  // ];

  return (
    <div class="row sideBar">
     
        {loader ? (
          <div className="loader" />
        ) : (
          user.map((user, index) => (
            <><div class="row sideBar-body" id={user._id} onClick={() => onSelectUser(user)} key={user._id}>
              <div class="col-sm-3 col-xs-3 sideBar-avatar">
                <div class="avatar-icon">
                  <img src={user.image} alt="profile" />
                </div>
              </div>
              <div class="col-sm-9 col-xs-9 sideBar-main">
                <div class="row">
                  <div class="col-sm-8 col-xs-8 sideBar-name">
                    <span class="name-meta">{user.username}</span>
                  </div>
                  <div class="col-sm-4 col-xs-4 pull-right sideBar-time">
                    <span class="time-meta pull-right">18:18111</span>
                  </div>
                </div>
              </div>
              </div>
            </>
          ))
        )}
       
    
    </div>
  );
};

export default Sidebar;
