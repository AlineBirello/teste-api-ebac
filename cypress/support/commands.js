Cypress.Commands.add('cadastroUsuario', (usuarios, email, senha, admin) => {
cy.request({
    method: 'POST',
    url: '/usuarios',
    body: {
        nome: usuarios,
        email: email,
        password: senha,
        administrador: admin
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