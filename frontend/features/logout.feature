Feature: Logout

Scenario: Successful Logout
Given I am on '<view>' page
And I am on the sidebar
When I click on the logout button situated on the bottom of the sidebar
Then I should see a pop-up logout confirmation page
And I click on the confirm button
Then I should be redirected to the login page

 Examples:
    | view |
    | Home |
    | Sales |
    | Merchandising |


Scenario: Clicking away from modal
Given I am on '<view>' page
And I am on the sidebar
When I click on the logout button situated on the bottom of the sidebar
Then I should see a pop-up logout confirmation page
And I click anywhere outside the modal
Then the pop-up should close
And I remain on the '<view>' page
Examples:
    | view |
    | Home |
    | Sales |
    | Merchandising |
