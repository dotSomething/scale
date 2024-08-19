function completeGrid() {
  cy.get('#left_0').type('0');
  cy.get('#left_1').type('1');
  cy.get('#left_2').type('2');
  cy.get('#right_0').type('6');
  cy.get('#right_1').type('7');
  cy.get('#right_2').type('8');
}
function validateEmptyGrid() {
  cy.get('#left_0').should('have.value', '')
  cy.get('#left_1').should('have.value', '')
  cy.get('#left_2').should('have.value', '')
  cy.get('#right_0').should('have.value', '')
  cy.get('#right_1').should('have.value', '')
  cy.get('#right_2').should('have.value', '')
}
function weightBars() {
  cy.get('#weigh').click()
  cy.get('li').should('be.visible', { timeout: 5000 });
}
function validateSuccess() {
  cy.on('window:alert', (alertText) => {
    expect(alertText).to.equal('Yay! You find it!');
  })
}

describe('Validate scale.', () => {
  beforeEach(() => {

    cy.visit('https://sdetchallenge.fetch.com/')
    cy.title().should('eq', 'React App')
  });
  it('Validate buttons and grid', () => {
    completeGrid();
    cy.get('#weigh').click()
    cy.get('li').should('be.visible', { timeout: 5000 });
    cy.get('#reset').first().invoke('text').then((text) => {
      expect(text.trim()).not.to.equal('?');
    });
    // cy.get('#reset').eq(1).click(); // Cypress can't seem to distinguish this "reset" from the result's "reset"
    cy.contains('Reset').click(); // Not ideal. Recommend updating code to set a unique id for the results element
    validateEmptyGrid();
  })

  it('Validate finding fake bar', () => {
    completeGrid();
    weightBars();

    cy.get('#reset').first().invoke('text').then((text) => {
      window.result1 = text.trim();

      cy.contains('Reset').click();

      if (window.result1 === '=') {
        cy.log('Global variable result1 is set to:', window.result1);

        cy.get('#left_0').type('3');
        cy.get('#right_0').type('5');

        weightBars();
        cy.get('li').eq(1).should('be.visible');

        cy.get('#reset').first().invoke('text').then((text) => {
          window.resultsFor3and5 = text.trim();

          if (window.resultsFor3and5 === '=') {
            cy.log('The fake bar is 4.')
            cy.get('#coin_4').click()
          }
          if (window.resultsFor3and5 === '<') {
            cy.log('The fake bar is 3.')
            cy.get('#coin_3').click()
          }
          if (window.resultsFor3and5 === '>') {
            cy.log('The fake bar is 5.')
            cy.get('#coin_5').click()
          }
        })

      }
      if (window.result1 === '<') {
        cy.log('Global variable result1 is set to:', window.result1);

        cy.get('#left_0').type('0');
        cy.get('#right_0').type('2');

        weightBars();
        cy.get('li').eq(1).should('be.visible');

        cy.get('#reset').first().invoke('text').then((text) => {
          window.resultsFor0and2 = text.trim();

          if (window.resultsFor0and2 === '=') {
            cy.log('The fake bar is 1.')
            cy.get('#coin_1').click()
          }
          if (window.resultsFor0and2 === '<') {
            cy.log('The fake bar is 0.')
            cy.get('#coin_0').click()
          }
          if (window.resultsFor0and2 === '>') {
            cy.log('The fake bar is 2.')
            cy.get('#coin_2').click()
          }
        })

      }
      if (window.result1 === '>') {
        cy.log('Global variable result1 is set to:', window.result1);

        cy.get('#left_0').type('6');
        cy.get('#right_0').type('8');

        weightBars();
        cy.get('li').eq(1).should('be.visible');

        cy.get('#reset').first().invoke('text').then((text) => {
          window.resultsFor6and8 = text.trim();

          if (window.resultsFor6and8 === '=') {
            cy.log('The fake bar is 7.')
            cy.get('#coin_7').click()
          }
          if (window.resultsFor6and8 === '<') {
            cy.log('The fake bar is 6.')
            cy.get('#coin_6').click()
          }
          if (window.resultsFor6and8 === '>') {
            cy.log('The fake bar is 8.')
            cy.get('#coin_8').click()
          }
        })
      }

    });
    validateSuccess()
  })
})
