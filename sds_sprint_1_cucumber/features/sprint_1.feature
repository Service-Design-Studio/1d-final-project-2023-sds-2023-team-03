Feature: Fetching sales data for a specific product category relative to PUMA’s own data.

  Scenario: Fetching data with default category and time period (Happy)
    Given that I have the default category and time period selected on the "Sales" page ("Running" and "Last 30 days")
    When I press the "Fetch data" button
    Then the "Fetch data" button should grey out
    And I should see a loading message where the sales insights should be
    Then I should see the dashboard pertaining to the "Running" category and the "Last 30 days" time range

  Scenario: Fetching data without a valid time period (Sad)
    Given that I have switched out the time period presets for the "time period" text box on the "Sales" page, but have not entered a valid time period
    When I press the "Fetch data" button
    Then an error message should appear on the screen instructing the user to select a valid time period

  Scenario: Fetching data with a future time period (Sad)
    Given that I have the default category ("Running") selected on the "Sales" page, and a time period in the future
    When I press the "Fetch data" button
    Then an error message should appear on the screen instructing the user to select a valid time period

  Scenario: Fetching data while previous request is still loading (Sad)
    Given that I have pressed the "Fetch data" button with a valid category and time period on the "Sales" page, and the results have not yet returned
    When I press the "Fetch data" button again
    Then I should still see the loading message, and nothing else should happen

  Scenario: Switching to custom time period (Happy)
    Given that I am in the "Sales" page with the default category and time period preset ("Running" and "Last 30 days") selected
    When I press the "Calendar" button beside the time period preset
    Then the time period presets should now switch to a text box labeled "time period"

  Scenario: Viewing calendar popout for custom time period (Happy)
    Given that I have switched out the time period presets for the "time period" text box
    When I click the "text box"
    Then a calendar popout should be visible
