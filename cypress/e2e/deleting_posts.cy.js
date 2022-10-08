describe('When logged in', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Jaska Jaskanen',
      username: 'jaska',
      password: '12345',
    }
    const user2 = {
      name: 'Keijo Keijonen',
      username: 'keijo',
      password: '12345',
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.request('POST', 'http://localhost:3003/api/users/', user2)
    cy.visit('http://localhost:3000')

    cy.get('input[name="Username"]').type('jaska')
    cy.get('input[name="Password"]').type('12345')
    cy.get('button[type="submit"]').click()
    cy.contains('Jaska Jaskanen is logged in')

    cy.contains('Add Blog').click()
    cy.get('input[name="Title"]').type('Testiblogin otsikko')
    cy.get('input[name="Author"]').type('Kokeilu Kirjoittaja')
    cy.get('input[name="Url"]').type('testi-url-osoite')
    cy.contains('add blog').click()
  })

  it('A blog can be deleted', function () {
    cy.contains('Show').click()
    cy.contains('Delete').click()
    cy.on('window:confirm', () => true)
    cy.contains('Testiblogin otsikko').should('not.exist')
  })
  it('A blog cannot be deleted if wrong user', function () {
    cy.contains('logout').click()
    cy.contains('Show').click()
    cy.contains('Delete').click()
    cy.on('window:confirm', () => true)
    cy.contains('Testiblogin otsikko').should('not.exist')
  })
})
