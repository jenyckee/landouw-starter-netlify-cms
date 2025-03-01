import React from 'react'
import Layout from '../../components/Layout'
import { Link } from 'gatsby'

const Thanks = () => (
  <Layout>
    <section className="section">
      <div className="container">
        <div className="content">
          <h1>Bedankt!</h1>
          <Link to="/">Ga terug</Link>
        </div>
      </div>
    </section>
  </Layout>
)

export default Thanks;