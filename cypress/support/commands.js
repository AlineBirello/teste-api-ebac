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
