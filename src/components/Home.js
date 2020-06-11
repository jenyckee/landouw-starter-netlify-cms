import React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import Location from './Location'
import Menus from './Menus'
import Page from './Page'
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker"

import "react-datepicker/dist/react-datepicker.css"
import nl from 'date-fns/locale/nl';
import { getDay, setHours, setMinutes } from "date-fns";

registerLocale('nl', nl)
setDefaultLocale('nl');

export default class Home extends React.Component {

  constructor() {
    super()
    this.state = {
      reservation: {
        date: null
      }
    }
  }

  getMinTime(date) {
    return getDay(date) === 5 ? setHours(setMinutes(new Date(), 0), 18) : setHours(setMinutes(new Date(), 0), 12)
  }

  render() {
    const isWeekendday = date => {
      const day = getDay(date);
      return !(day !== 0 && day !== 6 && day !== 5)
    }
    const chosenDate = this.state.reservation.date
    const minTime = this.getMinTime(chosenDate)
    const maxTime = setHours(setMinutes(new Date(), 30), 20)

    return (
      <Page>
        <Header>
          <div className="row no-gutters">
            <div className="col-lg-6 d-md-flex">
              <div className="block">
                <div >
                  <img src="/static/logo.png"></img>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-sm-12 hidden-md-down">
              <div style={{width: "100%",
                  height: "75vh",
                  background: `url(${this.props.intro})`,
                  backgroundSize: "cover"}}>

              </div>
            </div>
          </div>
        </Header>
        <div className="container">
          <div className="row no-gutters">
            <div className="col-lg-6">
              <Section>
                <h4>OVER ONS</h4>
                {/* {entries[0].fields.about.content.map((p,i ) => <p key={i}>{p.content[0].value}</p>)} */}
              </Section>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row no-gutters">
            <div className="col-md-6 hidden-sm-down">
            </div>
            <div className="col-lg-6 col-md-12">
              <video className="video-section__video" controls src="static/tendens.mp4"></video>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row no-gutters">
            <div className="col-md-12">
              <MenuSection>
                <h4>MENU</h4>
                {/* <Menus data={entries[0].fields.menus}></Menus> */}
              </MenuSection>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-6"></div>
            <div className="col-md-6">
              <SectionInfo>
                <h4>MEER INFO</h4>
                {/* {entries[0].fields.info.content.map((p,i ) => <p key={i}>{p.content[0].value}</p>)} */}
              </SectionInfo>
            </div>
          </div>
        </div>

        <Footer>
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <section>
                  <form name="contact" method="post" data-netlify="true" data-netlify-honeypot="bot-field" >
                    <input type="hidden" name="form-name" value="contact" />
                    <h4>RESERVEREN</h4>
                    <InputField label="Naam" name="naam"/>
                    <InputField label="Email" name="_replyto"/>
                    <InputField label="Telefoonnummer" name="telefoonnummer"/>
                    <div className="row">
                      <div className="col-md-6">
                        <InputField label="Volwassenen" name="volwassenen" type="number"/>
                      </div>
                      <div className="col-md-6">
                        <InputField label="Kinderen" name="kinderen" type="number"/>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div>
                          <label>Datum</label>
                          <DatePicker
                            name="datum"
                            locale="nl"
                            filterDate={isWeekendday}
                            dateFormat="dd/MM/yyyy"
                            selected={this.state.reservation.date} 
                            ></DatePicker>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div>
                          <label>Uur</label>
                          <DatePicker 
                            locale="nl"
                            name="uur"
                            showTimeSelect
                            timeIntervals={30}
                            showTimeSelectOnly
                            selected={this.state.reservation.date}
                            dateFormat="HH:mm"
                            minTime={minTime}
                            maxTime={maxTime}
                            ></DatePicker>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <TextareaField label="Opmerkingen" name="Opmerkingen" />
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
                      <span>VRIJDAG VANAF 17U, ZATERDAG EN ZONDAG DOORLOPEND 'S MIDDAGS EN 'S AVONDS.</span>
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
        {/* <Helmet title='Home' /> */}

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

export const InputField = ({label, name, type, value}) => (
<div>
  <label>{label}</label>
  <Input type={type} name={name} value={value}></Input>
</div>
)

export const TextareaField = ({label, name, value, placeholder}) => (
<div>
  <label>{label}</label>
  <TextArea value={value} name={name} placeholder={placeholder} />
</div>
)

export const Footer = styled.footer`
background: ${props => props.theme.beigeLight};
`

export const SectionInfo = styled.section`
background: ${props => props.theme.oliveGreen};
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


export const IntroRight = styled.div`

`

export const IntroLeft = styled.img`
`
export const Container = styled.div`
background-color: ${props => props.theme.beigeLight};
height: 75vh;
`

export const Header = styled.div`
background-color: ${props => props.theme.beigeLight};
`

export const Input = styled.input`

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
