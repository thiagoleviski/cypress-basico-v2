# Testes automatizados com Cypress - Básico

👋 Seja bem-vindo(a)!

Estou fazendo este documento para facilitação dos estudos e como atividade do curso básico de Cypress do Walmyr Filho.

## O aplicativo a ser testado

Antes de começarmos a configurar o Cypress e escrever scripts de testes automatizados, deixa eu te apresentar a aplicação que vamos testar.

A aplicação se chama Central de Atendimento ao Cliente TAT - CAC TAT - e foi desenvolvida usando HTML, CSS e JavaScript.

A aplicação CAC TAT é um formulário para simular o envio de mensagens à uma central de atendimento ao cliente.

## Configurações e instalações

Antes de começar, garanta que os seguintes sistemas estejam instalados em seu computador.

git (estou usando a versão 2.37.1 enquanto faço este curso)
Node.js (estou usando a versão v16.16.0 enquanto faço este curso)
npm (estou usando a versão 8.11.0 enquanto faço este curso)
Google Chrome (estou usando a versão 98.0.4758.80 (Official Build) (x86_64) enquanto faço este curso)
Visual Studio Code (estou usando a versão 105.0.5195.102 (Versão oficial) 64 bits enquanto faço este curso) ou alguma outra IDE de sua preferência

Agora fazemos um fork do projeto...
1. Abra o navegador
2. Acesse a URL https://github.com/wlsf82/cypress-basico-v2
3. Faça um fork do projeto
4. No seu fork do projeto, clique no botão Code, escolha uma opção de clone (HTTPS ou SSH) e copie o link de clone do projeto
5. Em seu terminal de linha de comando (em uma pasta onde você armazene seus projetos de software), execute o comando git clone [cole-o-link-copiado-aqui].
6. Após o clone do projeto, acesse o diretório recém clonado (ex.: cd cypress-basico-v2/).

Chegou a hora de instalar o Cypress...
1. Na raiz do projeto, execute o comando npm install cypress@9.5.1 --save-dev (ou npm i cypress@9.5.1 -D para a versão curta)
2. Logo após, execute o comando npx cypress open para abrir o Cypress pela primeira vez
3. Por fim, com o Test Runner aberto, delete os exemplos criados automaticamente, crie um arquivo chamado CAC-TAT.spec.js e feche o Test Runner.

## O que você vai aprender

Flow do curso Cypress Básico

1. Como chamar o site (link ou diretório) pelo Cypress

	cy.visit('https://google.com')
	
	ou antes de cada caso de teste (it) podemos usar...
	beforeEach()
	
		  beforeEach(function(){
			cy.visit('./cypress-basico-v2/src/index.html')
		  })
	
2. Localizando (cy.get), digitando (.type) e clicando (.click) em elementos

	cy.get('button[type="submit"]').click()

	cy.get('input[type="text"]').type('Olá mundo!').should('have.value', 'Olá mundo!')
	
	
	Obs.: O .should é para validação do que deveria aparecer ou ter.
	
3. Selecionando (.select) elementos em listas suspensas
	
	3.1. Chamada por texto

		it('seleciona um produto (YouTube) por seu texto', function(){
		cy.get('#product').select('YouTube').should('have.value','youtube')
		})
	
	3.2. Chamada por valor

		it('seleciona um produto (Mentoria) por seu valor (value)', function(){
		cy.get('#product').select('mentoria').should('have.value','mentoria')
		})
	
	3.3. Chamada por índice

		it('seleciona um produto (Blog) por seu índice', function(){
		cy.get('#product').select(1).should('have.value','blog')
		})

4. Marcando inputs do tipo radio 

	cy.get('input[type="radio"][value="feedback"]').check()

5. Marcando (e desmarcando) inputs do tipo checkbox

	cy.get('input[type="radio"][value="feedback"]').uncheck()
	
6. Upload de arquivos com Cypress

	cy.get('input[type="file"]').selectFile('cypress/fixtures/example.json')
	

	6.1. Caso queira usar uma "variável" par não repetir o diretório do arquivo, existe o cy.fixture
			O cy.fixture pega os arquivos inseridos na pasta fixture do cypress-basico-v2/src/index
			Por exemplo:
			

			  it.only('seleciona um arquivo da pasta fixtures', function(){
					cy.fixture('example.json').as('sampleFile')
					cy.get('input[type=file]').selectFile('@sampleFile',{action:'drag-drop'})
					cy.get('input[type=file]').should(function(input){
						expect(input[0].files[0].name).to.equal('example.json')
				})
			  })


7. Lidando com links que abrem em outra aba
	7.1. Primeiro vamos testar se o link abre e para isso devemos constatar que o target = _blank na âncora "a" do link, pois
			desta forma obriga o link no href a abrir em uma outra aba
			
			Primeira opção:
			  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
				cy.get('#privacy a').should('have.attr', 'target', '_blank')
			  })
			  
			Segunda opção:
			  it('acessa a página da política de privacidade removendo o target e então clicanco no link', function(){
				cy.get('#privacy a').invoke('removeAttr', 'target')
			  })

	7.2. Segundo fazemos os testes normalmente chamando um link que seria aberto no cy.visit.
	

8. Simulando viewports mobiles
Na pasta package.json do cypress escrevemos este script (ou atualizamos) com as configurações mobile (w=410 e h=860)

	  "scripts": {
		"cy:open": "cypress open",
		"cy:open:mobile":"cypress open --config viewportWidth=410 viewportHeight=860",
		"test": "cypress run",
		"test:mobile": "cypress run --config viewportWidth=410 viewportHeight=860"
	  }
9. Parar o tempo
	cy.clock()

   Inserir tempo
   cy.tick(1000)  //1000ms

10. Repetir várias vezes a mesma função
	Cypress._.times(5,function(){
		it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
    cy.get('#email').type('thiago#gmail.com')
    cy.get('button[type="submit"]').click()
    cy.get('.error').should('be.visible')
  })
  })

    Repetir uma string um certo número de vezes
	Cypress._.repeat('*',3);
		Resultado será ***
	
## Vamos começar?

Vá para a seção [estrutura do curso](./lessons/_course-structure_.md).

___

Este é mais um curso da [**Escola Talking About Testing**](https://udemy.com/user/walmyr).
