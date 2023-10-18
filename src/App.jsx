import React from "react";
import { Task } from "./Task/components/Taks";
import { NewTask } from "./Task/components/NewTask";
import { useState } from "react";
import { useEffect } from "react";

export const App = () => {
  const [data, setData] = useState([]);

  const viewName = () => {
    useEffect(() => {
      const fetchData = async () => {
        const res = await fetch('https://randomuser.me/api');
        const { results } = await res.json();
        setData(results);

      };
      fetchData();
    }, []);
  }



  return (
    <>
      <div>
        <h1>Bienvenido</h1>
        <button type="button" className="btn btn-success" onClick={viewName} >Obtener Nombre</button>
        {(data.map((item, index) => {
          return (
            <>
              <div className="card" key={index}>
                <h3>{item.name.title} {item.name.first} {item.name.last}</h3>
              </div>
            </>
          )
        }))}
        <br />
        <br />
        <Task />
        <br />
        <NewTask />
      </div>
    </>
  )
}
