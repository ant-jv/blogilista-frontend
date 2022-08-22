describe('When logged in', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
            const user = {
                name: 'Jaska Jaskanen',
                username: 'jaska',
                password: '12345'
            }
        cy.request('POST', 'http://localhost:3003/api/users/', user)
        cy.visit('http://localhost:3000')

        cy.get('input[name="Username"]').type('jaska')
        cy.get('input[name="Password"]').type('12345')
        cy.get('button[type="submit"]').click()
        cy.contains('Jaska Jaskanen is logged in')

        cy.contains('Add Blog').click()
        cy.get('input[name="Title"]').type('Testiblogi 2 tykkäystä')
        cy.get('input[name="Author"]').type('Kokeilu Kirjoittaja')
        cy.get('input[name="Url"]').type('testi-url-osoite')
        cy.contains('add blog').click()

        cy.contains('Add Blog').click()
        cy.get('input[name="Title"]').type('Testiblogi 3 tykkäystä')
        cy.get('input[name="Author"]').type('Kokeilu Kirjoittaja 2')
        cy.get('input[name="Url"]').type('testi-url-osoite-2')
        cy.contains('add blog').click()
    })

    it('The blogs are sorted by likes', function() {
        cy.get('.blog-element > div > .show-button').eq(0).click()
        cy.get('.blog-element > div > .show-button').eq(1).click()

        cy.intercept('PUT', '/api/blogs/*', {}).as('like')
        cy.get('.additional-info > .like-button').eq(0).click()
        cy.wait('@like')
        cy.get('.additional-info > .like-button').eq(0).click()
        cy.wait('@like')
        cy.get('.additional-info > .like-button').eq(1).click()
        cy.wait('@like')
        cy.get('.additional-info > .like-button').eq(1).click()
        cy.wait('@like')
        cy.get('.additional-info > .like-button').eq(1).click()
        cy.wait('@like')

        cy.get('.blog-element > .blog-short-info').eq(0).contains('Testiblogi 3 tykkäystä')
        cy.get('.blog-element > .blog-short-info').eq(1).contains('Testiblogi 2 tykkäystä')
    })
})