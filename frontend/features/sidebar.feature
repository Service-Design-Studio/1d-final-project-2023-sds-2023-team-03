Feature: Sidebar Navigation

    Scenario: Opening Sidebar (Happy)
        Given the sidebar is retracted 
        When I hover anywhere on the sidebar (on the left side of the screen)
        Then the sidebar should enlarge and expand to the right side, revealing the navigation buttons inside
        And the icons on the retracted sidebar should turn into clickable text

    Scenario: Closing Sidebar (Happy)
        Given the sidebar is expanded
        When I hover anywhere outside the sidebar (on the right side of the screen) from within the sidebar
        Then the sidebar should minimize and retract to the left side

    Scenario: Navigating to Home (Happy)
        Given I am on any page other than Home
        And I hover anywhere on the sidebar (on the left side of the screen)
        When I click on "Home" on the sidebar
        Then I should be redirected to the Home page

    Scenario: Navigating to Sales (Happy)
        Given I am on any page other than Sales
        And I hover anywhere on the sidebar (on the left side of the screen)
        When I click on "Sales" on the sidebar
        Then I should be redirected to the Sales page

    Scenario: Navigating to Merchandising (Happy)
        Given I am on any page other than Merchandising
        And I hover anywhere on the sidebar (on the left side of the screen)
        When I click on "Merchandising" on the sidebar
        Then I should be redirected to the Logistics page

    Scenario: Navigating to Same Page (Sad)
        Given I am on '<page>'
        And I hover anywhere on the sidebar (on the left side of the screen)
        When I click on the icon that represents '<page>'
        Then I should remain on '<page>'
    Examples:
    | page |
    | Home |
    | Sales |
    | Merchandising |


    Scenario Outline: Navigating to a Competitor
    Given that I am on any page other than '<competitor>'
    And I hover anywhere on the sidebar (on the left side of the screen)
    When I click on the "<competitor>" in the competitor dropdown box
    Then I will be redirected to the page of "<competitor>"
    Examples:
    | competitor  |
    | Adidas |
    | Nike  |
    | Skechers  |
    | Under Armour  |
    | Overall  |

