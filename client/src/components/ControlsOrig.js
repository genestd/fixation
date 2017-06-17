import React from 'react'

const Controls = (props) => {
  return(
    <div className="controls clearfix">
      <div className="arrow-box card-overlay-hidden" id="controlsMenu">
        <div className="vertical-center">
          <div className="logo float-left">F</div>
          <div className="menutext text-left">Get our browser button to save ideas even faster</div>
        </div>

        <div className="vertical-center pointer" onClick={props.showAddForm}>
          <i className="icon-up font-large"></i>
          <div className="menutext">Create a Fix</div>
        </div>

        <div className="vertical-center">
          <i className="icon-globe font-large"></i>
          <div className="menutext">Save from website</div>
        </div>
      </div>
      <div className="icons">
        <i className="icon-plus round"  onClick={props.showControlsMenu}></i>
        <i className="icon-help round"></i>
      </div>
    </div>
  )
}

export default Controls
