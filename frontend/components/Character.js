import React, { useState } from 'react'

function Character(personInPlanet) { // ❗ Add the props
  // ❗ Create a state to hold whether the homeworld is rendering or not
  const [renderingHomeworld, setRenderingHomeworld] = useState(false);
  // ❗ Create a "toggle" click handler to show or remove the homeworld
  let handleClick = () => {setRenderingHomeworld(!renderingHomeworld);}


  return (
    <div className = "character-card" onClick = {handleClick}>
      <h3 className = "character-name">{personInPlanet.character}</h3>
      {renderingHomeworld && <p>Planet: <span className="character-planet"> {personInPlanet.planet} </span></p>}
    </div>
  )
}

export default Character
