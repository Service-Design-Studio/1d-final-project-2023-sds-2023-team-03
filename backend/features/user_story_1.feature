Feature: Fetching sales data for a specific product category relative to PUMA’s own data.

  Scenario: Fetching sales data with default category and time period (Happy)
    Given that I have the default category and time period selected on the sales page ("Running" and "Last 30 days)
    When I press the "Fetch data" button
    Then the "Fetch data" button should grey out
    And I should see a loading message in where the sales data should be displayed
    And I should see the dashboard pertaining to the "Running" category and the "Last 30 days" time range

  Scenario: Fetching sales data with no input on time period text box (Sad)
    Given that I have switched out the time period presets for the "time period" text box on the sales page, but have not entered a valid time period
    When I press the "Fetch data" button
    Then an error message should appear on the screen instructing the user to select a valid time period

  Scenario: Clicking the "fetch data" button again while data is being fetched (Sad)
    Given that I have pressed the "Fetch data" button with a valid category and time period on the sales page, and the results have not yet returned (the "Fetch data" button is still grey and the loading message is still visible)
    When I press the "fetch data" button again
    Then I should still see the loading message, and nothing else should happen
