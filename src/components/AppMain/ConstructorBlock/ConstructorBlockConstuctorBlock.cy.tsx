import React from 'react'
import ConstuctorBlock from './ConstructorBlock'

describe('<ConstuctorBlock />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<ConstuctorBlock />)
  })
})