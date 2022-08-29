import React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './Featured.css'
export const Featured = () => {
    const value = 0.66;
    return (
      <div className="featured">
        <div className="top">
          <h1 className="title-name">Total Revenue</h1>
        </div>
        <div className="bottom">
          <div className="featuredChart">
            <CircularProgressbar value={value} maxValue={1} text={`${value * 100}%`} />;
          </div>
          <p className="title-name">Total sales made today</p>
          <p className="amount">$420</p>
          <p className="desc">
            Previous transactions processing. Last payments may not be included.
          </p>
          <div className="summary">
            <div className="item">
              <div className="itemTitle">Target</div>
              <div className="itemResult negative">
                
                <div className="resultAmount">$12.4k</div>
              </div>
            </div>
            <div className="item">
              <div className="itemTitle">Last Month</div>
              <div className="itemResult positive">
               
                <div className="resultAmount">$12.4k</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  