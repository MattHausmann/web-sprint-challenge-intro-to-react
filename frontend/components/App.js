import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Character from './Character'

const urlPlanets = 'http://localhost:9009/api/planets'
const urlPeople = 'http://localhost:9009/api/people'

function App() {
  // ❗ Create state to hold the data from the API
  const [peopleObj, setPeopleObj] = useState([]);
  const [planetsObj, setPlanetsObj] = useState([]);
  const [peopleInPlanets, setPeopleInPlanets] = useState([]);

  const planetsMap = {};


  // ❗ Create effects to fetch the data and put it in state
  useEffect(() => {
    let peoplePromise = axios.get(urlPeople);
    let planetsPromise = axios.get(urlPlanets);
    Promise.all([peoplePromise, planetsPromise]).then((values) =>{

      let peopleData = values[0].data;
      let planetsData = values[1].data;
      let planetsMap = {}
      for(let i = 0; i < planetsData.length; i++) {
        let currentPlanet = planetsData[i];
        planetsMap[currentPlanet.id] = currentPlanet.name;
      }

      let peopleInPlanetList = []

      for(let i = 0; i < peopleData.length; i++) {
        let person = peopleData[i];
        peopleInPlanetList.push({character: person.name, homeworld: planetsMap[person.homeworld]})
      }
      setPeopleInPlanets(peopleInPlanetList);

    });
    
    axios
      .get(urlPeople)
      .then(result => {
        setPeopleObj(result.data);
      })
      .catch(err => console.log(err));
      
    axios
      .get(urlPlanets)
      .then(result => {
        for(let i = 0; i < result.data.length; i++) {
          planetsMap[result.data[i].id] = result.data[i].name;
        }
        setPlanetsObj(result.data);
      })
      .catch(err => console.log(err));
  }, []);


  return (
    <div>
      <h2>Star Wars Characters</h2>
      <p>See the README of the project for instructions on completing this challenge</p>
      {
        peopleInPlanets.map(function(obj) { return (<Character key={obj.person} character={obj.character} planet={obj.homeworld}/> )} ) 
      }
    </div>
  );
}


export default App

// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = App
