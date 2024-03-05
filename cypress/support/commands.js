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


 Cypress.Commands.add('cadastroUsuario', (nome, email, senha, admin) => {
  cy.request({
      method: 'POST',
      url: '/usuarios',
      body: {
          nome: nome,
          email: email,
          password: senha,
          administrador: admin
      }   
    });
});