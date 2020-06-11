
import React, { Component } from 'react'

export default class Location extends Component {

  render() {
    return (
      <div className="mapouter">
        <iframe title="locationmap" width="100%" height="300" id="gmap_canvas" src="https://maps.google.com/maps?q=Landouw&t=&z=13&ie=UTF8&iwloc=&output=embed" frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0"></iframe>
      </div>
    )
  }
}