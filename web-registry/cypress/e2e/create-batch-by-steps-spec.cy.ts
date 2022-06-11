describe('Create Batch by steps flow', () => {
  // TODO - mock up auth / wallet
  // Right now you have to disable the Auth check on the create batch page.

  before(() => {
    cy.fixture('credit-batch-form.json').then(data => {
      this.formValues = data;
    });
  });

  it('Happy path, allows a issuer to enter credit and recipients details and issue a credit batch', () => {
    const values = this.formValues;

    cy.viewport(1200, 2500);
    cy.visit('/ecocredits/create-batch');

    cy.findByText(/reject/i).click(); // TODO - button
    // cy.findByRole('button', { name: /reject/i }).click();
    // cy.contains(/reject/i).click(); // cookies

    // step 1
    cy.findByText(/create credit batch/i).should('be.visible'); // TODO - role heading
    // cy.findByRole('heading', { name: /create credit batch/i }).should('be.visible');
    // cy.contains(/create credit batch/i).should('be.visible');

    cy.findByRole('button', { name: /save/i }).should('be.disabled');
    // cy.contains(/next/i).should('be.disabled');

    cy.findByRole('combobox', { name: /credit class/i }).select(values.classId);
    // cy.findByLabelText(/credit class/i).select(values.classId);
    // cy.get('select[name="classId"]').select('C01');

    cy.findByRole('combobox', { name: /project/i }).select(values.projectId);
    // cy.findByLabelText(/project/i).select(values.projectId);
    // cy.get('select[name="metadata[\'regen:vcsProjectId\']"]').select('612');

    cy.get('input[name="startDate"]').type(values.startDate); // TODO
    // cy.findByLabelText(/start date/i).type('05/13/2018'); //  * Make sure you're using the "for" attribute or "aria-labelledby" attribute correctly.
    cy.get('input[name="endDate"]').type(values.endDate);

    cy.findByLabelText(/VCS retirement serial number/i).type(
      values["metadata['regen:vcsRetirementSerialNumber']"],
    );
    // cy.get('input[name="metadata[\'regen:vcsRetirementSerialNumber\']"]').type(
    //   '10695-239407151-239407157-VCS-VCU-466-VER-PG-14-2293-01062017-31122019-0',
    // );

    cy.findByRole('button', { name: /save/i }).should('be.enabled');
    // cy.contains(/next/i).should('be.enabled');
    // cy.contains(/next/i).click();
    cy.findByRole('button', { name: /save/i }).click();

    // step 2
    cy.findByText(/recipients/i).should('be.visible'); // TODO - role heading
    // cy.contains(/recipients/i).should('be.visible');
    cy.findByRole('button', { name: /save/i }).should('be.disabled');
    // cy.contains(/next/i).should('be.disabled');

    cy.findByLabelText(/recipient address/i).type(values.recipientAddress);
    // cy.get('input[name="recipients.0.recipient"]').type(
    //   'regen1df675r9vnf7pdedn4sf26svdsem3ugavgxmy46',
    // );

    cy.findByLabelText(/amount tradable/i).type(values.tradableAmount);
    // cy.get('input[name="recipients.0.tradableAmount"]').type('1500');

    cy.findByRole('button', { name: /save/i }).should('be.enabled');

    cy.findByRole('checkbox', {
      name: /send additional retired credits/i,
    }).click();

    cy.findByRole('button', { name: /save/i }).should('be.disabled');

    cy.findByLabelText(/amount retired/i).type(values.retiredAmount);

    cy.findByRole('button', { name: /save/i }).should('be.enabled');
    // cy.contains(/next/i).should('be.enabled');
    cy.findByRole('button', { name: /save/i }).click();
    // cy.contains(/next/i).click();

    // step 3
    // TODO - Found multiple elements with the text: /review/i
    // cy.findByText(/review/i).should('be.visible'); // TODO - role heading
    cy.contains(/review/i).should('be.visible'); // but two elements....

    // TODO - complete queries & assertions
    // all inserted before (and calculated after) should be visible
    // .
    // .
    // .

    cy.contains(/next/i).should('be.enabled');
    cy.contains(/next/i).click();

    // step 4
    cy.findByText(/credits have been issued/i).should('be.visible'); // TODO - role heading
    // cy.contains(/credits have been issued/i).should('be.visible');
  });
});
