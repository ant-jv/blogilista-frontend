describe('When logged in', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Jaska Jaskanen',
      username: 'jaska',
      password: '12345',
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
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

  it('A blog can be created', function () {
    cy.contains('Show').click()
    cy.contains('Like').click()
    cy.get('#blog-element>div')
      .eq(0)
      .contains('Testiblogin otsikko Kokeilu Kirjoittaja')
    cy.get('#blog-element>div').eq(1).contains('1')
  })
})
