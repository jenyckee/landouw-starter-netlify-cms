import React, { Component } from 'react'
import styled from 'styled-components'
import 'react-accessible-accordion/dist/minimal-example.css';

export default class Menus extends Component {
  constructor() {
    super()
    this.state = {
      current: 0
    }
  }
  render() {
    return (
      <div className="row">
        <div className="col-md-6">
          {this.props.data.map((menu, i) => 
            <div onClick={() => this.setState({current: i})}>
              <h4 className={`menu-title ${this.state.current === i ? "selected": ""}`}>{menu.fields.titel}</h4>
            </div>
          )}
        </div>
        <div className="col-md-6 text-center">
          {this.props.data[this.state.current].fields.description.content.map(p => <p>{p.content[0].value}</p>)}
        </div>
      </div>
    )
  }
}
