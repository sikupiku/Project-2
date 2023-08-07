describe('Issue comments creating, editing and deleting', () => {
    // Define the IssueCreate variable
    const IssueCreate = '[data-testid="modal:issue-create"]';

    beforeEach(() => {
        cy.visit('/');
        cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
            cy.visit(url + '/board?modal-issue-create=true');



            it('Test - Should create an issue for time validation', () => {
                cy.get(IssueCreate).within(() => {
                    cy.get('[data-testid="form-field:type"]').click();
                    cy.get('[data-testid="select-option:Story"]').trigger('click');
                    cy.get('input[name="title"]').type('Time Tracking Test Version');
                    cy.get('[data-testid="select:userIds"]').click();
                    cy.get('[data-testid="select-option:Baby Yoda"]').click();
                    cy.get('button[type="submit"]').click();
                });

                // Assert that issue is successfully created and open it
                cy.contains('Issue has been successfully created.').should('be.visible');
                cy.get(backLogList).should('be.visible').contains(issueTitle).click();
            });
        });

        const issueTitle = "Time Tracking Test Version";
        const getIssueDetailModal = '[data-testid="modal:issue-details"]';
        const Number = 'input[placeholder="Number"]'
        const Close = '[data-testid="icon:close"]'
        const backLogList = '[data-testid="board-list:backlog"]';

        //Test 1
        it('Should add time estimation, edit and delete', () => {

            //Add estimation
            //cy.get('[data-testid="modal:issue-details"]')
            // .within(() => {
            //cy.get('[data-testid="modal:issue-details"]').should('contain', 'No time logged');
            cy.contains('Time Tracking Test Version').click()
            cy.get(Number).click().type(10);
            cy.get(Close).click();
            cy.contains('Time Tracking Test Version').click()
            cy.get(Number).should('contain', 10)

            //Update estimation
            cy.get(Number).click().clear().type(20);
            cy.get(Close).click();
            cy.contains('Time Tracking Test Version').click()
            cy.get(Number).should('contain', 20)

            //Remove estimation
            cy.get(Number).click().clear()
            cy.get(getIssueDetailModal).click();
            cy.get(Close).click();
            cy.get(getIssueDetailModal).should('contain', 'Number');
        })

    })
})




