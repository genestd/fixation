import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as Actions from '../store/actions'
import axios from 'axios'
import Masonry from 'react-masonry-component'
import FixCard from '../components/FixCard'
import LoginForm from '../components/LoginForm'
import Controls from '../components/Controls'

class Home extends React.Component{

  constructor(props){
    super(props)
  }

  componentDidMount(){
    //iniitialize foundation elements
    $(document).foundation()
    //initialize pictures
    if( this.props.fixation.fixes.length === 0){
      axios.get('/initialize')
        .then( result =>{
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
    if( !this.props.fixation.loginPending ){
      this.validateLogin()
    }
  }

  validateLogin(){
    if( !this.props.fixation.clientLoggedIn){
      $('#login-modal').foundation('open')
    } else {
      $('#login-modal').foundation('close')
    }
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
          <LoginForm router={this.context.router}/>
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
