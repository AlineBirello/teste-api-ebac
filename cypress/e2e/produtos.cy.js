/// <reference types="cypress" />

describe('Testes da Funcionalidade produtos', () => {
    let token
    before(() => {
        cy.token('beltrano@qa.com.br', 'teste').then(tkn => { token = tkn })
    });

    it('Deve listar os usuarios cadastrados - GET', () => {
        cy.request({
            method: 'GET',
            url: 'usuarios'
        }).then((response) => {
            //expect(response.body.produtos[9].nome).to.equal('Produto EBAC 436746')
            expect(response.status).to.equal(200)
            expect(response.body).to.have.property('usuarios')
            expect(response.duration).to.be.lessThan(20)
        })
    })

    it('Deve cadastrar usuario com sucesso - POST', () => {
        cy.request({
            method: 'POST',
            url: 'usuarios',
            body: {
                "nome": "Exercicio EBAC1",
                "email": "EBAC1@qa.com.br",
                "password": "teste",
                "administrador": "true"
              }
        }).then((response) => {
            expect(response.status).to.equal(201)
            expect(response.body.message).to.equal('Cadastro realizado com sucesso')
        })
    });

    it('Deve validar mensagem de erro ao cadastrar usuario repetido - POST', () => {
        let usuarios = 'Produto EBAC' + Math.floor(Math.random() * 1000000000) 
        cy.cadastrarUsuarios(token, "nome","email", "password")
            .then((response) => {
                expect(response.status).to.equal(400)
                expect(response.body.message).to.equal('Este email já está sendo usado')
            })
    });

    it.only('Deve editar um usuario já cadastrado - PUT', () => {
        cy.request('usuarios').then(response => {
            let id = response.body.usuarios[0]._id
            cy.request({
                method: 'PUT', 
                url: 'usuarios',
                body: 
                {
                    "nome": "Fulano da Silva",
                    "email": "jose@q.br",
                    "password": "132",
                    "administrador": "true",
                    "_id": "76zkFCwiP7iKZgo4"
                  }
            }).then(response => {
                expect(response.body.message).to.equal('Registro alterado com sucesso')
            })
        })
    });
});