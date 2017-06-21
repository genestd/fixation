import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as Actions from '../store/actions'
import {Route} from 'react-router-dom'
import Controls from '../components/Controls'
import FixCard from '../components/FixCard'
import Masonry from 'react-masonry-component'
import axios from 'axios'

class Profile extends React.Component{

  constructor(props){
    super(props)
  }

  componentDidMount(){
    $(document).foundation()
  }

  showControlsMenu = () => {
    $('#controlsMenu').toggleClass("card-overlay-hidden")
  }

  showAddForm = () => {
    $('#add-modal').foundation('open')
  }

  showLogoutMenu = () => {
    $('#logout-menu').toggleClass("card-overlay-hidden")
  }

  logout = () => {
    hello.logout('twitter', ()=>{
      this.props.history.push('/')
      this.props.actions.logout()
      axios.post('/logout')
    })
  }

  getAdds = () =>{
    return new Promise( (resolve, reject)=>{
      axios.post('/myadds', {user: this.props.fixation.user.screen_name})
      .then( result=>{
        resolve(result.data)
      })
      .catch( error=>{
        reject(error)
      })
    })
  }
  getLikes = () => {
    return new Promise( (resolve, reject)=>{
      axios.post('/mylikes', {user: this.props.fixation.user.screen_name})
      .then( result=>{
        resolve(result.data)
      })
      .catch( error=>{
        reject(error)
      })
    })
  }

  match( fix, keyword){
    if(keyword !== ''){
      return( fix.title.toUpperCase().includes(keyword.toUpperCase()))
    } else {
      return true
    }
  }

  showItems = () =>{
    switch( this.props.fixation.filter){
      case 'all':
        return this.props.fixation.myItems.map( item=>{
          if( this.match(item, this.props.fixation.searchterm)){
              return (
                <div key={item._id} className="column fix-card">
                  <FixCard fix={item} />
                </div> )
          }
        })
        break
      case 'add':
      return this.props.fixation.myItems.filter(
        item =>{
          return (item.user === this.props.fixation.user.screen_name  && this.match(item, this.props.fixation.searchterm))
        })
        .map( item=>{
            return (
              <div key={item._id} className="column fix-card">
                <FixCard fix={item} />
              </div> )
          })
      break
      case 'like':
      return this.props.fixation.myItems.filter(
        item =>{
          return (this.props.fixation.user.likedItems.indexOf(item._id) > -1 && this.match(item, this.props.fixation.searchterm))
          })
        .map( item=>{
            return (
              <div key={item._id} className="column fix-card">
                <FixCard fix={item} />
              </div> )
            })
      break;
    }
  }

  componentDidMount(){
    Promise.all([this.getAdds(), this.getLikes()])
      .then( results=>{
        console.log('results: ', results)
        var filtered = results[1].filter(function (item) {
          for(var i=0; i<results[0].length; i++){
            if(results[0][i]._id === item._id ){
              return false
            }
          }
          return true
        })
        var joined = results[0].concat(filtered);
        this.props.actions.updateMyItems(joined)
      })
  }

  clearSearch = () => {
    $('#searchterm').val('')
    this.props.actions.setSearch('')
  }

  render(){
    console.log('profile', this.props)
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
            <div className="columns small-9">
              <h3 className="filte-text">{this.props.fixation.user.screen_name}</h3>
            </div>
            <div className="columns small-3">
              <img className="profile-image" src={this.props.fixation.user.image}/>
            </div>
          </div>
          <div className="row">
            <div className="columns small-12">
              <h2 className="subheader">Your fixations</h2>
              <h6 className="filter-text" onClick={()=>this.props.actions.setFilter('add')}>Added by you</h6>
              <h6 className="filter-text" onClick={()=>this.props.actions.setFilter('like')}>Liked by you</h6>
              <h6 className="filter-text" onClick={()=>this.props.actions.setFilter('all')}>All</h6>
            </div>
          </div>
          <div className="row clearfix">
            { this.props.fixation.searchterm !== "" ? <div className="columns small-10 medium-up-9 card-filter end">Filter: {this.props.fixation.searchterm}<i className="icon-cancel float-right" onClick={this.clearSearch}></i></div> : null }
            <div className="columns small-10 medium-up-9 end">
              <Masonry className={"row cardholder small-up-2 medium-up-3 large-up-4"}
                        elementType={'div'}
                        disableImagesLoaded={false}
                        updateOnEachImageLoad={true}>
                {this.showItems()}
              </Masonry>
            </div>
          </div>
          <Controls showControlsMenu={this.showControlsMenu} showAddForm={this.showAddForm}/>
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
