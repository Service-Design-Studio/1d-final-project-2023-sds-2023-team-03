Feature: Product Category

  Scenario: Product with Name and Description
    Given I am on any competitor's page
    And I see a table of competitors’ products
    When the product has a name and description
    Then I should see the category column of the product to contain a specific category

