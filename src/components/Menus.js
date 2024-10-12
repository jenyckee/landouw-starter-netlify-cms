import React, { Component } from 'react';
import 'react-accessible-accordion/dist/minimal-example.css';
import { format } from './helpers';

function getSrc(image) {
  return !!image.childImageSharp ? image.childImageSharp.fluid.src : image
}

export default class Menus extends Component {
  constructor() {
    super()
    this.state = {
      current: 0
    }
  }
  render() {
    if (!this.props.data) {
      return <p>Menus ...</p>
    }
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="text-center"
           style={{display:"flex", alignItems: "center", flexWrap: "wrap", padding: "1rem", justifyContent:'center'}}>
          {this.props.data.options.map((menu, i) => 
            <div style={{margin: "0 0.5rem"}} key={i} onClick={() => this.setState({current: i})}
            onKeyDown={() => {}} role="button" tabIndex={0}
            >
              <h4 className={`menu-title ${this.state.current === i ? "selected": ""}`}>{menu.title}</h4>
            </div>
          )}
          </div>
        </div>
        <div className="col-md-6 text-center">
          {format(this.props.data.options[this.state.current].text)}
        </div>
        <div className="col-md-6">
          <img alt="" style={{width: "100%"}} src={getSrc(this.props.data.options[this.state.current].image)}></img>
        </div>
      </div>
    )
  }
}
