import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as Actions from '../store/actions'
import FixCard from '../components/FixCard'
import LoginForm from '../components/LoginForm'

class Home extends React.Component{

  constructor(props){
    super(props)
  }

  componentDidMount(){

    //iniitialize foundation elements
    $(document).foundation()

    //check for current login status
    this.validateLogin()

    var $grid = $('#container').masonry({
      itemSelector: '#container .column'
    });
    $grid.imagesLoaded().progress( function() {
      $grid.masonry('layout');
    });

  }

  componentDidUpdate(){
    //check for current login status
    this.validateLogin()
  }

  showAddMenu = () => {
    $('#addMenu').toggleClass("card-overlay-hidden")
  }

  validateLogin(){
    var twit = hello('twitter').getAuthResponse();
    if( checkLoginStatus(twit) ){
      $('#login-modal').foundation('close')
      if(!this.props.fixation.loggedIn){
        this.props.actions.login('twitter')
      }
      if(this.props.fixation.user.username===''){
        hello('twitter').api('me')
          .then( result=>{

            this.props.actions.updateUser({
              username: result.name,
              screen_name: result.screen_name,
              image: result.profile_image_url_https
            })
          })
      }
    } else {
      $('#login-modal').foundation('open')
    }
  }

  render(){

    return(
      <div className="row cardholder small-up-2 medium-up-3 large-up-5" id="container">

        {this.props.fixation.fixes.map( fix =>{
          return(
            <div key={fix._id} className="column fix-card">
              <FixCard fix={fix}/>
            </div>
          )
        })}
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
        <div>
          <LoginForm router={this.context.router} />
        </div>
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return({
    fixation: state.fixation
  })
}

const mapDispatchToProps = (dispatch) => {
  return({
    actions: bindActionCreators(Actions, dispatch)
  })
}
export default connect(mapStateToProps, mapDispatchToProps)(Home)
