Feature: Fetching sales data for a specific product category relative to PUMA’s own data.

  Scenario: Fetching data with default category and time period (Happy)
    Given I have the default category and time period selected ("Running" and "Last 30 days")
    When I press the "Fetch data" button
    Then the "Fetch data" button should grey out
    And I should see a loading message where the sales insights should be
    And I should see the dashboard pertaining to the "Running" category and the "Last 30 days" time range

  Scenario: Fetching data without a valid time period (Sad)
    Given I have switched out the time period presets for the "time period" text box, but have not entered a valid time period
    When I press the "Fetch data" button
    Then an error message should appear on the screen instructing the user to enter a valid time period in the "time period" text box

  Scenario: Fetching data with a future time period (Sad)
    Given I have the default category ("Running") selected, and a time period in the future
    When I press the "Fetch data" button
    Then an error message should appear on the screen instructing the user to select a valid time period

  Scenario: Fetching data while previous request is still loading (Sad)
    Given I have pressed the "Fetch data" button with a valid category and time period, and the results have not yet returned
    When I press the "Fetch data" button again
    Then I should still see the loading message, and nothing else should happen

  Scenario: Switching to custom time period (Happy)
    Given I am in the "Sales" page with the default category and time period preset ("Running" and "Last 30 days") selected
    When I press the "Calendar" button beside the time period preset
    Then the time period presets should be replaced with a text box labeled "time period"

  Scenario: Viewing calendar popout for custom time period (Happy)
    Given I have switched out the time period presets for the "time period" text box
    When I click on the "time period" text box
    Then a calendar popout should be visible
