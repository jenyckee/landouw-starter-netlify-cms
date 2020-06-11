import React, { Component } from 'react'
import styled from 'styled-components'
import 'react-accessible-accordion/dist/minimal-example.css';

function format(text) {
  const formatted = text.split(`\n\n`).map(paragraph => `<p>${paragraph.replace(/\n/g, `<br>`)}</p>`).join(``) 
  return <div dangerouslySetInnerHTML={{ __html: formatted }} />
}

export default class Menus extends Component {
  constructor() {
    super()
    this.state = {
      current: 0
    }
  }
  render() {
    console.log(this.props.data)
    return (
      <div className="row">
        <div className="col-md-6">
          {this.props.data.options.map((menu, i) => 
            <div onClick={() => this.setState({current: i})}>
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
