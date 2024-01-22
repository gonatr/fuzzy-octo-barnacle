Feature: Regression

  Background: Frontpage
    Given User on home page
    When User click account page

  @Login1 @Positive
  Scenario: visiting ATS the frontpage and successfully login
    When User type input username "test_user_wsb", set password "test_pass_wsb"
    And User clicks on the login button
    Then User should be redirected to the board detail

  @Login2 @Negative
  Scenario: visiting ATS the frontpage and unsuccessfully login
    When I input wrong email, the password
    And User clicks on the login button
    Then User should be redirected to the board detail

  @Login3 @Negative @TestRun
  Scenario Outline: Incorrect password
    When User provides Incorrect credentials
      | username  | password |
      | 123456789 |    12345 |
    And User clicks on the login button
    Then User should be redirected to the board detail
