import React from 'react';

const UserCard = ({ name, avatar, time }) => {
  return (
    <div className="row sideBar-body">
      <div className="col-sm-3 col-xs-3 sideBar-avatar">
        <img src={avatar} alt="User Avatar" />
      </div>
      <div className="col-sm-9 col-xs-9 sideBar-main">
        <div className="row">
          <div className="col-sm-8 col-xs-8 sideBar-name">
            <span className="name-meta">{name}</span>
          </div>
          <div className="col-sm-4 col-xs-4 pull-right sideBar-time">
            <span className="time-meta pull-right">{time}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
