describe('Issue comments creating, editing and deleting', () => {
    // Define the IssueCreate variable
    const IssueCreate = '[data-testid="modal:issue-create"]';

    beforeEach(() => {
        cy.visit('/');
        cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
            cy.visit(url + '/board?modal-issue-create=true');
        });
    });

    const issueTitle = "Time Tracking Test Version";
    const getIssueDetailModal = '[data-testid="modal:issue-details"]';
    const Number = 'input[placeholder="Number"]';
    const Close = '[data-testid="icon:close"]';
    const backLogList = '[data-testid="board-list:backlog"]';
    const stopWatch = '[data-testid="icon:stopwatch"]'

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


            // Add estimation
            
            cy.get(Number).click().type(10);
            cy.get(getIssueDetailModal).click();
            cy.get(Close).first().click();
            cy.contains('Time Tracking Test Version').click();
            cy.get(Number).should('have.value', '10');

            // Update estimation
            cy.get(Number).click().clear().type('20');
            cy.get(getIssueDetailModal).click();
            cy.get(Close).first().click();
            cy.contains('Time Tracking Test Version').click();
            cy.get(Number).should('have.value', '20');

            // Remove estimation
            cy.get(Number).click().clear();
            cy.get(getIssueDetailModal).click();
            cy.get(Close).first().click();
            cy.contains('Time Tracking Test Version').click();
            cy.get(getIssueDetailModal).should('contain', 'Number');

            //Logging time
            cy.get(stopWatch).click();
            cy.get('[data-testid="modal:tracking"]').should('be.visible');
            cy.get(Number).eq(1).click().type('value=2');
            cy.get(Number).eq(2).click().type('value=5');
            cy.get('[data-testid="modal:tracking"]').contains('button', 'Done').click();
            cy.contains('No time logged').should('not.exist');
            cy.get(stopWatch).next().should('contain', '2h logged')
            .should('not.contain', 'No time logged').and('contain', '5h remaining');

            //Delete logged time
            cy.get(stopWatch).click();
            cy.get('[data-testid="modal:tracking"]').should('be.visible');
            cy.get(Number).eq(1).click().clear();
            cy.get(Number).eq(2).click().clear();
            cy.get('[data-testid="modal:tracking"]').contains('button', 'Done').click();
            cy.get(stopWatch).next().should('contain', 'No time logged');
        });
    });
