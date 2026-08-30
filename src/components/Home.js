import React from 'react'
import styled from 'styled-components'
import Location from './Location'
import { HourPicker } from './HourPicker'
import Menus from './Menus'
import Page from './Page'
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker"
import { format } from "./helpers"
import { navigate } from 'gatsby-link'

import "react-datepicker/dist/react-datepicker.css";
import nl from 'date-fns/locale/nl';
import { getDay, setHours, setMinutes } from "date-fns";

const closingNotice = `# Een laatste hoofdstuk na meer dan 50 jaar ❤️

**Lieve klanten, vrienden en familie,**

Wat was het fijn om samen met jullie onze allerlaatste barbecue te mogen beleven. Het werd een schitterende avond, gevuld met gezelligheid, lachende gezichten en vooral heel veel mooie herinneringen.

We willen iedereen die erbij was dan ook uit de grond van ons hart bedanken. Jullie aanwezigheid maakte deze avond tot een moment dat we voor altijd zullen koesteren.

Intussen weten we ook wanneer we definitief onze deuren zullen sluiten.

### Zondag 20 september wordt onze allerlaatste openingsdag.

Na **meer dan vijftig jaar** komt daarmee een einde aan ons familieverhaal.

De komende weken willen we nog volop genieten.

We hopen jullie dan ook nog te mogen verwelkomen, om samen nog één keer te genieten van de sfeer, de gezelligheid en de vertrouwde plek die zoveel voor ons allemaal heeft betekend.

Op **zondag 20 september** valt dan uiteindelijk het doek.

Dat zal ongetwijfeld een emotioneel moment worden. Maar bovenal willen we terugkijken met **heel veel dankbaarheid**.

Dankjewel voor meer dan vijftig jaar vertrouwen, vriendschap, steun, warmte en mooie herinneringen.

**Jullie hebben mee het verhaal van onze zaak geschreven.**

En daarvoor zullen we jullie altijd dankbaar blijven. ❤️`

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
      isValidated: false,
      showClosingNotice: true,
      mounted: false
    }
  }

  componentDidMount() {
    this.setState({ mounted: true })
  }

  dismissClosingNotice = () => {
    this.setState({ showClosingNotice: false })
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
    this.setState({ [e.target.name]: e.target.value })
  }

  getMinTime(date) {
    return getDay(date) === 5 ? setHours(setMinutes(new Date(), 59), 17) : setHours(setMinutes(new Date(), 59), 11)
  }

  setDate = (date) => {
    this.setState({...this.state, datum: date})
  }

  render() {
    const info = format(this.props.info)
    const about = format(this.props.about)
    const excludeDates = this.props.sluiting.map(s => new Date(s.day))
    const closingMarkup = format(closingNotice)
    const shouldShowClosingNotice = this.state.mounted && this.state.showClosingNotice
    return (
      <Page>
        {shouldShowClosingNotice && (
          <PopupOverlay onClick={this.dismissClosingNotice}>
            <PopupCard onClick={e => e.stopPropagation()}>
              <CloseButton type="button" onClick={this.dismissClosingNotice} aria-label="Dismiss popup">×</CloseButton>
              {closingMarkup}
            </PopupCard>
          </PopupOverlay>
        )}
        <div className="intro">
          <div className="container">
            <div className="row no-gutters">
              <div className="col-md-12 col-lg-6 d-md-flex yellow-bg-left">
                <div className="block">
                  <img src="/img/logo.png" width="250px" alt=""></img>
                </div>
              </div>
              <div className="col-md-12 col-lg-6">
                <div style={{ background: "white", width: "100%"}}>
                  <img className="splash" height="787" src={this.props.intro}
                    alt="Landouw"
                  ></img>
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
              <video className="video-section__video" controls src="img/tendens.mp4">
                <track default kind="captions" src="" />
              </video>
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
        <Footer>
          <div className="container">
            <div className="row no-gutters">
              <div className="col-md-6">
                <section>
                  <form action="/contact/thanks/"
                        name="contact" method="post" data-netlify="true" data-netlify-honeypot="bot-field" onSubmit={this.handleSubmit}>
                    <input type="hidden" name="form-name" value="contact" />
                    <h4>RESERVEREN</h4>
                    <InputField label="Naam" name="naam" onChange={this.handleChange} title="Vul uw naam in"/>
                    <InputField label="Email" name="_replyto" onChange={this.handleChange} title="Vul een geldig emailadres in"/>
                    <InputField label="Telefoonnummer" name="telefoonnummer" onChange={this.handleChange} title="Vul een geldig telefoonnummer in"/>
                    <div className="row">
                      <div className="col-md-6">
                        <InputField label="Volwassenen" name="volwassenen" type="number" onChange={this.handleChange} title="Vul het aantal volwassenen in"/>
                      </div>
                      <div className="col-md-6">
                        <InputField label="Kinderen" name="kinderen" type="number" onChange={this.handleChange} title="Vul het aantal kinderen in"/>
                      </div>
                    </div>
                    <div className="row mb-1">
                      <div className="col-md-12">
                        <div className="mb-1">
                          <label htmlFor="datum-day">Datum</label>
                          <DatePicker
                            id="datum-day"
                            name="datum"
                            dateFormat="dd/MM/yyyy"
                            minDate={new Date()}
                            maxDate={new Date('2026-09-20')}
                            selected={this.state.datum}
                            filterDate={date => date.getDay() !== 1 && date.getDay() !== 2 && date.getDay() !== 3 && date.getDay() !== 4}
                            required={true}
                            onChange={this.setDate}
                            excludeDates={excludeDates}
                          ></DatePicker>
                        </div>
                        {this.state.datum && 
                          <div className="mb-1">
                            <label
                              htmlFor="datum-time"
                            >Uur</label>
                              <HourPicker onChange={this.setDate} value={this.state.datum}></HourPicker>
                          </div>
                        }
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
                <section>
                  <p>Neem een kijkje op de website van ons <a href="https://joyce-poperinge.wixsite.com/casa88" target='_blank'>vakantiehuis in Estepona</a>.</p>
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

export const InputField = ({label, name, type, value, onChange, title}) => (
<div>
  <label>{label}</label>
  <input 
    pattern=".*\S+.*"
    required={true} 
    type={type} 
    name={name} 
    value={value} 
    onChange={onChange}
    title={title}></input>
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

export const PopupOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 1rem;
`

export const PopupCard = styled.div`
  position: relative;
  max-width: 66rem;
  width: 100%;
  background: #f8f5ef;
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 1.5rem 3rem rgba(0, 0, 0, 0.2);
  padding: 4rem;
  // on mobile less padding
  @media (max-width: 768px) {
    padding: 2rem;
  }
  max-height: 90vh;
  overflow-y: auto;

  h1, h2, h3, h4, h5, h6 {
    margin-top: 0;
    margin-bottom: 1rem;
  }

  p {
    margin-bottom: 1rem;
  }
`

export const CloseButton = styled.button`
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  border: none;
  background: transparent;
  font-size: 2rem;
  line-height: 1;
  cursor: pointer;
  color: #000;
`

export const Section = styled.section`
background: ${props => props.theme.beigeLight};
color:  ${props => props.theme.coal};
`

export const MenuSection = styled.section`
background: ${props => props.theme.brownLight};
color:  ${props => props.theme.white};
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
