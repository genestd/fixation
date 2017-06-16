import React from 'react'
import {Link} from 'react-router-dom'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as Actions from '../store/actions'
import axios from 'axios'


class LoginForm extends React.Component{

  constructor(props){
    super(props)
  }

  componentDidMount(){
    $(document).foundation()
  }

  componentDidUpdate(){

  }

  twitterClick = () => {
    this.twitterLogin()
      .then( result=>{
        console.log(result)
        this.props.actions.login(result.mutations)
      })
      .catch( error=>{
        console.log(error)
      })
  }

  twitterLogin = () => {
    this.props.actions.loginPending()
    return new Promise( function(resolve, reject){
      let mutations = {
        loginMethod: 'twitter'
      }

      hello.login('twitter', auth=>{
        if( checkLoginStatus(auth.authResponse) ){
          mutations.clientLoggedIn = true
          mutations.loginPending = false

          $('#login-modal').foundation('close')

          //send twitter token to server for session validation
          axios.post('http://localhost:8080/auth', {socialToken: auth.authResponse.oauth_token, socialSecret: auth.authResponse.oauth_token_secret})
            .then( result=>{
              console.log('server auth result', result)
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

  render(){
    return(
      <div className="reveal" id="login-modal" data-reveal="" data-options="closeOnClick:false;closeOnEsc:false;">
        <h1 className="logo supersize">F</h1>
        <p className="text-heavy text-center">Welcome to Fixation</p>
        <div className="login-form-centered" >

          <div id="login-form">
            <div className="row">
              <div className="small-9 columns small-centered">
                <input id="email" type="email" placeholder="Email" pattern="email" required />
                <span className="form-error">Valid email required!</span>
              </div>
              <div className="small-9 columns small-centered">
                <input id="password" type="password" placeholder="Create a password" />
              </div>
              <div className="small-9 columns small-centered">
                <input className="button button-red" type="submit" id="login" value="Continue" onClick={(e)=>this.handleLogin(e)}/>
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
