import { FaCarSide,FaGitter, FaCoffee, FaRegUserCircle, FaUserAlt, FaElementor } from 'react-icons/fa';
import { MdDashboard, } from "react-icons/md";
import { BsFillCalendarFill } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import { NavLink } from 'react-router-dom';
import React from 'react';
import { USER_ID } from '../../../../stores/slices/user.slice';
import './style.css';

const NavAdmin = () => {
  const image = USER_ID.image
  const name = USER_ID.name
  return (
    <div className="sidebar">
      <div className="top">
        <NavLink className='avatar' to="/dashboard" style={{ textDecoration: "none" }}>
          <img src={image}></img><span className="logo">{name}</span>
        </NavLink>
      </div>
      <hr />
      <nav className="center">
        <ul>
          <span className='title-name'>Main</span>
          <NavLink to="/dashboard" style={{ textDecoration: "none" }}>
            <li>
              <span><MdDashboard className="icon" /></span>
              <span>Dashboard</span>
            </li>
          </NavLink>
          <span className='title-name'>Products</span>
          <NavLink to="/admin/product" style={{ textDecoration: "none" }}>
            <li>
              <span><FaElementor className="icon" /></span>
              <span>Products</span>
            </li>
          </NavLink>
          <NavLink to="/admin/order" style={{ textDecoration: "none" }}>
            <li>
              <span><BsFillCalendarFill className="icon" /></span>
              <span>Orders</span>
            </li>
          </NavLink>
          <NavLink to="/admin/delivery" style={{ textDecoration: "none" }}>
            <li>
              <span>  <FaCarSide className="icon" /></span>
              <span>Delivery</span>
            </li>
          </NavLink>
          <NavLink to="/admin/statistics" style={{ textDecoration: "none" }}>
            <li>
              <span>   <FaGitter className="icon" /></span>
              <span>Statistics</span>
            </li>
          </NavLink>
          <span className='title-name'>User</span>
          <NavLink to="/admin/user" style={{ textDecoration: "none" }}>
            <li>
              <span>  <FaUserAlt className="icon" /></span>
              <span>User</span>
            </li>
          </NavLink>
          <NavLink to="/" style={{ textDecoration: "none" }}>
            <li>
              <span>   <FiLogOut className="icon" /></span>
              <span>Logout</span>
            </li>
          </NavLink>
        </ul>
      </nav>

    </div>
  );
};

export default NavAdmin;