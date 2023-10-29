export class LoginPage {
  navigate(baseURL) {
    cy.visit(baseURL);
    cy.wait(200);
    cy.url().should("eq", baseURL);
  }

  signPage() {
    cy.get("#customer_menu_top > li > a").click();
    cy.url().should("include", "account/login");
    cy.get(".maintext").should("have.text", " Account Login");
  }

  inputuser(username) {
    cy.get("#loginFrm_loginname")
      .should("be.visible")
      .type(username)
      .should("have.value", username);
  }

  inputpassword(password) {
    cy.get("[name='password']")
      .should("be.visible")
      .type(password)
      .should("have.value", password);
  }

  btnSign() {
    cy.get("#loginFrm > fieldset > .btn").should("be.visible").click();
  }

  verifAccountSuccess() {
    cy.get(".maintext").should("be.visible").should("have.text", " My Account");
    cy.url().should("include", "account/account");
  }

  verifAccountFailed() {
    cy.url().should("include", "account/login");
    cy.get(".alert")
      .should("be.visible")
      .should("have.text", "\n×\nError: Incorrect login or password provided.");
    cy.contains("Error: Incorrect login or password provided.")
      .should("be.visible")
      .should("have.text", "\n×\nError: Incorrect login or password provided.");
  }
}
