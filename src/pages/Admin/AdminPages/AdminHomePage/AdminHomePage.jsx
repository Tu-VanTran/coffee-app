import React from "react";
import NavBarAdmin from "../../../../components/layouts/NabarAdmin-Layout/components/NabarAdmin";
import Chart from "./Chart/Chart";
import { Featured } from "./Featured/Featured";
import './style.css'
import { Widget } from "./Widget/Widget";
function AdminHomePage() {
    return ( 
        <div className="home-admin">
            <NavBarAdmin/>
            <div className="home" >               
                <div className="widgets" >
                    <Widget type="order"/>
                    <Widget type="user"/>
                    <Widget type="earnning"/>
                    <Widget type="products"/>
                    
                </div>
                <div className="charts">
                    <Featured/>
                    <Chart/>
                </div>
                <div>
                </div>
            </div>
        </div>
     );
}

export default AdminHomePage;