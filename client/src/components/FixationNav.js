import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as Actions from '../store/actions'

class FixationNav extends React.Component{

  constructor(props){
    super(props)
    this.state={
      nav: {}
    }
  }

  componentDidMount = () =>{
    //data-sticky="" id="fixnav" data-top-anchor="topAnchor:bottom" data-btm-anchor="bottomAnchor" data-sticky-on="small" data-margin-top="0" data-check-every="50"
    var nav = new Foundation.Sticky( $('#fixnav'),{topAnchor: 'topAnchor:bottom',
                                                   btmAnchor: 'bottomAnchor',
                                                   stickyOn: 'small',
                                                   marginTop: 0,
                                                   checkEvery: 50})
    this.setState({
      nav: nav
    })
  }

  componentWillUnmount = () => {
    this.state.nav.destroy()
  }

  submitSearch = () => {
    var term = $('#searchterm').val()
    this.props.actions.setSearch(term)
  }

  render(){
    return(
      <div data-sticky-container>

        <nav className="top-bar row" id="fixnav">
          <div className="columns small-2 medium-1">
            <Link to="/"><div className="logo">F</div></Link>
          </div>
          <div className="columns small-8 medium-9">
            <div className="input-group">
              <span className="input-group-label pointer" onClick={this.submitSearch}><i className="icon-search"></i></span>
              <input className="input-group-field" type="text" placeholder="Search" id="searchterm"/>
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
export default connect(mapStateToProps, mapDispatchToProps)(FixationNav)
