/// <reference types="cypress" />

describe('Calculator', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Opens the search page', () => {
    cy.get('textarea[type^="search"').should('be.visible')
  })
})