describe('Create Batch by steps flow', () => {
  // TODO - mock up auth / wallet
  // Right now you have to disable the Auth check on the create batch page.

  before(() => {
    cy.fixture('create-batch.json').then(data => {
      this.formData = data;
    });
  });

  // Happy path
  it('allows a issuer to enter credit batch details and recipients details and issue a credit batch', () => {
    const { formValues } = this.formData;

    cy.visit('/ecocredits/create-batch');

    // TODO - button
    cy.findByText(/reject/i).click(); // cookies
    // cy.findByRole('button', { name: /reject/i }).click();

    /**
     * Step 1
     */
    cy.findByText(/create credit batch/i).should('be.visible'); // TODO - role heading
    // cy.findByRole('heading', { name: /create credit batch/i }).should('be.visible');

    cy.findByRole('button', { name: /save/i }).should('be.disabled');

    cy.findByRole('combobox', { name: /credit class/i }).select(
      formValues.classId,
    );

    // 'select[name="metadata[\'regen:vcsProjectId\']"]'
    cy.findByRole('combobox', { name: /project/i }).select(
      formValues.metadata['regen:vcsProjectId'],
    );

    const dateFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    };

    // TODO - First place, role?.. second option, by label text:
    // Make sure you're using the "for" attribute or "aria-labelledby" attribute correctly.
    cy.get('input[name="startDate"]').type(
      // format(formValues.startDate, 'MM/dd/yyyy'),
      new Date(formValues.startDate).toLocaleDateString(
        'en-US',
        dateFormatOptions,
      ),
    );

    // cy.findByLabelText(/start date/i).type(values.startDate);
    cy.get('input[name="endDate"]').type(
      // formValues.endDate
      new Date(formValues.endDate).toLocaleDateString(
        'en-US',
        dateFormatOptions,
      ),
    );
    // cy.findByLabelText(/end date/i).type(values.endDate);

    cy.findByLabelText(/VCS retirement serial number/i).type(
      formValues.metadata['regen:vcsRetirementSerialNumber'],
    );

    cy.findByRole('button', { name: /save/i }).click();

    /**
     * Step 2
     */
    cy.findByText(/recipients/i).should('be.visible'); // TODO - role heading
    cy.findByRole('button', { name: /save/i }).should('be.disabled');

    cy.findByLabelText(/recipient address/i).type(
      formValues.recipients[0].recipient,
    );
    // cy.get('input[name="recipients.0.recipient"]').type(
    //   'regen1df675r9vnf7pdedn4sf26svdsem3ugavgxmy46',
    // );

    cy.findByLabelText(/amount tradable/i).type(
      formValues.recipients[0].tradableAmount,
    );

    cy.findByRole('button', { name: /save/i }).should('be.enabled');

    cy.findByRole('checkbox', {
      name: /send additional retired credits/i,
    }).click();

    cy.findByRole('button', { name: /save/i }).should('be.disabled');

    cy.findByLabelText(/amount retired/i).type(
      formValues.recipients[0].retiredAmount,
    );

    cy.findByRole('button', { name: /save/i }).click();

    /**
     * Step 3
     */

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

    /**
     * Step 4
     */
    cy.findByText(/credits have been issued/i).should('be.visible'); // TODO - role heading
    // cy.contains(/credits have been issued/i).should('be.visible');
  });

  it('retreives valid persisted data in local storage and goes directly to review step', () => {
    const values = this.formData;
    localStorage.setItem('create-batch-form', JSON.stringify(values));

    cy.visit('/ecocredits/create-batch');
    // TODO - button
    cy.findByText(/reject/i).click(); // cookies

    cy.contains(/review/i).should('be.visible'); // but two elements....

    cy.contains(/next/i).should('be.enabled');
  });

  // TODO - navigate / edit previous steps
});
