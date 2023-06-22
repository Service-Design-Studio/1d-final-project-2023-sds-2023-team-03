Feature: Navigating to the various primary features of the tool

    Scenario: Opening Sidebar (Happy)
        Given the sidebar is currently retracted (minimized)
        When I hover anywhere on the sidebar (on the left side of the screen)
        Then the sidebar should enlarge and expand to the right side, revealing the navigation buttons inside
        And the icons on the retracted sidebar should now turn into text that I may click

    Scenario: Closing Sidebar (Happy)
        Given the sidebar is currently expanded
        When I hover anywhere outside the sidebar (on the right side of the screen) from within the sidebar
        Then the sidebar should minimize and retract to the left side
        And the sidebar will return back to its default state

    Scenario: Navigating to Home (Happy)
        Given I am on any page other than Home
        When I click on "Home" on the sidebar
        Then I will be redirected to the home page

    Scenario: Navigating to Sales (Happy)
        Given I am on any page other than Sales
        When I click on "Sales" on the sidebar
        Then I will be redirected to the Sales page

    Scenario: Navigating to Logistics (Happy)
        Given I am on any page other than Logistics
        When I click on "Logistics" on the sidebar
        Then I will be redirected to the Logistics page

    Scenario: Navigating to 'Competitor x' (Happy)
        Given I am on any page other than 'Competitor x'
        When I click on one of the product's "Competitor x" on the sidebar
        Then I will be redirected to the page of the specific competitor

    Scenario: Navigating to Same Page (Sad)
        Given I am on any page
        When I click on the icon that represents my current page
        Then I will still remain on the same page

    Scenario: Navigating to Competitor Icon (Sad)
        Given I am on the expanded sidebar
        When I click on the competitor icon
        Then I will still remain on the same page
