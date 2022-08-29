import React, { useEffect, useState } from "react";
import './NavbarUserAdmin.css'
import { useDispatch, useSelector } from "react-redux";
import { fetchUserAction } from "stores/slices/user.slice";
import { BiUserCheck, BiUserCircle, BiUserX } from "react-icons/bi";


function NavbarUserAdmin() {
    const [showSearch, setShowSearch] = useState(false);
    const listUser = useSelector(state => state.user.userInfoState.dataUser)
    console.log("🚀 ~ file: NavbarUserAdmin.jsx ~ line 11 ~ NavbarUserAdmin ~ listUser", listUser)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchUserAction())
    })
    
    return (     
            <div className="user-admin-layout" >
                <h2>Manager User</h2>
                <div className="icon-user">
                    <p style={{color:'blue'}}><BiUserCircle/></p><span >{listUser.length}</span>
                    <p style={{color:'green'}}><BiUserCheck/></p><span >{listUser.length}</span>
                    <p style={{color:'red'}}><BiUserX/></p><span >{listUser.length}</span>                  
                </div>
            </div>
       
     );
}

export default NavbarUserAdmin;