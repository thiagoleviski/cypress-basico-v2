describe('Central de Atendimento ao Cliente TAT', function() {
  beforeEach(function(){
    cy.visit('./src/index.html')
  })

  it('verifica o título da aplicação', function() {
    cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios e envia o formulário', function(){
    let longText = 'Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,';
    
    cy.get('#firstName').type('Thiago')
    cy.get('#lastName').type('Leviski')
    cy.get('#email').type('thiago@gmail.com')
    cy.get('#open-text-area').type(longText,{delay:0})
    //propriedade delay para colocar um tempo para a digitação
    cy.get('button[type="submit"]').click()

    cy.get('.success').should('be.visible')
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
    cy.get('#email').type('thiago#gmail.com')
    cy.get('button[type="submit"]').click()
    cy.get('.error').should('be.visible')
  })

  it('telefone com valor não-numérico for digitado', function(){
    cy.get('#phone').type('DDD').should('have.value','')
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
    let longText = 'Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,';
    
    cy.get('#firstName').type('Thiago')
    cy.get('#lastName').type('Leviski')
    cy.get('#email').type('thiago@gmail.com')
    cy.get('#open-text-area').type(longText,{delay:0})
    cy.get('#phone-checkbox').check()
    cy.get('button[type="submit"]').click()
    cy.get('.error').should('be.visible')
  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
    let longText = 'Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,';
    
    cy.get('#firstName').type('Thiago').clear().should('have.value','')
    cy.get('#lastName').type('Leviski').clear().should('have.value','')
    cy.get('#email').type('thiago@gmail.com').clear().should('have.value','')
    cy.get('#open-text-area').type(longText,{delay:0}).clear().should('have.value','')
    cy.get('#phone-checkbox').click()
    cy.get('#phone').type('123456789').clear().should('have.value','')
  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios',function(){
    cy.get('button[type="submit"]').click()
    cy.get('.error').should('be.visible')
  })

  it('envia o formuário com sucesso usando um comando customizado', function(){
    cy.fillMandatoryFieldsAndSubmit()
  })

  it('seleciona um produto (YouTube) por seu texto', function(){
    cy.get('#product').select('YouTube').should('have.value','youtube')
  })

  it('seleciona um produto (Mentoria) por seu valor (value)', function(){
    cy.get('#product').select('mentoria').should('have.value','mentoria')
  })

  it('seleciona um produto (Blog) por seu índice', function(){
    cy.get('#product').select(1).should('have.value','blog')
  })

  it('marca o tipo de atendimento "Feedback"', function(){
    cy.get(':nth-child(4) > input').check().should('have.value','feedback')
    cy.get('input[type="radio"][value="feedback"]').check().should('have.value','feedback')
  })
  it('marca cada tipo de atendimento', function(){
    cy.get('input[type="radio"][value="ajuda"]').check().should('have.value','ajuda').should('be.checked')
    cy.get('input[type="radio"][value="elogio"]').check().should('have.value','elogio').should('be.checked')
    cy.get('input[type="radio"][value="feedback"]').check().should('have.value','feedback').should('be.checked')
  })

  it('marca ambos checkboxes, depois desmarca o último', function(){
    cy.get('#email-checkbox').check().should('be.checked')
    cy.get('#phone-checkbox').check().should('be.checked')
    cy.get('input[type=checkbox]').last().uncheck()
  })

//função callback analisando o ARRAY input e retornando a comparação .to.equal
//ao "name = example.json" deste ARRAY 

  it('seleciona um arquivo da pasta fixtures', function(){
    cy.get('input[type=file]').selectFile('./cypress/fixtures/example.json')
    cy.get('input[type=file]').should(function(input){
      expect(input[0].files[0].name).to.equal('example.json')
    })
  })

//função drag and drop

  it('seleciona um arquivo da pasta fixtures', function(){
    cy.get('input[type=file]').selectFile('./cypress/fixtures/example.json',{action:'drag-drop'})
    cy.get('input[type=file]').should(function(input){
      expect(input[0].files[0].name).to.equal('example.json')
  })
  })

//setando o arquivo como fosse um "arquivo exemplo"

  it('seleciona um arquivo da pasta fixtures', function(){
    cy.fixture('example.json').as('sampleFile')
    cy.get('input[type=file]').selectFile('@sampleFile',{action:'drag-drop'})
    cy.get('input[type=file]').should(function(input){
      expect(input[0].files[0].name).to.equal('example.json')
  })
  })

  //Somente verificar que clicando no link a aba vai abrir em outra janela
  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
    cy.get('#privacy a').should('have.attr', 'target', '_blank')

  })

  //Somente verificar que clicando no link a aba vai abrir em outra janela de uma segunda forma
  it('acessa a página da política de privacidade removendo o target e então clicanco no link', function(){
    cy.get('#privacy a').invoke('removeAttr', 'target')
  })

  // Para testar o link que se abre, é só realizar os testes chamando o link no cy.visit e segue igual o de sempre

  })
