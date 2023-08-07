describe('Issue comments creating, editing and deleting', () => {
    beforeEach(() => {
      cy.visit('/');
      cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
        cy.visit(url + '/board?modal-issue-create=true');
      });
    });
  
  });
  
  const IssueCreate = '[data-testid="modal:issue-create"]'
    // Test 1
    it('Test - Should create an issue and validate it successfully', () => {
      cy.get(IssueCreate).within(() => {
        cy.get('[data-testid="form-field:type"]').click();
        cy.get('[data-testid="select-option:Story"]')
            .trigger('click');
  
        cy.get('input[name="title"]').type('Time Tracking Test Version');
        
        //Select Pickle Rick from reporter dropdown
        cy.get('[data-testid="select:userIds"]').click();
        cy.get('[data-testid="select-option:Baby Yoda"]').click();
  
        //Click on button "Create issue"
        cy.get('button[type="submit"]').click();
    })

    const getIssueDetailsModal = () => cy.get('[data-testid="modal:issue-details"]');
    const Number = 'input[placeholder="Number"]'
    const Close = '[data-testid="icon:close"]'
    const IssueCreate = '[data-testid="modal:issue-create"]'


    it('Should add time estimation, edit and delete', () => {

        //Add estimation
        cy.get(getIssueDetailsModal).should('contain', 'No time logged');
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
        cy.get(getIssueDetailsModal).click();
        cy.get(Close).click();
        cy.get(getIssueDetailsModal).should('contain', 'Number');
    })

})