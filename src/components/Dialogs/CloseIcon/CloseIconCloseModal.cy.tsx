import React from 'react'
import CloseModal from './CloseIcon'

describe('<CloseModal />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<CloseModal />)
  })
})