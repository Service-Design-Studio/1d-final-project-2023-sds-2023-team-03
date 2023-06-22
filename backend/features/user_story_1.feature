Feature: Fetching sales data for a specific product category relative to PUMA’s own data.

  Scenario: Fetching sales data (Happy)
    Given I have the default category and time period selected on the sales page ("Running" and "Last 30 days")
    When I press the "Search" button
    Then the "Search" button should grey out
    Then I should see the queried data reflected on the bar graph in the sales page
    And the header on top of the table should reflect the query parameters

  Scenario: Fetching sales data with no input on time period text box (Sad)
    Given I have switched out the time period presets for the "time period" text box on the sales page, but have not entered a valid time period
    When I press the "Search" button
    Then an error message should appear on the screen instructing the user to select a valid time period

  Scenario: Clicking the "Search" button again while data is being fetched (Sad)
    Given I have pressed the "Search" button with a valid category and time period on the sales page, and the "search" button is still grey
    When I press the "Search" button again
    Then I should still see the loading message, and nothing else should happen

  Scenario: Search timeout (Sad)
    Given I have pressed "Search" with valid inputs
    When 10 seconds pass without a response from the server
    Then the search should terminate
    And the search button should become clickable again
    And I should receive a search timeout message modal
