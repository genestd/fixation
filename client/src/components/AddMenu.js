import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as Actions from '../store/actions'
import axios from 'axios'

class AddMenu extends React.Component {
  constructor(props){
    super(props)
  }

  componentDidMount(){
    $(document).foundation()
  }

  selectImage = () => {
    var candidate = $('#image-url')[0].value;
    this.props.actions.setCandidate(candidate)
    $('#add-modal-step2').foundation('open')

    var image = $('#new-image')
    image.error(  ()=>{
      $('#new-image').attr('src', this.props.fixation.default_url)
    });
    image.attr('src', candidate);

  }

  addFixItem = () => {
    var title = $('#title').val()
    var description = $('#description').val()

    axios.post("http://localhost:8080/addFixItem", {
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
      $('description').val('')
      this.props.actions.setCandidate('')
    })
    .catch( error => {
      console.log(error)
    })
  }

  closeAllModals = () => {
    $('[data-reveal]').foundation('close')
  }
  render(){
    return (
      <div>
      <div className="reveal add-modal" id="add-modal" data-reveal="" data-multiple-opened="true">
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
      <div className="reveal " id="add-modal-step2" data-reveal="" data-multiple-opened="true">
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
export default connect(mapStateToProps, mapDispatchToProps)(AddMenu)
