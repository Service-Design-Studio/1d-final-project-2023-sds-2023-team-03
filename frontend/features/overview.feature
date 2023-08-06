@overview
Feature: Overview Page 

Scenario: Viewing summarized statistics on the overview page
Given I am on the overview page
Then I should see summarized statistics for sales, product actions, and competitor analysis

Scenario: Refreshing the statistics on the overview page
Given I am on the overview page
And there is new data available
When I press the refresh button
Then the page should display the updated statistics

Scenario: Pressing the refresh button while results are loading
Given I am on the overview page
When I press the refresh button
Then the refresh button will be disabled

Scenario: Viewing product link of top product
Given I am on the overview page
When I click the top product links buttons
Then I should see the product link on new tabs