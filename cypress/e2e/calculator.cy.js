/// <reference types="cypress" />

describe('Calculator', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  describe('Visibility', () => {
    it('Opens the search page', () => {
      cy.get('textarea[type^="search"').should('be.visible')
    })

    it('Shows the calculator', () => {
      cy.searchCalculator()
    })
  })

  describe('AC/CE button', () => {
    it('Deletes last digit when pressing CE button', () => {
      let operation = '2 + 2'
      cy.openCalculator()
      cy.enterOperation(operation)
      while (operation.length) {
        cy.checkDisplayValue(operation)
        cy.clickCalculatorButton('CE')
        operation = operation.replace(/ /g, '').slice(0, -1); // Remove last char
      }
      cy.checkDisplayValue(0)
    })

    it('Resets the calculator after an operation', () => {
      cy.openCalculator()
      cy.executeOperation('2 + 2')
      cy.checkDisplayValue(4)
      cy.clickCalculatorButton('AC')
      cy.checkDisplayValue(0)
    })
  })
})
