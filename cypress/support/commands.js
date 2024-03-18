Cypress.Commands.add('cadastroUsuario', (usuarios, email, senha, admin) => {
 let modificar = `modificar01@teste${Math.floor(Math.random() * 10)}.com`
  cy.request({
      method: 'POST',
      url: 'usuarios',
      body: {
        "nome": 'modificar',
        "email": 'modificar01',
        "password": 'teste123',
        "administrador": 'true',
      }   
    });
  });
  
  Cypress.Commands.add('token',(email,senha) => {
    cy.request({
      method: 'POST',
      url: 'login',
      body: {
          email: email,
          password: senha,
      }   
    }).then(response => {
      return response.body.authorization
    })
  });

  let usuarios = 'Usuario EBAC' + Math.floor(Math.random() * 1000000) 

  Cypress.Commands.add('editarUsuarios' ,(token, nome, email, password,administrador) => {
    cy.request({ 
          method: 'POST',
          url: 'usuarios',
          headers: {authorization: token},
          body: {
              nome: 'birello',
              email: email,
              password: 'teste123',
              administrador: 'true'
          }, 
          failOnStatusCode: false
    });
 })

 Cypress.Commands.add('cadastrarProduto' , (token, produto, preco, descricao, quantidade) =>{
  cy.request({
      method: 'POST', 
      url: 'produtos',
      headers: {authorization: token}, 
      body: {
          "nome": produto,
          "preco": preco,
          "descricao": descricao,
          "quantidade": quantidade
        }, 
        failOnStatusCode: false
  })
})

Cypress.Commands.add('deleteProdutos', (productId, failStatusCode) =>{
  cy.api({
      method: 'DELETE',
      url: '/produtos/'+productId,
      headers: {  Authorization : localStorage.getItem('token') },
      failOnStatusCode: failStatusCode
  })
})

let email = `birello@ebac${Math.floor(Math.random() * 100000000)}.com`
