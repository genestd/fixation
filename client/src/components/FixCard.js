import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {bindActionCreators} from 'redux'
import * as Actions from '../store/actions'
import axios from 'axios'

class FixCard extends React.Component{

  constructor(props){
    super(props)
  }

  onMouseOver = () => {
    $("#"+ this.props.fix._id).removeClass("card-overlay-hidden")
  }

  onMouseOut = () =>{
    $("#"+ this.props.fix._id).addClass("card-overlay-hidden")
  }

  delete = () =>{
    axios.post('/delete', {item: this.props.fix._id})
    .then( result=>{
      this.props.actions.deleteItem(this.props.fix._id)
      this.props.actions.refreshItems(result.data.items)
    })
  }

  addLike = () => {
    console.log(this.props)
    axios.post('/like', {
      user: this.props.fixation.user.screen_name,
      item: this.props.fix._id
    })
    .then( result=>{
      if(result.data.success){
        $('#like-'+this.props.fix._id).addClass('flash')
        window.setTimeout( ()=>{
          $('#like-'+this.props.fix._id).removeClass('flash')
        },1500)
        this.props.actions.addLike([this.props.fix._id])
      } else {
        console.log('error!', result.data.message)
      }
    })
    .catch( error=>{
      //force app logout
      this.props.actions.logout()
      this.props.history.push('/')
      console.log('like error!', error)
    })
  }

  componentDidMount(){
    $(document).foundation()
  }

  likeOrDelete = () => {
    if( this.props.fixation.clientLoggedIn && (this.props.fixation.user.screen_name === this.props.fix.user)){
      return (<div className="card-overlay-fix" onClick={this.delete}>
        <span className="text-delete">X </span><span>Delete</span>
      </div>)
    } else {
      return (<div className="card-overlay-fix" onClick={this.addLike}>
        <span className="card-logofont">
          F
        </span>&nbsp;<span> FixIt</span>
      </div>)
    }
  }

  render(){
    let fix = this.props.fix
    return(
      <div className="card">

        <div className="card-section" onMouseOver={()=>this.onMouseOver()} onMouseOut={()=>this.onMouseOut()}>
          <img src={fix.img} className="fix-img"/>

            <div className="card-overlay card-overlay-hidden" id={fix._id} onClick={()=>{$("#share-"+fix._id).toggleClass("card-overlay-hidden")}}>
            <div className="card-overlay-share"  data-toggle={"tip-"+fix._id}>
              <i className="icon-export"></i>
            </div>
            <div className="dropdown-pane bottom" id={"tip-"+fix._id} data-dropdown="" data-v-offset="12">
              <p>Share this Fix</p>
              <hr/>
              <p>Send to:</p>
              <input className="input-recipient" type="text" id="recipient" required placeholder="Recipient username"/>
              <button className="button button-red-small">Send</button>
            </div>
            {this.likeOrDelete()}
            <div className="card-overlay-more">
              <i className="icon-cd"></i> More
            </div>
          </div>

        </div>
        <div className="card-section card-section-pad">
          <div className="row">
            <h6 className="card-title columns small-9 ">{fix.title}</h6>
            <span className="text-likes columns small-3"><i className="icon-heart" id={"like-"+fix._id}></i>{fix.likes}</span>
          </div>
          <p className="card-text">{fix.text}</p>
          <div>
            <img className="card-thumbnail" src={fix.thumbnail}/>
            <span className="card-text card-text-bold">{fix.user}</span>
          </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(FixCard))
