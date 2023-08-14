@merchtags
Feature: Merchandising Tagging System - Priority Display

  Scenario: Visiting the merchandising page
    When I visit the merchandising page first
    Then I should see the merchandising table
    And I should see each row populated by row data

  Scenario: Prioritising a tag
    When I filter for the "<tag>" tag using the tag filter bar
    Then I should see products with the "<tag>" tag on top of the table on page 1
    Examples:
    | tag |
    | Anomalous: Low |
    | Anomalous: High |
    | CRITICAL! |
    | Popular! |
    | Restock? |

  Scenario: Prioritising a tag on page 2
    Given I am on page 2 of the merchandising table
    When I filter for the "Anomalous: Low" tag using the tag filter bar
    Then I should be moved to the first page
    And I should see products with the "Anomalous: Low" tag on top of the table on page 1

  Scenario: Prioritising multiple tags
    Given I have filtered for the "Anomalous: Low" tag using the tag filter bar
    And I have toggled the hide other products switch
    When I filter for the "Restock?" tag using the tag filter bar
    Then I should be able to see ONLY products with the "ANOMALOUS: LOW" and "RESTOCK?" tags

  Scenario: Hiding other products when no tags are selected
    Given no tags are selected
    When I toggle the hide other products switch
    Then the rows should not change

  Scenario: Hiding other products
    Given I have filtered for the "Anomalous: Low" tag using the tag filter bar
    When I toggle the hide other products switch
    Then every product I see should have the "ANOMALOUS: LOW" tag

  Scenario: Sorting under tag priorities
    Given I have filtered for the "Anomalous: Low" tag using the tag filter bar
    When I sort the table by stocks while tagged
    Then I should see the products with the "Anomalous: Low" tag sorted
    And I should see every other product under it sorted separately in the same order

