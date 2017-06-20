import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as Actions from '../store/actions'
import axios from 'axios'

class Controls extends React.Component {
  constructor(props){
    super(props)
    this.state={
      addModal1: {},
      addModal2: {}
    }
  }

  componentDidMount(){
    //$(document).foundation()
    var m1 = new Foundation.Reveal($('#add-modal'),{dataMultipleOpened: true})
    var m2 = new Foundation.Reveal($('#add-modal-step2'),{dataMultipleOpened: true})
    this.setState({
      addModal1: m1,
      addModal2: m2
    })

  }

  componentWillUnmount = () => {
    console.log('trying to destroy modals')
    this.state.addModal1.destroy()
    this.state.addModal2.destroy()
    $('#add-modal').remove()
    $('#add-modal-step2').remove()
  }

  componentDidUpdate(){
    //Foundation.reInit($('#add-modal'))
    //Foundation.reInit($('#add-modal-step2'))
  }

  selectImage = () => {
    var candidate = $('#image-url')[0].value;
    this.props.actions.setCandidate(candidate)
    this.state.addModal2.open()

    var image = $('#new-image')
    image.error(  ()=>{
      $('#new-image').attr('src', this.props.fixation.default_url)
    });
    image.attr('src', candidate);

  }

  addFixItem = () => {
    var title = $('#title').val()
    var description = $('#description').val()

    axios.post("/addFixItem", {
      title: title,
      text: description,
      img: $('#new-image').attr('src'),
      thumbnail: this.props.fixation.user.image,
      user: this.props.fixation.user.screen_name,
      likes: 0
    })
    .then( result => {
      if(result.data.success){
        this.props.actions.addItem([result.data.item])
      }
      this.closeAllModals()
      $('#title').val('')
      $('#description').val('')
      $('#image-url').val('')
      this.props.actions.setCandidate('')
    })
    .catch( error => {
      console.log(error)
    })
  }

  showControlsMenu = () => {
    $('#controlsMenu').toggleClass("card-overlay-hidden")
  }

  showAddForm = () => {
    this.state.addModal1.open()
    $('#controlsMenu').toggleClass("card-overlay-hidden")
  }

  closeAllModals = () => {
    this.state.addModal1.close()
    this.state.addModal2.close()
  }

  render(){
    return (
      <div className="controls clearfix">
        <div className="arrow-box card-overlay-hidden" id="controlsMenu">
          <div className="vertical-center">
            <div className="logo float-left">F</div>
            <div className="menutext text-left">Get our browser button to save ideas even faster</div>
          </div>

          <div className="vertical-center pointer" onClick={this.showAddForm}>
            <i className="icon-up font-large"></i>
            <div className="menutext">Create a Fix</div>
          </div>

          <div className="vertical-center">
            <i className="icon-globe font-large"></i>
            <div className="menutext">Save from website</div>
          </div>
        </div>
        <div className="icons">
          <i className="icon-plus round"  onClick={this.showControlsMenu}></i>
          <i className="icon-help round"></i>
        </div>

      <div className="reveal add-modal" id="add-modal" >
        <button className="close-button" data-close="" aria-label="Close modal" type="button">
          <span aria-hidden="true">&times;</span>
        </button>
        <div>
          <div className="addmenutext">Fix It!</div>
        </div>

        <div className="add-partition">
          <div className="input-group">
            <div className="input-group-button">
              <input type="submit" className="button button-red" value="Choose Image" onClick={this.selectImage}/>
            </div>
            <input className="input-group-field" id="image-url" type="text" placeholder="Enter URL to Image"/>
          </div>
        </div>
      </div>
      <div className="reveal " id="add-modal-step2">
        <button className="close-button" data-close="" aria-label="Close modal" type="button" onClick={this.closeAllModals}>
          <span aria-hidden="true">&times;</span>
        </button>
        <div className="add-partition">
          <div id="add-form-2">
            <div className="row">
              <div className="small-9 columns small-centered">
                <input id="title" type="text" placeholder="Title" required />
              </div>
              <div className="small-9 columns small-centered">
                <input id="description" type="text" placeholder="Describe your fixation" required/>
              </div>
              <div className="small-9 columns small-centered">
                <input className="button button-red" type="submit" id="add" value="Add to Fixation" onClick={this.addFixItem}/>
              </div>
            </div>
            <div className="row">
              <div className="small-12 columns small-centered vertical-center-2">
                <i className="icon-back round" onClick={()=>$('#add-modal-step2').foundation('close')}></i>
                Your image cannot be loaded.  Click here to go back and edit the URL, or continue to use the placeholder image.
              </div>
            </div>
            <div className="row">
              <div className="columns small-9 small-centered text-center">
                <img className="centered-image" id="new-image"/>
              </div>
            </div>
          </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(Controls)
