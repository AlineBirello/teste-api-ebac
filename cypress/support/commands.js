Cypress.Commands.add('token', (email, senha) => { 
    cy.request ({
        method: 'POST',
        url: 'login',
        body: {
          "email": email,
          "password": senha
        }
      }).then(response => {
        return response.body.authorization
      })
    })

 Cypress.Commands.add('cadastrarUsuarios' , (token, nome, email, password) =>{
    cy.request({
        method: 'POST', 
        url: 'usuarios', 
        body: {
            "nome": nome,
            "email": email,
            "password": password,
            "administrador": "true"
          }, 
          failOnStatusCode: false
    })
 })