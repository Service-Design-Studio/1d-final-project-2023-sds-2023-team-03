Feature: Intrinsic search functionalities

    Scenario: Searching with a specific time period (Happy)
        Given that I am on the sales page with the default category and time period preset "Running" and "Last 30 days" selected
        When I press the calendar button
        Then the time period presets should switch to a text box labeled "click to choose"

    Scenario: Inputting the time period for searching (Happy)
        Given that I have switched out the time period presets for the "click to choose" text box
        When I click the text box
        Then a calendar popup should be visible, displaying the dates of the current month

    Scenario: Interacting with the calendar popup - Part 1 (Happy)
        Given that the calendar popup is visible
        When I first click on a date that is not beyond today's date
        Then the date should be reflected in the text box, followed by a dash, incomplete time period

    Scenario: Interacting with the calendar popup - Part 2 (Happy)
        Given that the calendar popup is visible and one date has been reflected in the text box
        When I click on a date that is not beyond today's date and different from the currently reflected date
        Then the complete time period should be reflected in the text box
        And the calendar popup will disappear

    Scenario: Interacting with the calendar popup - Part 3 (Happy)
        Given that the calendar popup is visible
        When I click on a date that has been selected (highlighted by blue)
        Then the date will be deselected and disappear from the text box

    Scenario: Interacting with the calendar popup - Part 4 (Happy)
        Given that the calendar popup is visible
        When I click on the arrow buttons on both sides of the displayed month that is not greyed out
        Then the displayed month should change by a period of 1 month
        And the calendar dates should change accordingly

    Scenario: Interacting with the calendar popup - Part 5 (Happy)
        Given that the calendar popup is visible
        When I click on the displayed month
        Then I should see a calendar displaying the available months of the year, with the year displayed above

    Scenario: Interacting with the calendar popup - Part 6 (Happy)
        Given that the calendar popup is visible and is displaying the list of months
        When I click on the displayed year
        Then I should see a calendar displaying the list of years in a period of ten years, with the range of years displayed above

    Scenario: Selecting a category (Happy)
        Given that I am on the sales page
        When I click on the category drop-down button
        And I select a specific category
        Then I should see the selected category reflected in the text box

    Scenario: Clicking on a future date in the calendar popup (Sad)
        Given that the calendar popup is visible
        When I click on a date/month/year that is beyond today's date
        Then nothing will happen

    Scenario: Clicking anywhere outside the calendar popup (Sad)
        Given that the calendar popup is visible
        When I click anywhere outside the calendar popup
        Then the calendar popup will disappear, without saving the first input date if there is any
