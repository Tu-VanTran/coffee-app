import React from "react";
import NavBarAdmin from "../../../../components/layouts/NabarAdmin-Layout/components/NabarAdmin";
import Chart from "./Chart/Chart";
import { Featured } from "./Featured/Featured";
import './style.css'
import { Widget } from "./Widget/Widget";
import { IoNotifications } from "react-icons/io5";
import { BsMessenger } from "react-icons/bs";
import logoTag from "../../../../assets/logo-tag.png"
import { useSelector } from "react-redux";

function AdminHomePage() {
    const users = useSelector(state => state.user.userInfoState)
    const avatar = users?.data.image
    return (
        <div className="home-admin">
            <NavBarAdmin />
            <div className="home" >
                <div className="the-coffee" >
                    <h2 style={{ float: 'left' }}><img src={logoTag} />The Coffee House</h2>
                    <p>
                        <span><BsMessenger style={{transform: 'translate(50%, 35%)'}}/></span>
                        <span><IoNotifications style={{transform: 'translate(50%, 35%)'}}/></span>
                        <img style={{ width: '40px', borderRadius: '50%' }} src={avatar} />
                    </p>
                </div>
                <div className="widgets" >
                    <Widget type="order" color='rgb(187, 247, 146)' />
                    <Widget type="user" color='rgb(118, 239, 248)' />
                    <Widget type="earnning" color='rgb(252, 164, 164)' />
                    <Widget type="products" color='rgb(250, 243, 152)' />

                </div>
                <div className="charts">
                    <Featured />
                    <Chart />
                </div>
                <div>
                </div>
            </div>
        </div>
    );
}

export default AdminHomePage;