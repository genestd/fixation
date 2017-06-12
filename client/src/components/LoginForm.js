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
    $('#login-form').foundation()
  }

  handleTwitterLogin = (event) => {

    event.preventDefault()
    event.stopPropagation()

    hello.login('twitter', auth=>{

      console.log('requesting twitter auth')
      hello('twitter').api('me')
        .then( result=>{

          this.props.actions.login('twitter')
          this.props.actions.updateUser({
            username: result.name,
            screen_name: result.screen_name,
            image: result.profile_image_url_https
          })
          this.props.history.push('/')
        })
    })

  }

  componentDidUpdate(){
    Foundation.reInit($('#login-form'))
  }

  render(){
    console.log(this.props)
    return(
      <div className="reveal" id="login-modal" data-reveal="" data-options="closeOnClick:false;closeOnEsc:false;">
        <h1 className="logo supersize">F</h1>
        <p className="text-heavy text-center">Welcome to Fixation</p>
        <div className="login-form-centered" >

          <form id="login-form" data-abide noValidate>
            <div className="row">
              <div className="small-9 columns small-centered">
                <input id="email" type="email" placeholder="Email" pattern="email" required />
                <span className="form-error">Valid email required!</span>
              </div>
              <div className="small-9 columns small-centered">
                <input id="password" type="password" placeholder="Create a password" />
              </div>
              <div className="small-9 columns small-centered">
                <input className="button button-red" type="submit" name="login" value="Continue" onClick={(e)=>this.handleLogin(e)}/>
              </div>
            </div>
            </form>
            <div className="row text-center" style={{marginBottom:"16px"}}>
              OR
            </div>
            <form>
              <div className="row text-center">
                <div className="small-9 columns small-centered">
                  <button className="button button-red primary" name="login"
                          onClick={(e)=>{console.log('wtf');this.handleTwitterLogin(e)}}>
                    <i className="icon-twitter float-left"></i>Continue with Twitter
                  </button>
                </div>
              </div>
            </form>
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
