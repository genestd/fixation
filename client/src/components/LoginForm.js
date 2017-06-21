import React from 'react'
import {Link} from 'react-router-dom'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as Actions from '../store/actions'
import axios from 'axios'


class LoginForm extends React.Component{

  constructor(props){
    super(props)
    this.state={
      loginModal1: {},
      loginModal2: {}
    }
  }

  componentDidMount=()=>{
    var lm1 = new Foundation.Reveal($('#login-modal'),{closeOnClick:false, closeOnEsc:false})
    var lm2 = new Foundation.Reveal($('#login-modal-step2'),{closeOnClick:false, closeOnEsc:false})
    //$(document).foundation()
    this.setState({
      loginModal1: lm1,
      loginModal2: lm2
    })
    window.setTimeout( ()=>{
      this.validateLogin()
    },250)

  }

  componentDidUpdate =() =>{
    if( !this.props.fixation.loginPending ){
      this.validateLogin()
    }
  }

  componentWillUnmount = () => {
    this.state.loginModal1.destroy()
    this.state.loginModal2.destroy()
    $('#login-modal').remove()
    $('#login-modal-step2').remove()
  }
  validateLogin =() =>{
    if( !this.props.fixation.clientLoggedIn){
      this.state.loginModal1.open()
    } else {
      this.state.loginModal1.close()
    }
  }

  twitterClick = () => {
    this.twitterLogin()
      .then( result=>{
        this.props.actions.login(result.mutations)
      })
      .catch( error=>{
        console.log(error)
      })
  }

  twitterLogin = () => {
    this.props.actions.loginPending()
    return new Promise( (resolve, reject)=>{
      let mutations = {
        loginMethod: 'twitter'
      }

      hello.login('twitter', auth=>{
        if( checkLoginStatus(auth.authResponse) ){
          mutations.clientLoggedIn = true
          mutations.loginPending = false

          this.state.loginModal1.close()

          //send twitter token to server for session validation
          axios.post('/auth', {socialToken: auth.authResponse.oauth_token, socialSecret: auth.authResponse.oauth_token_secret, loginMethod: 'twitter'})
            .then( result=>{
              if(result.data.success){
                mutations.serverLoggedIn = true;
                mutations.user = result.data.user
              }
              return resolve({mutations})
            })
            .catch( error=>{
              console.log(error)
              return reject(error)
            })

            } else {
            return reject('twitter login fail')
          }
      })

    })
  }

  handleLocalLogin = (e) => {
    e.preventDefault()
    this.props.actions.loginPending()
    //try to login user...
    var username = $('#email').val()
    var password = $('#password').val()
    var screen_name = $('#screen_name').val()
    var user = {'username': username, 'password': password, 'screen_name': screen_name}
    axios.post('/locallogin', user )
    .then( result=>{

      var msg = ''
      if( result.data.success ){

        this.state.loginModal1.close()
        this.state.loginModal2.close()
        var mutations= {
          loginPending: false,
          loginMethod: 'local',
          clientLoggedIn: true,
          user: result.data.user
        }

        this.props.actions.login(mutations)
        username = $('#email').val('')
        password = $('#password').val('')
        screen_name = $('#screen_name').val('')

      } else {
        if( result.data.reason === 1){
          //user not found, show sign up option
          this.state.loginModal2.open()
        } else if( result.data.reason === 2 ){
          //bad password
          //show bad password message
          msg = 'Incorrect Password'
        } else {
          msg = 'Unknown Error - please refresh the page and try again'
          console.log(result, msg)
        }
      }
    })
    .catch(error=>{
      console.log(error)
    })
  }

  render(){
    return(
      <div>
        <div className="reveal" id="login-modal">
          <h1 className="logo supersize">F</h1>
          <p className="text-heavy text-center">Welcome to Fixation</p>
          <div className="login-form-centered" >

            <div id="login-form">
              <div className="row">
                <div className="small-9 columns small-centered">
                  <input className="login-input" id="email" type="email" placeholder="Email" pattern="email" required />
                  <span className="form-error">Valid email required!</span>
                </div>
                <div className="small-9 columns small-centered">
                  <input className="login-input" id="password" type="password" placeholder="Create a password" />
                </div>
                <div className="small-9 columns small-centered">
                  <input className="button-red button" type="submit" id="login" value="Continue" onClick={(e)=>this.handleLocalLogin(e)}/>
                </div>
              </div>
            </div>
              <div className="row text-center" style={{marginBottom:"16px"}}>
                OR
              </div>
              <div>
                <div className="row text-center">
                  <div className="small-9 columns small-centered">
                    <button className="button button-red primary" id="twitter-login"
                            onClick={this.twitterClick}>
                      <i className="icon-twitter float-left"></i>Continue with Twitter
                    </button>
                  </div>
                </div>
              </div>
              <div className="row text-center">
                <div className="small-9 columns small-centered terms">
                  Creating an account means you’re okay with Fixation's <Link to="/terms">Terms of Service</Link>, <Link to="/privacy">Privacy Policy</Link>
                </div>
              </div>
          </div>
        </div>
        <div className="reveal" id="login-modal-step2">
          <h1 className="logo supersize">F</h1>
          <p className="text-heavy text-center">Welcome to Fixation</p>
          <div className="login-form-centered" >

            <div id="login-form-step2">
              <div className="row">
                <div className="small-9 columns small-centered">
                  <input className="input-hidden" type="text" placeholder="Screen Name" disabled />
                </div>
                <div className="small-9 columns small-centered">
                  <input className="login-input" id="screen_name" type="text" placeholder="Screen Name" required />
                </div>
                <div className="small-9 columns small-centered">
                  <input className="button button-red" type="submit" id="login2" value="Sign Up" onClick={(e)=>this.handleLocalLogin(e)}/>
                </div>
              </div>
            </div>
              <div className="row text-center" style={{marginBottom:"16px"}}>
                OR
              </div>
              <div>
                <div className="row text-center">
                  <div className="small-9 columns small-centered">
                    <button className="button button-red primary" id="twitter-login"
                            onClick={this.twitterClick}>
                      <i className="icon-twitter float-left"></i>Continue with Twitter
                    </button>
                  </div>
                </div>
              </div>
              <div className="row text-center">
                <div className="small-9 columns small-centered terms">
                  Creating an account means you’re okay with Fixation's <Link to="/terms">Terms of Service</Link>, <Link to="/privacy">Privacy Policy</Link>
                </div>
              </div>
          </div>
        </div>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
