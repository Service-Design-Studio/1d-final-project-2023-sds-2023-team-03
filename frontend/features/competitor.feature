@competitor
Feature: Fetching competitor data from database after scraping Merchant APIs

	Scenario: Visiting the Competitors page of "<competitor>"
		When I visit the Competitors page of "<competitor>"
		Then I should see the "<competitor>" competitor header
	Examples:
    | competitor  |
    | Overall |
    | Nike  |
    | Skechers  |
    | Under Armour  |
    | Adidas |

	Scenario: Loading top performing products section
		When I navigate to the top performing products section
		Then I should see the keywords
		And I should see top five performing products based on number sold

	Scenario: Loading competitors section
		When I navigate to the competitors section
		Then I should see the competitors table

	Scenario: Viewing details of a top performing product
		Given the top five performing products section have successfuly loaded data
		When I click on a particular card
		Then I should be directed to the merchant site of the product in the card

	Scenario: Viewing details of a product
		Given the competitors table has successfully loaded data
		When I click on a particular row on the competitors table
		Then I should be directed to the merchant site of the product in the row

	Scenario: Sorting the rows
		Given the competitors table has successfully loaded data
		And the competitors table is currently sorted by "<column>" in ascending order
		When I press the "<column>" header on the competitors table
		Then the competitors table should be sorted in descending order by "<column>"
		Examples:
		| column |
		| Sales |

