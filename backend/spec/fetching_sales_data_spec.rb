require 'rails_helper'

RSpec.feature 'Fetching sales data', type: :feature do
  scenario 'Fetching data with default category and time period (Happy)' do
    # Test steps for Scenario 1
    # Step 1: Set up the default category and time period
    category = 'Running'
    time_period = 'Last 30 days'

    # Step 2: Perform the action of pressing the "Fetch data" button
    visit sales_path
    click_button 'Fetch data'

    # Step 3: Verify that the "Fetch data" button is greyed out
    expect(page).to have_button('Fetch data', disabled: true)

    # Step 4: Verify the presence of the loading message
    expect(page).to have_text('Loading...')

    # Step 5: Verify that the dashboard displays the expected category and time period
    expect(page).to have_text("Dashboard: #{category} (#{time_period})")
  end

  scenario 'Fetching data without a valid time period (Sad)' do
    # Test steps for Scenario 2
    # Step 1: Switch out the time period presets for the "time period" text box
    visit sales_path
    click_button 'Calendar'
    fill_in 'time period', with: ''

    # Step 2: Perform the action of pressing the "Fetch data" button
    click_button 'Fetch data'

    # Step 3: Verify that an error message is displayed instructing the user to enter a valid time period
    expect(page).to have_text('Please enter a valid time period.')
  end

  scenario 'Fetching data with a future time period (Sad)' do
    # Test steps for Scenario 3
    # Step 1: Set up the default category and a future time period
    category = 'Running'
    time_period = 'Future'

    # Step 2: Perform the action of pressing the "Fetch data" button
    visit sales_path
    select category, from: 'category'
    fill_in 'time period', with: time_period
    click_button 'Fetch data'

    # Step 3: Verify that an error message is displayed instructing the user to select a valid time period
    expect(page).to have_text('Please select a valid time period.')
  end

  scenario 'Fetching data while previous request is still loading (Sad)' do
    # Test steps for Scenario 4
    # Step 1: Set up the default category and time period
    category = 'Running'
    time_period = 'Last 30 days'

    # Step 2: Perform the action of pressing the "Fetch data" button
    visit sales_path
    click_button 'Fetch data'

    # Step 3: Perform the action of pressing the "Fetch data" button again
    click_button 'Fetch data'

    # Step 4: Verify that the loading message is still displayed
    expect(page).to have_text('Loading...')
  end

  scenario 'Switching to custom time period (Happy)' do
    # Test steps for Scenario 5
    # Step 1: Set up the default category and time period
    category = 'Running'
    time_period = 'Last 30 days'

    # Step 2: Perform the action of pressing the "Calendar" button
    visit sales_path
    click_button 'Calendar'

    # Step 3: Verify that the time period presets are replaced with a text box labeled "time period"
    expect(page).not_to have_select('category')
    expect(page).to have_field('time period')
  end

  scenario 'Viewing calendar popout for custom time period (Happy)' do
    # Test steps for Scenario 6
    # Step 1: Switch out the time period presets for the "time period" text box
    visit sales_path
    click_button 'Calendar'

    # Step 2: Perform the action of clicking on the "time period" text box
    find('#time-period').click

    # Step 3: Verify that a calendar popout is visible
    expect(page).to have_css('.calendar-popout')
  end

  # Additional test cases

  scenario 'Attempting to fetch data with an empty category and time period' do
    # Test steps for an additional test case
    # ...
  end

  scenario 'Attempting to fetch data with an invalid category' do
    # Test steps for an additional test case
    # ...
  end

  scenario 'Viewing an empty dashboard when no sales data is available' do
    # Test steps for an additional test case
    # ...
  end

  # Add more test cases as needed

end
