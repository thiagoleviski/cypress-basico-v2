beforeEach('chamando a URL', function(){
  cy.visit('/src/index.html')
})

describe('Central de Atendimento ao Cliente TAT', function() {
  it('verifica o título da aplicação', function() {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios e envia o formulário', function(){
    let palavraRepetida = Cypress._.repeat('ArarA',20)

    cy.get('input[id=firstName]').type('Thiago').should('have.value','Thiago')
    cy.get('input[id=lastName]').type('Leviski').should('have.value','Leviski')
    cy.get('input[id=email]').type('thiago@gmail.com').should('have.value','thiago@gmail.com')
    cy.get('textarea[id=open-text-area]').type(palavraRepetida,{delay:0}).should('have.value',palavraRepetida)
    cy.get('button[type=submit]').click()
    cy.should('be.visible','span[class=success]')

  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
    let palavraRepetida = Cypress._.repeat('ArarA',20)

    cy.get('input[id=firstName]').type('Thiago').should('have.value','Thiago')
    cy.get('input[id=lastName]').type('Leviski').should('have.value','Leviski')
    cy.get('input[id=email]').type('thiago@gmail,com').should('have.value','thiago@gmail,com')
    cy.get('textarea[id=open-text-area]').type(palavraRepetida,{delay:0}).should('have.value',palavraRepetida)
    cy.get('button[type=submit]').click()
    cy.should('be.visible','span[class=error]')
  })

  it('telefone somente aceita números',function(){
    cy.get('input[id=phone]').type('João').should('be.visible',"")
    cy.get('button[type=submit]').click()
    cy.should('be.visible','span[class=error]')
  })

  it('mensagem de erro sem preencher os campos',function(){
    cy.get('button[type=submit]').click()
    cy.should('be.visible','span[class=error]')
  })

  it('chamando COMANDO do commands.js',function(){
    cy.fillMandatoryFieldsAndSubmit()
  })

  it('validando o cy.contains()', function(){
    let palavraRepetida = Cypress._.repeat('ArarA',20)

    cy.get('input[id=firstName]').type('Thiago').should('have.value','Thiago')
    cy.get('input[id=lastName]').type('Leviski').should('have.value','Leviski')
    cy.get('input[id=email]').type('thiago@gmail.com').should('have.value','thiago@gmail.com')
    cy.get('textarea[id=open-text-area]').type(palavraRepetida,{delay:0}).should('have.value',palavraRepetida)
    cy.contains('Enviar').click()
    cy.should('be.visible','span[class=success]')
  })

  it('Validando seleção de lista suspensa cy.select()',function(){
    cy.get('select[id=product]').select('Blog').should('have.value','blog')
    cy.get('select[id=product]').select('youtube').should('have.value','youtube')
    cy.get('select[id=product]').select(2).should('have.value','cursos')
    cy.get('select[id=product]').select('Mentoria').should('have.value','mentoria')

  })

  it('Validando escolha da bolinha... radio com cy.check()',function(){
    cy.get('input[type=radio][value=ajuda]').check().should('be.checked')
    cy.get('input[type=radio][value=elogio]').check().should('be.checked')
    cy.get('input[type=radio][value=feedback]').check().should('be.checked')
  })

  it('marca cada tipo de atendimento com função .each() e .wrap()',function(){
    cy.get('input[type="radio"]').should('have.length',3)
      .each(function($radio){
        cy.wrap($radio).check()
        cy.wrap($radio).should('be.checked')
      })
  })

  it('Validando escolha da caixa de seleção com cy.check() e cy.uncheck()',function(){
    cy.get('input[type="checkbox"]').check()
    cy.get('input[type="checkbox"][id="phone-checkbox"]').uncheck()
  })

  it('Validando mensagem de erro quando telefone fica obrigatório',function(){
    cy.fillMandatoryFieldsAndSubmit()
    cy.get('input[type="checkbox"]').check()
    cy.get('button[type=submit]').click()
    cy.should('be.visible','span[class=error]')
  })

  it('Fazendo um upload de arquivo com cy.selectFile()', function(){
    cy.get('input[id="file-upload"][type="file"]').click().selectFile('cypress/fixtures/example.json')
  })

  it('Fazendo um upload de arquivo com DRAG AND DROP', function(){
    cy.get('input[id="file-upload"][type="file"]').click().selectFile('cypress/fixtures/example.json', {action:'drag-drop'})
      .should(function($input){
        console.log($input)
        expect($input[0].files[0].name).be.equal('example.json')
      })
  })

  it('Fazendo um upload de arquivo com ALIAS cy.as()', function(){
    cy.fixture('example.json').as('sampleFile')
    cy.get('input[type="file"]')
      .selectFile("@sampleFile")
      .should(function($input){
        console.log($input)
        expect($input[0].files[0].name).be.equal('example.json')
      })
  })

  it('Checar se a o link vai abrir em outra janela, ou seja, se o target = _blank', function(){
    cy.get('#privacy a').should('have.attr','target','_blank')
  })

  it.only('Checar se a o link vai abrir em outra janela, ou seja, se o target = _blank', function(){
    cy.get('a[href="privacy.html"]').invoke('removeAttr', 'target')
  })

})