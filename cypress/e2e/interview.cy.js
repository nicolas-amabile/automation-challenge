/// <reference types="cypress" />

// 1. Access the page https://www.buildingconnected.com/
// 2. Hover over the Products tab and click on the link Subcontractor Network

// 3. Scroll down the page to find a section called FAQs
// 4. Validate that there are in total six rows in the FAQs table (These are - 3 questions and 3 answers)
// 5. Validate that the first question displayed under the FAQs table is Q: Does BuildingConnected share my private subcontractor lists with competitors?

describe('BuildingConnected web page', () => {
  it('Validate content', () => {
    cy.origin('https://www.buildingconnected.com/', () => {
      const FAQ_NUMBER_OF_QUESTIONS = 3;
      const QUESTION = 'Q: Does BuildingConnected share my private subcontractor lists with competitors?'

      cy.visit('/')
      cy.viewport(1100, 500)

      cy.get('[class*="navbar-links"]').contains('Products').trigger('mouseover')
      cy.get('[class*="small-link"] [cursor="pointer"]')
        .contains('Subcontractor Network')
        .should('be.visible')
        .click()

      cy.contains('Get more from the network with BuildingConnected Pro.', { timeout: 10000 })
        .should('be.visible')

      cy.scrollTo('bottom')

      cy.get('[class*="faq-table"]')
        .should('have.length', FAQ_NUMBER_OF_QUESTIONS * 2)
        .first().contains(QUESTION)
    })
  })
})