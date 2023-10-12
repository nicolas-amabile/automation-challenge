/// <reference types="cypress" />
import allOperations from '../fixtures/operations.json'
const { _ } = Cypress // Local reference to lodash

// Include/exclude desired methods for performing operations
const executionTypes = {
  'Typing operation': cy.typeOperation, // Executes an entire operation at once pressing {enter} at the end
  'Pressing calculator buttons': cy.executeOperation, // Uses the calculator buttons for each keystroke
}

// Include/exclude operations for test run
const selectedOperationsForTesting = [
  'addition',
  'subtraction',
  'multiplication',
  'division',
  'mixed',
  'invalid inputs'
]

const operations = _.pick(allOperations, selectedOperationsForTesting)

describe('Operations', () => {
  beforeEach(() => {
    cy.openCalculator()
  })

  _.forEach(executionTypes, (runOperation, executionType) => {
    describe(executionType, () => {
      _.forEach(operations, (calculations, name) => {
        describe(_.capitalize(name), () => {
          calculations.forEach(([calculation, result]) => {
            it(`${executionType}: ${calculation} = ${result}`, () => {
              runOperation(calculation)
              cy.checkDisplayValue(result)
            })
          })
        })
      })
    })
  })
})