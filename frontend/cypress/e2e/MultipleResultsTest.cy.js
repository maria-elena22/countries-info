const countries = require("../fixtures/countries.json");

countries.forEach((country) => {
  describe(country + " Cypress tests for Results Page ", () => {
    beforeEach(() => {
      cy.visit(Cypress.config().baseUrl + "/results?country=" + country);
    });

    it("renders the Country List", () => {
      cy.get('[data-testid="cy-countryLine-name"]')
        .should("exist")
        .should("contain", country);
    });

    it("renders the New Search Button", () => {
      cy.get('[data-testid="cy-result-search"]')
        .should("exist")
        .should("have.text", "New Search");
    });

    it("renders the Country Name", () => {
      cy.get('[data-testid="cy-info-name"]')
        .should("exist")
        .should("not.be.empty");
    });

    it("renders the Country Names Table if available", () => {
      cy.get(".leftColumn").then(($ele) => {
        if ($ele.find('[data-testid="cy-left-namesTable"]').length > 0) {
          cy.log("Element is Present");
          cy.get(".namesTable tbody tr").each(($row) => {
            cy.wrap($row).within(() => {
              cy.get("td").eq(0).should("exist").should("not.be.empty");
              cy.get("td").eq(1).should("exist").should("not.be.empty");
              cy.get("td").eq(2).should("exist").should("not.be.empty");
            });
          });
        } else {
          cy.log("Element is not Present");
        }
      });
    });

    it("renders the Country Info Cards if available", () => {
      cy.get(".leftColumn").then(($ele) => {
        if ($ele.find('[data-testid="cy-left-infoCards"] .card-c').length > 0) {
          cy.get('[data-testid="cy-left-infoCards"] .card-c').each(($card) => {
            cy.wrap($card).within(() => {
              cy.get(".card-header h6").should("exist").should("not.be.empty");
              cy.get(".card-body .card-text")
                .should("exist")
                .should("not.be.empty");
            });
          });
        } else {
          cy.log("Element is not Present");
        }
      });
    });

    it("renders the Country Symbols if available", () => {
      cy.get('[data-testid="cy-right-symbols"]').then(($ele) => {
        if ($ele.find('[data-testid="cy-right-flag"]').length > 0) {
          cy.get("[data-testid='cy-right-flag']")
            .should("exist")
            .should("have.attr", "src")
            .should("not.be.empty");
        } else {
          cy.log("Flag is not Present");
        }

        if ($ele.find('[data-testid="cy-right-coatOfArms"]').length > 0) {
          cy.get("[data-testid='cy-right-coatOfArms']")
            .should("exist")
            .should("have.attr", "src")
            .should("not.be.empty");
        } else {
          cy.log("Coat of Arms is not Present");
        }
      });
    });

    it("renders the Map", () => {
      cy.get('[data-testid="cy-right-map"]')
        .should("exist")
        .should("be.visible");
    });

    it("renders Right Sections", () => {
      cy.get(".infoTable")
        .should("exist")
        .within(() => {
          cy.get("tr").should("have.length.gt", 0);

          cy.get("th, td").each(($cell) => {
            cy.wrap($cell).should("exist").should("not.be.empty");
          });
        });
    });
  });
});
