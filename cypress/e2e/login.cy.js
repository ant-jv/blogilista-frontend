describe('Login', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Jaska Jaskanen',
      username: 'jaska',
      password: '12345',
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('succeeds with correct credentials', function () {
    cy.get('input[name="Username"]').type('jaska')
    cy.get('input[name="Password"]').type('12345')
    cy.get('button[type="submit"]').click()
    cy.contains('Jaska Jaskanen is logged in')
  })

  it('fails with wrong credentials', function () {
    cy.get('input[name="Username"]').type('jaska')
    cy.get('input[name="Password"]').type('123456')
    cy.get('button[type="submit"]').click()
    cy.get('.notification').contains('error logging in')
  })
})
