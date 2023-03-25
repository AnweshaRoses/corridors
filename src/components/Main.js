
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import List from "./List";
import Alert from "./Alert";
import { UilPlus } from "@iconscout/react-unicons";
import { UilPen } from "@iconscout/react-unicons";
import { UilTrashAlt } from "@iconscout/react-unicons";
import Chart from "./Chart";

import { v4 as uuid } from "uuid";










const ml5 = window.ml5;

let sentiment;

const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return JSON.parse(localStorage.getItem("list"));
  } else {
    return [];
  }
};

const Main = (props) => {
    const unique_id = uuid();
    const small_id = unique_id.slice(0, 3);
    const [name, setName] = useState("");
    const [list, setList] = useState(getLocalStorage());
    const [isEditing, setIsEditing] = useState(false);
    const [editID, setEditID] = useState(null);
    const [alert, setAlert] = useState({ show: false, msg: "hello", type: "successs" });
    let [text, setText] = useState(0);
    let [score, setScore] = useState(0);
    let [modelIsReady, setModelIsReady] = useState(false);
  
  
    const handleChange = (e) => {
      setName(e.target.value);
      calculateSentiment();
    };
  
    const calculateSentiment = () => {
      const prediction = sentiment.predict(name);
      setScore(prediction.score);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      if (!name) {
        // display alert
      } else if (name && isEditing) {
        setList(
          list.map((item) => {
            if (item.id === editID) {
              return { ...item, title: name };
            }
            return item;
          })
        );
        setName("");
        setIsEditing(false);
        setEditID(null);
      } else {
        // show alert
        const newItem = {
          id: small_id,
          title: name,
          sentifn: Math.floor(score.toFixed(5) * 1000),
        };
  
        setList([...list, newItem]);
        setName("");
        // setText("");
      }
    };
    useEffect(() => {
      console.log("loading model");
      sentiment = ml5.sentiment("movieReviews", modelReady);
    }, []);
  
    function modelReady() {
      console.log("Model Loaded!");
      setModelIsReady(true);
    }
  
    const clearList = () => {
      setList([]);
    };
    const removeItem = (id) => {
      setList(list.filter((item) => item.id !== id));
    };
  
    const editItem = (id) => {
      const specificItem = list.find((item) => item.id === id);
      setIsEditing(true);
      setEditID(id);
      setName(specificItem.title);
    };
    const [userData, setUserdata] = useState({
      labels: list.map((item) => item.id),
      datasets: [
        {
          label: "Frequency",
          data: list.map((item) => item.sentifn),
          borderColor: "blue",
          borderWidth: 1.5,
          backgroundColor: "yellow",
        },
      ],
    });
  
    useEffect(() => {
      localStorage.setItem("list", JSON.stringify(list));
    }, [list]);
  
    useEffect(() => {}, []);
  
  
    
  return (
    
    <div>
    <section className="text-gray-600 body-font relative">
      <div className="container px-5 py-8 mx-auto">
        <div className="flex flex-col text-center w-full mb-12">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
            Chart Generator
          </h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
            This project aims to analyze the text generates a score based on the given data
            <br />
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          {alert.show && <Alert {...alert} />}
          <div className="lg:w-1/2 md:w-2/3 mx-auto">
            <div className="flex flex-wrap -m-2">
              <div className="p-2 w-full">
                <div className="relative">
                  <label htmlFor="message" className="leading-7 text-sm text-gray-600">
                    Enter the data
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={name}
                    onChange={handleChange}
                    className={`w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-${props.theme}-500 focus:bg-white focus:ring-2 focus:ring-${props.theme}-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out`}
                  ></textarea>
                </div>
              </div>
              <div className="p-2 w-full">
                <button
                  type="submit"
                  class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                >
                  {isEditing ? "Edit" : "Submit"}
                </button>
                <button
                  type="button"
                  onClick={clearList}
                  class="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                >
                  Clear List
                </button>


              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
    <List items={list} remove={removeItem} edit={editItem} />
    <div style={{ width: 700, textAlign: "center", margin: "auto" }}>
      <p>Refresh the page to view updated chart. This bug is yet to be fixed</p>
      <Chart chartData={userData} />
    </div>
    {/* <LightTeamA /> */}
  </div>
  )
}

export default Main
