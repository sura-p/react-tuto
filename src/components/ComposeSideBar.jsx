import React from 'react'

function ComposeSideBar({user,onSelectUser,loader=false}) {
  return (
    <div class="row sideBar">
     
    {loader ? (
      <div className="loader" />
    ) : (
      user.map((user, index) => (
        <><div class="row sideBar-body" id={user.id} onClick={() => onSelectUser(user)}>
          <div class="col-sm-3 col-xs-3 sideBar-avatar">
            <div class="avatar-icon">
              <img src={user.image} alt="profile" />
            </div>
          </div>
          <div class="col-sm-9 col-xs-9 sideBar-main">
            <div class="row">
              <div class="col-sm-8 col-xs-8 sideBar-name">
                <span class="name-meta">{user.firstName}</span>
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

  )
}

export default ComposeSideBar