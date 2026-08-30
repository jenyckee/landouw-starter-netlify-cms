import { format } from './helpers'

describe('format', () => {
  it('renders markdown headings and bold text as HTML', () => {
    const result = format('### Zondag 20 september wordt onze allerlaatste openingsdag.\n\n**Lieve klanten, vrienden en familie,**')

    expect(result.props.dangerouslySetInnerHTML.__html).toContain('<h3>Zondag 20 september wordt onze allerlaatste openingsdag.</h3>')
    expect(result.props.dangerouslySetInnerHTML.__html).toContain('<strong>Lieve klanten, vrienden en familie,</strong>')
  })
})
