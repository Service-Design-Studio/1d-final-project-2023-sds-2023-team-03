Feature: Overview Navigation
    
    Scenario: Opening Overview (Happy)
        Given that I am in the overview page (/overview),
        Then I should see three columns of summarized statistics pertaining to the three categories


    Scenario: Refreshing Overview (Happy)
        Given that I am in the overview page, and the statistics of the three categories change after the overview page has loaded,
        When I press the refresh button,
        Then The three columns should refresh and reflect the updated statistics.

    Scenario: Impatient Refreshing (Sad)
        Given that I am on the overview page, and that I have pressed the refresh button, but the results have not returned yet,
        When I press the refresh button again,
        Then Nothing should happen

    Scenario: Resfresh Button (Happy) 
        Given that I am on the overview page,
        When I press the refresh button,
        Then It should turn a little transparent and gray,
        And It should be unclickable.
