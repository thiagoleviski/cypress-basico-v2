
describe('Central de Atendimento ao Cliente TAT', function() {
  beforeEach(function(){
    cy.visit('./src/index.html')
  })
// Testa os elementos que não são visíveis.
// invoca sem precisar do gatilho para ser chamado.
// .invoke('show')
// .invoke('hide')

  it.only('gato',function(){
    cy.get('span[id="cat"]')
      .invoke('show')
      .should('be.visible')
  })

  it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', function() {
    cy.get('.success')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Mensagem enviada com sucesso.')
      .invoke('hide')
      .should('not.be.visible')
    cy.get('.error')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Valide os campos obrigatórios!')
      .invoke('hide')
      .should('not.be.visible')
  })

  it('preenche os campos obrigatórios e envia o formulário', function(){
    let longText = Cypress._.repeat('Teste',20)

    cy.get('#open-text-area').invoke('val',longText,{delay:0})
    cy.should('have.value',longText)
  })

  // request GET
  it('faz uma requisição HTTP', function(){
    cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
      .should(function(response){
        const{status, statusText, body} = response
        expect(status).to.equal(200)
        expect(statusText).to.equal('OK')
        expect(body).to.include('CAC TAT')
      })
  })
})