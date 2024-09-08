import React from 'react'
import { IngridientDetails } from './IngridientDetails'

describe('<IngridientDetails />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<IngridientDetails />)
  })
})