import { When, Then, Given } from "@badeball/cypress-cucumber-preprocessor";
import { LoginPage } from "@pageObjects/LoginPage";

const login = new LoginPage();

Given("User on home page", () => {
  cy.fixture("automationteststore").then((data) => {
    login.navigate(data.baseURL);
  });
});

When("User click account page", () => {
  login.signPage();
});

When(
  "User type input username {string}, set password {string}",
  (username, password) => {
    login.inputuser(username);
    login.inputpassword(password);
  }
);

When("User clicks on the login button", () => {
  login.btnSign();
});

When("I input wrong email, the password", () => {
  cy.fixture("automationteststore").then((data) => {
    login.inputuser(data.username);
    login.inputpassword(data.password);
    login.btnSign();
  });
});

When("User provides Incorrect credentials", (table) => {
  table.hashes().forEach((row) => {
    cy.log(row.username);
    cy.log(row.password);
    login.inputuser(row.username);
    login.inputpassword(row.password);
  });
});

Then("User should be redirected to the board detail", () => {
  cy.url().then((ody) => {
    if (ody.includes("account/account")) {
      login.verifAccountSuccess();
    } else if (ody.includes("account/login")) {
      login.verifAccountFailed();
    }
  });
});
