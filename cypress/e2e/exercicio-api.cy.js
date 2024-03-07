/// <reference types="cypress" />
import contrato from '../contrato/usuarios.contrato'

let token

describe('Testes da Funcionalidade Usuários', () => {

  it('Deve validar contrato de usuários com sucesso', () => {
    cy.request ('usuarios').then(response => {
      return contrato.validateAsync(response.body)
    })
  });

  it('Deve listar usuários cadastrados', () => {
    cy.request ({
      method: 'GET',
      url: 'usuarios'
    }).should((response) => {
      expect(response.status).to.equal(200)
      expect(response.body).to.have.property('usuarios')
    })
  });

  it('Deve cadastrar um usuário com sucesso', () => {
    let email = `birello@ebac${Math.floor(Math.random() * 1000000)}.com`
      cy.request({
          method: 'POST',
          url: 'usuarios',
          body: {
              nome: 'Birello',
              email: email,
              password: 'teste123',
              administrador: 'true'
            },          
            headers: {authorization: token}
          }).then((response) => {
      expect(response.status).to.equal(201)
      expect(response.body.message).to.equal('Cadastro realizado com sucesso')
              })
  });

  it('Deve validar um usuário com email inválido', () => {
    cy.request({
      method: 'GET',
      url: 'usuarios/${id}',
        failOnStatusCode: false
  }).then((response) => {
      expect(response.status).to.equal(400)
      expect(response.body.message).to.equal('Usuário não encontrado')
  })
  });

  it.only('Deve editar um usuário previamente cadastrado', () => {   
      cy.request({
      method: 'PUT',
      url: 'usuarios',
      body: {
      "nome": 'birello',
      "email": 'email',
      "password": 'teste123',
      "administrador": 'true',
    }
  }).then((response) => {
      expect(response.status).to.equal(200)
      expect(response.body.message).to.equal('Registro alterado com sucesso')
  }) 
  });

  it('Deve deletar um usuário previamente cadastrado', () => {
    cy.request({
      url: '/usuarios',
      method: 'GET'
  }).then((response) => {
      cy.request({
          url: 'usuarios/' + id,
          method: 'DELETE'
      }).should((response) => {
          expect(response.status).to.eq(200)
          expect(response.body.message).to.eql("Registro excluído com sucesso")
    });
    });
  });
});