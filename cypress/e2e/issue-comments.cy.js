describe('Issue comments creating, editing and deleting', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
            cy.visit(url + '/board');
            cy.contains('This is an issue of type: Task.').click();
        });
    });


    it.only('Should write a comment, edit it and delete', () => {
        const comment = 'New comment'
        const editedcomment = 'Edited comment'

        //Add new comment
        cy.contains('Add a comment...').type(comment);
        cy.contains('Save').click();
        cy.get('[data-testid="issue-comment').should('contain', comment);

        //Edit comment
        cy.get('[data-testid="issue-comment"]').first().contains('Edit').click();
        cy.contains(comment).clear().type(editedcomment);
        cy.contains('button', 'Save').click();
        cy.contains(editedcomment);

        //Delete comment
        cy.get('[data-testid="issue-comment"]').first().contains('Delete').click();
        cy.get('[data-testid="modal:confirm"]').contains('button', 'Delete comment').click();
        cy.contains(editedcomment).should('not.exist');
    })
})


























       