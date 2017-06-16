import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as Actions from '../store/actions'
import axios from 'axios'
import Masonry from 'react-masonry-component'
import FixCard from '../components/FixCard'
import LoginForm from '../components/LoginForm'
import Controls from '../components/Controls'
import AddMenu from '../components/AddMenu'

class Home extends React.Component{

  constructor(props){
    super(props)
  }

  componentDidMount(){
    //iniitialize foundation elements
    $(document).foundation()
    //initialize pictures
    if( this.props.fixation.fixes.length === 0){
      axios.get('http://localhost:8080/initialize')
        .then( result =>{
          console.log('initializing data', result.data)
          this.props.actions.addItem(result.data.items)
        })
        .catch( error=>{
          console.log(error)
        })
    }
    //check for current login status
    this.validateLogin()
  }

  componentDidUpdate(){
    //check for current login status
    this.validateLogin()

  }

  showControlsMenu = () => {
    $('#controlsMenu').toggleClass("card-overlay-hidden")
  }

  showAddForm = () => {
    $('#add-modal').foundation('open')
    $('#controlsMenu').toggleClass("card-overlay-hidden")
  }

  /*validateLogin(){
    var twit = hello('twitter').getAuthResponse();
    if( checkLoginStatus(twit) ){
      $('#login-modal').foundation('close')
      if(!this.props.fixation.clientLoggedIn){
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
  }*/
  validateLogin(){
    console.log(this.props.fixation)
    if( !this.props.fixation.clientLoggedIn){
      //$('#login-modal').foundation('open')
    }/* else {
      $('#login-modal').foundation('close')
      if( !this.props.fixation.serverLoggedIn){
        axios.post('http://localhost:8080/auth', {socialToken: auth.authResponse.oauth_token, socialSecret: auth.authResponse.oauth_token_secret})
          .then( result=>{
            console.log('server auth result', result)
            if(result.success){
              this.props.actions.serverLogin()
              this.props.actions.updateUser(result.data.user)
            }
          })
          .catch( error=>{
            console.log(error)
          })
      }
    }*/
  }

  secure = () =>{
    axios.get('http://localhost:8080/secure?jwt=',{withCredentials:true})
      .then(response=>{
        console.log('response', response)
      })
      .catch(error=>{
        console.log('error', error)
      })
  }

  render(){
    return(
      <div>
        <Masonry
            className={"row cardholder small-up-2 medium-up-3 large-up-4"}
            elementType={'div'}
            disableImagesLoaded={false}
            updateOnEachImageLoad={true}>

          {this.props.fixation.fixes.map( fix =>{
            return(
              <div key={fix._id} className="column fix-card">
                <FixCard fix={fix} router={this.context.router}/>
              </div>
            )
          })}
        </Masonry>
        <Controls showControlsMenu={this.showControlsMenu} showAddForm={this.showAddForm}/>
        <div>
          <LoginForm router={this.context.router} />
        </div>
        <AddMenu />
        <button className="button primary" onClick={this.secure}>Secure</button>
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
