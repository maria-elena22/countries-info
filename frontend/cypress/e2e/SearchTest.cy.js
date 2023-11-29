describe("Cypress tests for Search Page", () => {
  beforeEach(() => {
    cy.visit(Cypress.config().baseUrl);
  });

  it("renders the app title", () => {
    cy.get('[data-testid="cy-app-title"]')
      .should("exist")
      .should("have.text", "Country Info Lookup");
  });

  it("renders the form", () => {
    cy.get('[data-testid="cy-search-form"]').should("exist");
    cy.get('[data-testid="cy-search-input"]').should("exist");
    cy.get('[data-testid="cy-search-button"]').should("exist");
  });

  it("goes to results", () => {
    cy.get('[data-testid="cy-search-input"]').type("Portugal");

    cy.get('[data-testid="cy-search-button"]').click();

    cy.url().should("include", "/results?country=Portugal");
  });

  it("renders the error", () => {
    cy.get('[data-testid="cy-search-input"]').type("ABCDEFG");

    cy.get('[data-testid="cy-search-button"]').click();

    cy.url().should("include", "/results?country=ABCDEFG");

    cy.get('[data-testid="cy-error-text"]')
      .should("exist")
      .should("have.text", "Country not found");

    cy.get('[data-testid="cy-error-search"]').should("exist");
  });
});
