import React, { Component } from 'react'
import styled from 'styled-components'
import 'react-accessible-accordion/dist/minimal-example.css';
import { format } from './helpers'

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
        <div className="col-md-6">
          {this.props.data.options.map((menu, i) => 
            <div key={i} onClick={() => this.setState({current: i})}>
              <h4 className={`menu-title ${this.state.current === i ? "selected": ""}`}>{menu.title}</h4>
            </div>
          )}
        </div>
        <div className="col-md-6 text-center">
          {format(this.props.data.options[this.state.current].text)}
        </div>
      </div>
    )
  }
}
