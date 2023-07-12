Feature: Fetching sales data for a specific product category relative to PUMA’s own data.

  Scenario: Visiting the Sales page
    When I visit the "sales" page
    Then I should see the "Sales Analytics" header

  Scenario: Fetching sales data (Happy)
    Given I am in preset selection mode
    When I select "Last 12 months"
    Then the search section should blur
    And I should see the queried data reflect on the graph under the search section
    And the header on top of the table should reflect the query parameters

  # Scenario: Fetching sales data with no input on time period text box (Sad)
  #  Given I have switched out the time period presets for the "time period" text box on the sales page, but have not entered a valid time period
  #  When I press the "Search" button
  #  Then an error message should appear on the screen instructing the user to select a valid time period

  # Scenario: Clicking the "Search" button again while data is being fetched (Sad)
  #  Given I have pressed the "Search" button with a valid category and time period on the sales page, and the "search" button is still grey
  #  When I press the "Search" button again
  #  Then I should still see the loading message, and nothing else should happen

  Scenario: Search timeout (Sad)
    Given I have submitted a search
    When 10 seconds pass without a response from the server
    Then I should receive a search timeout message modal

  Scenario: Switching graph - Product Units (Happy)
    Given I have submitted a search
    And the segment control is not currently on "Product Units"
    When I click on the "Product Units" graph segment
    Then the current graph should be replaced by the "Product Units" graph

  Scenario: Switching graph - Product Revenue (Happy)
    Given I have submitted a search
    And the segment control is not currently on "Product Revenue"
    When I click on the "Product Revenue" graph segment
    Then the current graph should be replaced by the "Product Revenue" graph

  Scenario: Switching graph - Apparel Units (Happy)
    Given I have submitted a search
    And the segment control is not currently on "Apparel Units"
    When I click on the "Apparel Units" graph segment
    Then the current graph should be replaced by the "Apparel Units" graph

  Scenario: Switching graph - Apparel Revenue (Happy)
    Given I have submitted a search
    And the segment control is not currently on "Apparel Revenue"
    When I click on the "Apparel Revenue" graph segment
    Then the current graph should be replaced by the "Apparel Revenue" graph

  Scenario: Switching graphs - self (Sad)
    Given I have submitted a search
    And I click on the "Product Units" graph segment
    When I click on the "Product Units" graph segment
    Then the "Product Units" graph segment should still be visible