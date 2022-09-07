// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('fillMandatoryFieldsAndSubmit',function(){

    let palavraRepetida = Cypress._.repeat('ArarA',20)
    cy.get('input[id=firstName]').type('Thiago').should('have.value','Thiago')
    cy.get('input[id=lastName]').type('Leviski').should('have.value','Leviski')
    cy.get('input[id=email]').type('thiago@gmail.com').should('have.value','thiago@gmail.com')
    cy.get('textarea[id=open-text-area]').type(palavraRepetida,{delay:0}).should('have.value',palavraRepetida)
    // cy.get('input[id=phone]').type('0123456789').should('be.visible',"0123456789")
    // cy.get('button[type=submit]').click()
    // cy.should('be.visible','span[class=success]')
})