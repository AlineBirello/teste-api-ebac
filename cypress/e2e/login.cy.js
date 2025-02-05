/// <reference types="cypress" />

describe('Login', () => {

  it('Deve fazer login com sucesso', () => {
      cy.request({
          method: 'POST',
          url: 'login',
          body: {
              "email": "birello@ebac740954.com",
              "password": "teste123" 
          }
      }).then((response) => {
          expect(response.status).to.equal(200)
          expect(response.body.message).to.equal('Login realizado com sucesso')
          cy.log(response.body.authorization)
      })
  });

});