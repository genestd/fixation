import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as Actions from '../store/actions'
import {Route} from 'react-router-dom'

class Profile extends React.Component{

  constructor(props){
    super(props)
  }

  componentDidMount(){
    $(document).foundation()
  }

  showAddMenu = () => {
    $('#addMenu').toggleClass("card-overlay-hidden")
  }
  showLogoutMenu = () => {
    $('#logout-menu').toggleClass("card-overlay-hidden")
  }

  logout = () => {
    hello.logout('twitter', ()=>{
      this.props.actions.logout()
      this.props.history.push('/')
    })
  }

  render(){

    return(
      <Route path='/profile'>
        <div className="profile">
          <div className="row">
            <div className="columns small-12">
              <i className="icon-cog float-left round profile-icon"></i>
              <i className="icon-export float-left round profile-icon"></i>
              <div className="float-left container">
                <i className="icon-dot-3 float-left round profile-icon" onClick={this.showLogoutMenu}></i>
                <div className="arrow-box-top logout-menu card-overlay-hidden" id="logout-menu">
                  <div className="menutext text-left pointer" onClick={()=>this.logout()}>Log out</div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="columns small-6">
              <h3 className="profile-text">{this.props.fixation.user.screen_name}</h3>
            </div>
            <div className="columns small-3">
            </div>
            <div className="columns small-6 medium-3">
              <img className="profile-image" src={this.props.fixation.user.image}/>
            </div>
          </div>
          <div className="controls clearfix">
            <div className="arrow-box card-overlay-hidden" id="addMenu">
              <div className="vertical-center">
                <div className="logo float-left">F</div>
                <div className="menutext text-left">Get our browser button to save ideas even faster</div>
              </div>

              <div className="vertical-center">
                <i className="icon-up font-large"></i>
                <div className="menutext">Upload a Fix</div>
              </div>

              <div className="vertical-center">
                <i className="icon-globe font-large"></i>
                <div className="menutext">Save from website</div>
              </div>
            </div>
            <div className="icons">
              <i className="icon-plus round"  onClick={()=>this.showAddMenu()}></i>
              <i className="icon-help round"></i>
            </div>
          </div>
        </div>
      </Route>
    )
  }

}

const mapStateToProps = state => {
  return({
    fixation: state.fixation
  })
}

const mapDispatchToProps = dispatch => {
  return({
    actions: bindActionCreators(Actions, dispatch)
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
