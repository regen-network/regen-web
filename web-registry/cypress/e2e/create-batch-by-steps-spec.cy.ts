describe('Create Batch by steps flow', () => {
  // TODO - mock up auth / wallet
  // Right now you have to disable the Auth check on the create batch page.
  it('Happy path, allows a issuer to enter credit and recipients details and issue a credit batch', () => {
    cy.viewport(1400, 1000);
    cy.visit('/ecocredits/create-batch');
    cy.contains(/reject/i).click(); // cookies

    // step 1
    cy.contains(/create credit batch/i).should('be.visible');
    cy.contains(/next/i).should('be.disabled');

    cy.get('select[name="classId"]').select('C01');
    cy.get('select[name="metadata[\'regen:vcsProjectId\']"]').select('612');
    cy.get('input[name="startDate"]').type('05/13/2018');
    cy.get('input[name="endDate"]').type('06/15/2023');
    cy.get('input[name="metadata[\'regen:vcsRetirementSerialNumber\']"]').type(
      '10695-239407151-239407157-VCS-VCU-466-VER-PG-14-2293-01062017-31122019-0',
    );

    cy.contains(/next/i).should('be.enabled');
    cy.contains(/next/i).click();

    // step 2
    cy.contains(/recipients/i).should('be.visible');
    cy.contains(/next/i).should('be.disabled');

    cy.get('input[name="recipients.0.recipient"]').type(
      'regen1df675r9vnf7pdedn4sf26svdsem3ugavgxmy46',
    );
    cy.get('input[name="recipients.0.tradableAmount"]').type('1500');

    cy.contains(/next/i).should('be.enabled');
    cy.contains(/next/i).click();

    // step 3
    cy.contains(/review/i).should('be.visible');
    // all inserted before (and calculated after) should be visible
    cy.contains(/next/i).should('be.enabled');
    cy.contains(/next/i).click();

    // step 4
    cy.contains(/credits have been issued/i).should('be.visible');
  });
});
