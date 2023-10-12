Cypress.Commands.add('searchCalculator', () => {
  cy.visit('/')
  cy.get('textarea[type="search"')
    .should('be.visible')
    .clear()
    .type('calculator {enter}')
  cy.get('div[data-async-context="query:calculator"]').should('be.visible')
})

Cypress.Commands.add('openCalculator', () => {
  cy.visit('/search?q=calculator')
  cy.get('div[data-async-context="query:calculator"]').should('be.visible')
})

Cypress.Commands.add('getCalculator', () => {
  cy.get('div[data-async-context="query:calculator"]')
})

Cypress.Commands.add('getOperationInput', () => {
  cy.getCalculator()
    .find('div[role="presentation"][tabindex="0"]')
})

Cypress.Commands.add('clickCalculatorButton', (button) => {
  cy.getCalculator()
    .find('.card-section')
    .find('table')
    .last()
    .contains(button)
    .click()
})

Cypress.Commands.add('typeOperation', (operation) => {
  cy.getOperationInput()
    .type(`${operation}{enter}`)
})

const convertOperationButtons = (operation) => operation
  .replace(/ /g, '')
  .replace(/-/g, '−')
  .replace(/\*/g, '×')
  .replace(/\//g, '÷')

Cypress.Commands.add('enterOperation', (operation) => {
  convertOperationButtons(operation)
    .split('')
    .forEach(cy.clickCalculatorButton)
})

Cypress.Commands.add('executeOperation', (operation) => {
  cy.enterOperation(operation)
  cy.clickCalculatorButton('=')
})

Cypress.Commands.add('checkDisplayValue', (result) => {
  cy.getOperationInput()
    .should('contain', result)
})
