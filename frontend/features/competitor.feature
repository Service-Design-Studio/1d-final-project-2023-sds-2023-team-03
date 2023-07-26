@competitor
Feature: Fetching competitor data from database after scraping Merchant APIs

	Scenario: Visiting the Competitors page
		When I visit the Competitors page
		Then I should see the Competitors header

	Scenario: Loading top performing products section
		When I navigate to the top performing products section
		Then I should see the keywords
		And I should see top five performing products based on number sold

	Scenario: Loading competitors section
		When I navigate to the competitors section
		Then I should see the competitors table

	Scenario: Viewing details of a top performing product
		Given the top give performing products section have successfuly loaded data
		When I click on a particular card
		Then I should be directed to the merchant site selling the product

	Scenario: Viewing details of a product
		Given the competitors table has successfully loaded data
		When I click on a particular row
		Then I should be directed to the merchant site selling the product

	Scenario: Sorting the rows
		Given the competitors table has successfully loaded data
		And the competitors table is currently sorted by "<column>" in ascending order
		When I press the "<column>" header on the competitors table
		Then the table should be sorted in descending order by "<column>"
		Examples:
		| column |
		| Sales |

