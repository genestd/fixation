import React from 'react'

class FixCard extends React.Component{

  constructor(props){
    super(props)
  }

  onMouseOver = () => {
    $("#"+ this.props.fix._id).toggleClass("card-overlay-hidden")
  }

  onMouseOut = () =>{
    $("#"+ this.props.fix._id).toggleClass("card-overlay-hidden")
  }

  render(){
    return(
      <div className="card">
        <div className="card-section" onMouseOver={()=>this.onMouseOver()} onMouseOut={()=>this.onMouseOut()}>
          <img src={this.props.fix.img} className="fix-img"/>
          <div className="card-overlay card-overlay-hidden" id={this.props.fix._id} >
            <div className="card-overlay-share">
              <i className="icon-export"></i>
            </div>
            <div className="card-overlay-fix">
              <span className="card-logofont">F</span>&nbsp;<span> FixIt</span>
            </div>
            <div className="card-overlay-more">
              <i className="icon-cd"></i> More
            </div>
          </div>
        </div>
        <div className="card-section card-section-pad">
          <h6 className="card-title">{this.props.fix.title}</h6>
          <p className="card-text">{this.props.fix.text}</p>
          <div>
            <img className="card-thumbnail" src={this.props.fix.thumbnail}/>
            <span className="card-text card-text-bold">{this.props.fix.user}</span>
          </div>
        </div>

      </div>
    )
  }
}

export default FixCard
