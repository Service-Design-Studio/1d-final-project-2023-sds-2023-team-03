@merchandising
Feature: Fetching merchandising data from PUMA's own database

  Scenario: Visiting the Merchandising page
    When I visit the merchandising page
    Then I should see the Merchandising header

  Scenario: Opening details of a row
    Given the product actions table has successfully loaded data
    When I click on a particular row
    Then the row should expand
    And show an image of the product with description

  Scenario: Opening details of a row when another row is expanded
    Given another row is already expanded
    When I expand another row
    Then the previous one will close
    And the new one will open

  Scenario: Sorting the rows
    Given the product actions table has successfully loaded data
    And the product actions table is currently sorted by "<column>" in ascending order
    When I press the "<column>" header on the product actions table
    Then the table should be sorted in descending order by "<column>"
    Examples:
    | column |
    | Stock |
    | Units sold |

  Scenario: Filtering the rows by category
    Given I have pressed the Category header
    And the selection popup is visible
    When I click on "Running" on the filter popup
    Then only products of the "Running" category should be visible

  Scenario: Filtering the rows by stock and category
    Given I have filtered the product actions table by "Running"
    And the product actions table is currently sorted by "Stock" in ascending order
    When I press the "Stock" header on the product actions table
    Then only products of the "Running" category should be visible
    And the table should be sorted in descending order by "Stock"
