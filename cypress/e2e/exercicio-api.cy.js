/// <reference types="cypress" />
import contrato from '../contrato/usuarios.contrato'

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
      cy.request({
      method: 'POST',
      url: 'usuarios',
      body: {
          "nome": "Exercicio EBAC7",
          "email": "EBAC7@qa.com.br",
          "password": "teste",
          "administrador": "true"
        }
  }).then((response) => {
      expect(response.status).to.equal(201)
      expect(response.body.message).to.equal('Cadastro realizado com sucesso')
    
  })
});

  it('Deve validar um usuário com email inválido', () => {
    cy.request({
      method: 'GET',
      url: 'usuarios/${id}',
      body: {
          "nome": "Exercicio EBAC2",
          "email": "beltrano",
          "password": "teste",
          "administrador": "true"
        },
        failOnStatusCode: false
  }).then((response) => {
      expect(response.status).to.equal(400)
      expect(response.body.message).to.equal('Usuário não encontrado')
  })
  });

  it('Deve editar um usuário previamente cadastrado', () => {
    cy.request({
      method: 'PUT',
      url: 'usuarios' + '/0uxuPY0cbmQhpEz1',
      body: {
      "nome": "Fulano da Silva v1",
      "email": "beltrano@qa.com.br",
      "password": "teste",
      "administrador": "true",
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
      let id = response.body.usuarios[1]._id
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
