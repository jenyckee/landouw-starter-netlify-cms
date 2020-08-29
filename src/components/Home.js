import React from 'react'
import styled from 'styled-components'
import Location from './Location'
import Menus from './Menus'
import Page from './Page'
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker"
import { format } from "./helpers"
import { navigate } from 'gatsby-link'

import "react-datepicker/dist/react-datepicker.css"
import nl from 'date-fns/locale/nl';
import { getDay, setHours, setMinutes } from "date-fns";

registerLocale('nl', nl)
setDefaultLocale('nl');

function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
}

export default class Home extends React.Component {
  constructor() {
    super()
    this.state = {
      isValidated: false
    }
  }

  handleSubmit = e => {
    e.preventDefault()
    const form = e.target
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': form.getAttribute('name'),
        ...this.state,
      }),
    })
      .then(() => navigate(form.getAttribute('action')))
      .catch(error => alert(error))
  }

  handleChange = e => {
    console.log(this.state)
    this.setState({ [e.target.name]: e.target.value })
  }

  getMinTime(date) {
    return getDay(date) === 5 ? setHours(setMinutes(new Date(), 0), 18) : setHours(setMinutes(new Date(), 0), 12)
  }

  render() {
    const isWeekendday = date => {
      const day = getDay(date);
      return !(day !== 0 && day !== 6 && day !== 5)
    }
    const chosenDate = this.state.datum
    // const minTime = this.getMinTime(chosenDate)
    const minTime = setHours(setMinutes(new Date(), 0), 17)
    const maxTime = setHours(setMinutes(new Date(), 30), 20)

    const info = format(this.props.info)
    const about = format(this.props.about)

    return (
      <Page>
        <div className="intro">
          <div className="container">
            <div className="row no-gutters">
              <div className="col-md-12 col-lg-6 d-md-flex yellow-bg-left">
                <div className="block">
                  <img src="/img/logo.png" width="250px"></img>
                </div>
              </div>
              <div className="col-md-12 col-lg-6">
                <div style={{ background: "white", width: "100%"}}>
                  <img className="splash" height="787" src={this.props.intro}></img>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row no-gutters">
            <div className="col-lg-6">
              <Section>
                <h4>OVER ONS</h4>
                {about}
              </Section>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row no-gutters">
            <div className="col-md-6 hidden-sm-down">
            </div>
            <div className="col-lg-6 col-md-12">
              <video className="video-section__video" controls src="img/tendens.mp4"></video>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row no-gutters">
            <div className="col-md-12">
              <MenuSection>
                <h4>MENU</h4>
                <Menus data={this.props.menus}></Menus>
              </MenuSection>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row no-gutters">
            <div className="col-md-6"></div>
            <div className="col-md-6">
              <SectionInfo>
                <h4>MEER INFO</h4>
                {info}
              </SectionInfo>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row no-gutters">
            <div className="col-md-6">
              <SectionCorona>
                <h4>CORONA REGISTRATIE</h4>
                <p>Wegens de coronamaatregelen zijn wij verplicht uw contactgegevens bij te houden. Bedankt voor uw medewerking.</p>
                <iframe src="https://coronaregistratie.herokuapp.com/" width="100%" height="500px"></iframe>
              </SectionCorona>
            </div>
          </div>
        </div>
        <Footer>
          <div className="container">
            <div className="row no-gutters">
              <div className="col-md-6">
                <section>
                  <form action="/contact/thanks/"
                        name="contact" method="post" data-netlify="true" data-netlify-honeypot="bot-field" onSubmit={this.handleSubmit}>
                    <input type="hidden" name="form-name" value="contact" />
                    <h4>RESERVEREN</h4>
                    <InputField label="Naam" name="naam" onChange={this.handleChange}/>
                    <InputField label="Email" name="_replyto" onChange={this.handleChange}/>
                    <InputField label="Telefoonnummer" name="telefoonnummer" onChange={this.handleChange}/>
                    <div className="row">
                      <div className="col-md-6">
                        <InputField label="Volwassenen" name="volwassenen" type="number" onChange={this.handleChange}/>
                      </div>
                      <div className="col-md-6">
                        <InputField label="Kinderen" name="kinderen" type="number" onChange={this.handleChange}/>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div>
                          <label>Datum</label>
                          <DatePicker
                            locale="nl"
                            name="datum"
                            dateFormat="dd/MM/yyyy"
                            selected={this.state.datum}
                            required={true}
                            onChange={d => this.setState({...this.state, datum: d})}></DatePicker>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div>
                          <label>Uur</label>
                          <DatePicker 
                            locale="nl"
                            name="datum"
                            showTimeSelect
                            timeIntervals={30}
                            showTimeSelectOnly
                            selected={this.state.datum}
                            dateFormat="HH:mm"
                            required={true}
                            onChange={d => this.setState({...this.state, datum: d})}></DatePicker>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <TextareaField label="Opmerkingen" name="Opmerkingen" onChange={this.handleChange}/>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <Button type="submit">Versturen</Button>
                      </div>
                    </div>
                  </form>
                </section>
              </div>
              <div className="col-md-6">
                <section>
                  <div className="row" style={{marginBottom: "3rem"}}>
                    <div className="col-md-6">
                      <h4>CONTACT</h4>
                      <span>KAPELLESTRAAT 60</span><br/>
                      <span>8573 TIEGEM</span><br/>
                      <span>+32 (0)56 72 25 97</span><br/>
                      <span>LANDOUW@TELENET.BE</span><br/>
                    </div>
                    <div className="col-md-6">
                      <h4>OPENINGSUREN</h4>
                      <span>{this.props.hours}</span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <Location/>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </Footer>
      </Page>
    )
  }
}
  
export const Button = styled.button`
background: #c2baa6;
border: none;
margin: .5rem 0;
padding: 1rem;
width: 100%;
&:hover {
  background: #c2baa666;
}
`

export const InputField = ({label, name, type, value, onChange}) => (
<div>
  <label>{label}</label>
  <input required={true} type={type} name={name} value={value} onChange={onChange}></input>
</div>
)

export const TextareaField = ({label, name, value, placeholder, onChange}) => (
<div>
  <label>{label}</label>
  <TextArea value={value} name={name} placeholder={placeholder} onChange={onChange} />
</div>
)

export const Footer = styled.footer`
background: ${props => props.theme.beigeLight};
`

export const SectionInfo = styled.section`
background: ${props => props.theme.oliveGreen};
color:  ${props => props.theme.coal};
`

export const SectionCorona = styled.section`
  background: ${props => props.theme.beigeLight};
  color:  ${props => props.theme.coal};
`

export const Section = styled.section`
background: ${props => props.theme.beigeLight};
color:  ${props => props.theme.coal};
`

export const MenuSection = styled.section`
background: ${props => props.theme.brownLight};
color:  ${props => props.theme.white};
// min-height: 1000px;
`


export const Container = styled.div`
background-color: ${props => props.theme.beigeLight};
height: 75vh;
`

export const Select = styled.select`
background: #c2baa6;
width: 100%;
color: white;
border: 0;
padding: 0.5rem;
border-radius: 0;
`
export const TextArea = styled.textarea`
background: #c2baa6;
width: 100%;
color: white;
border: 0;
padding: 0.5rem;
margin-top: 0.5rem;
height: 7.5rem
`
