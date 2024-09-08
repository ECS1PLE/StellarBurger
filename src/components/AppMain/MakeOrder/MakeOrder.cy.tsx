import React from 'react'
import MakeOrder from './MakeOrder'

describe('<MakeOrder />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<MakeOrder />)
  })
})