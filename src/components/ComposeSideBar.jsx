import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addPeer } from '../features/connectedUser/cUThunk';
import { useCuAddLoading, useCuLoading } from '../hooks/selectors/cuSelector';

function ComposeSideBar({user,onSelectUser,loader=false}) {
  const [view,setView] = useState(false)
const dispatch = useDispatch();
const loading = useCuAddLoading();
  const handleAdd = (data) => {
    dispatch(addPeer(data))
    setView(true)
  }
  return (
    <div class="row sideBar">
     
    {loader ? (
      <div className="loader" />
    ) : (
      user.peer.map((user, index) => (
        <><div class="row sideBar-body" id={user._id} onClick={() => onSelectUser(user)}>
          <div class="col-sm-3 col-xs-3 sideBar-avatar">
            <div class="avatar-icon">
            <img src={`${process.env.REACT_APP_BACKEND_URL}/uploads/${user.image}`||"https://dummyjson.com/icon/emilys/128"} alt="profile" />
            </div>
          </div>
          <div class="col-sm-9 col-xs-9 sideBar-main">
            <div class="row">
              <div class="col-sm-8 col-xs-8 sideBar-name">
                <span class="name-meta">{user.username}</span>
              </div>
              <div class="col-sm-4 col-xs-4 pull-right sideBar-time">
                {!loading? view ?<i class="fa fa-check" aria-hidden="true"></i>:<i class="fa fa-plus time-meta pull-right" aria-hidden="true" onClick={()=>handleAdd(user)}></i>:
                <i class="fa fa-spinner spinner" aria-hidden="true"></i>}
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