beforeEach('chamando a URL', function(){
    cy.visit('/src/privacy.html')
  })

  describe('Central de Atendimento ao Cliente TAT', function() {
  it('verifica o título da aplicação', function() {
    cy.contains('CAC TAT - Política de privacidade').should('be.visible')
  })
})