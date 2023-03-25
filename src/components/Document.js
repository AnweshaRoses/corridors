import React from "react";
import "./document.css";
import { useState } from "react";

const Document = () => {
  const [dateValue, Setdatevalue] = useState({
    datecreated: "",
    developer: "",
    reviewer: "",
    lastReviewDate: "",
  });
  return (
    <>
      <div className="container">
        <h1 className="headline">Model Risk Management Document</h1>
        <div className="headingContainer">
          <div className="names">
            <p>Credit line Decrease Model: Version 1</p>
            <p>Model Group: Customer Evaluation Model</p>
            <p> Dummy Date{dateValue.datecreated}</p>
            <p>Dummy developer{dateValue.developer}</p>
            <p>Dummy Review Date{dateValue.lastReviewDate}</p>
          </div>
        </div>
        <div className="selfdata">
          <div className="classified">
            <h3>Model Risk Evaluation</h3>
            <div className="content">
              <p>Model risk occurs primarily for two reasons:</p>
              <p>
                - A model may have fundamental errors and produce inaccurate
                outputs when viewed against its design objective and intended
                business uses
              </p>
              <p>
                
                -A model may be used incorrectly or inappropriately or there may
                be a misunderstanding about its limitations and assumptions.
                Model risk increases with greater model complexity, higher
                uncertainty about inputs and assumptions, broader extent of use,
                and larger potential impact.
              </p>
            </div>
          </div>
          <div className="classified">
            <h3>Overview</h3>
            <div className="content">
              <p>Model risk occurs primarily for two reasons:</p>
              <p>
              The Credit Line Decrease (CLD) model is used to identify high risks accounts with
the objective to mitigate potential losses by decreasing their credit limit. The
model will be used on all the RRB credit card customers.
RRB branded credit card is a core product of RRB and accounts for ~$90 million
ANR with ~20 million open accounts till Dec’22.
The model has been built using Dec 2018 development vintage. February 2018
and April 2019 has been used for out-of-time (OOT) validations. The model has
been built on entire card customers except for the customers whose past 12
months historical data is not known.
The model estimates the likelihood of an account having a status of 60+ days
past due at the end of 18 months (classified as ‘bad’ hereafter in this document).
The model has been built on both internal as well as external data. The external
credit bureau data is received monthly through a batch process for the Existing
Card Members (ECM). In addition, the model leverages daily data – daily
bureau (in addition to batch bureau), daily triggers and a few daily on-us
attributes – to allow the identification of high risk accounts before they utilize the
remaining open-to-buy amount.
              </p>
            </div>
          </div>
          <div className="classified">
            <h3>Model Overview</h3>
            <div className="content">
              <p>The CLD model is developed as an account level score and scores all the ECM
consumer accounts. It is developed using on-us ECM information (daily and
cycle-end), batch bureau (monthly) and Bureau trigger (daily) information. The
use of daily data in the model development allows the score to adjust according
to the changes observed at a daily level and hence capturing the accounts
with an early sign of financial distress.</p>
              <p>
              The model development went through four major stages:
              </p>
              <p>
                - Vintage Selection and Performance Definition</p>
                <p>- Data Preparation</p>
                <p>- Model Development and Validation</p>
                <p>-Documentation</p>
    
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Document;
