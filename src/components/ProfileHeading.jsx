import React from 'react';
const ProfileHeading = ({user, onSelectVisible}) => {
  const handleSelectVisible = () => {
    onSelectVisible(prevState => !prevState); 
  };

  return (
    <div class="row heading">
            <div class="col-sm-2 col-xs-3 heading-avatar">
              <div class="heading-avatar-icon">
                <img src={user.image} alt='profile'/>
              </div>
            </div> <div class="col-sm-4 col-xs-7 heading-name">
                  <a class="heading-name-meta">{user.firstName}</a>
                </div>
            <div class="col-sm-1 col-xs-1  heading-dot  pull-right">
              <i class="fa fa-ellipsis-v fa-2x  pull-right" aria-hidden="true"></i>
            </div>
            <div class="col-sm-2 col-xs-2 heading-compose  pull-right" >
              <i class="fa fa-comments fa-2x  pull-right" aria-hidden="true" onClick={handleSelectVisible}></i>
            </div>
          </div>
  );
};

export default ProfileHeading;
