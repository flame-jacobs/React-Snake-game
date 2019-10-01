import React from "react";

export default (props) => {
  return(
    <div>
      {props.snakeDots.map((dot, i) => {
        const snaKE = {
          left: `${dot[0]}%`,
          top: `${dot[1]}%`
        }
        return(
          <div className="snake-dot" key={i} style={snaKE}></div>
        )
      })}
    </div>
  )
}

