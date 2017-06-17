import React from 'react'
import {Link} from 'react-router-dom'

class FixationNav extends React.Component{

  constructor(props){
    super(props)
  }

  render(){

    return(
      <div data-sticky-container>
        <nav className="top-bar row" data-sticky data-sticky-on="small" data-margin-top="0" id="fixnav" data-options="anchor:'stickyAnchor';stickTo:top">
          <div className="columns small-2 medium-1">
            <Link to="/"><div className="logo">F</div></Link>
          </div>
          <div className="columns small-8 medium-9">
            <div className="input-group">
              <span className="input-group-label"><i className="icon-search"></i></span>
              <input className="input-group-field" type="text" placeholder="Search"/>
            </div>
          </div>
          <div className="columns small-1 text-center">
            <Link to="/profile"><i className="icon-compass icon-centered"></i></Link>
          </div>
          <div className="columns small-1 text-center">
            <Link to="/profile"><i className="icon-user icon-centered"></i></Link>
          </div>
        </nav>
      </div>
    )
  }
}

export default FixationNav
