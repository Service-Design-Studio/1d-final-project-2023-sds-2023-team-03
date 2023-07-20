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
And I have pressed the refresh button
When the results are still loading
And I pressed it again
Then the date should not change

