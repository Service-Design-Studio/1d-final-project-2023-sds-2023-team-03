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

  Scenario: Search timeout (Sad)
    Given I have submitted a search
    When there is no response from the server
    Then I should receive a search timeout message modal

  Scenario: Switching graph segments
    Given I have submitted a search
    And the segment control is not currently on "<graphsegment>"
    When I click on the "<graphsegment>" graph segment
    Then the current graph should be replaced by the "<graphsegment>" graph
    Examples:
    | graphsegment |
    | Product Units |
    | Product Revenue |
    | Apparel Units |
    | Apparel Revenue |

  Scenario: Switching graphs - self (Sad)
    Given I have submitted a search
    And I click on the "Product Units" graph segment
    When I click on the "Product Units" graph segment
    Then the "Product Units" graph segment should still be visible
