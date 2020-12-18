import React from "react";
import './leftbar.css'

class Leftbar extends React.Component {
  render() {
    return (
      <div  class="ui inverted vertical pointing menu leftbar">
        <h2 class="shareTitle">Shares</h2>
        <div class="ui divider"></div>
        <a class="active item" href="#">Home</a>
        <a class="item" href="#">Messages</a>
        <a class="item" href="#">Friends</a>
        <a class="item" href="#">Añadir share</a>
        <div class="item">
            <div class="ui blue inverted indicating progress" id="usedSpace">
                <div class="bar">
                    <div class="progress"></div>
                </div>
                <div class="label">Espacio usado</div>
            </div>
        </div>
      </div>
    );
  }
}

export default Leftbar;
