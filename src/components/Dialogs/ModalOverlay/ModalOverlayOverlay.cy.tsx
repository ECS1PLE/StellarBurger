import React from 'react'
import Overlay from './ModalOverlay'

describe('<Overlay />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Overlay />)
  })
})