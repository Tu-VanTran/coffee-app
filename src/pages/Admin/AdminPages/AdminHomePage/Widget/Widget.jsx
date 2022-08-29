import {FaGitter, FaCoffee, FaUserAlt, FaElementor } from 'react-icons/fa'; 
import { BsFillCalendarFill } from "react-icons/bs";
import { MdExpandLess } from "react-icons/md";
import './Widget.css';
import { Link } from 'react-router-dom';
import React from 'react';
export const Widget = ({ type }) => {
    let data;
  
    //temporary
    const amount = 100;
    const diff = 20;
  
    switch (type) {
      case "user":
        data = {
          title: "USERS",
          link: "See all users",
          icon: (
            <FaUserAlt
              className="icon"
              style={{
                color: "blue",
                backgroundColor: "rgba(255, 0, 0, 0.2)",
              }}
            />
          ),
        };
        break;
      case "order":
        data = {
          title: "ORDERS",
          link: "View all orders",
          icon: (
            <BsFillCalendarFill
              className="icon"
              style={{
                backgroundColor: "rgba(218, 165, 32, 0.2)",
                color: "green",
              }}
            />
          ),
        };
        break;
      case "earnning":
        data = {
          title: "EARNING",
          link: "View net earnings",
          icon: (
            <FaGitter
              className="icon"
              style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "red" }}
            />
          ),
        };
        break;
      case "products":
        data = {
          title: "PRODUCTS",
          link: "See all products",
          icon: (
            <FaCoffee
              className="icon"
              style={{
                backgroundColor: "rgba(128, 0, 128, 0.2)",
                color: "gold",
              }}
            />
          ),
        };
        break;
      
      default:
        break;
    }
  
    return (
      <div className="widget">
        <div className="left">
          <span className="name-title">{data.title}</span>
          <span className="counter">{amount}</span>
          <span className="link"><Link to="">{data.link}</Link></span>
        </div>
        <div className="right">
          <div className="percentage positive">
            <MdExpandLess />
            {diff} %
          </div>
          {data.icon}
        </div>
      </div>
    );
  };