require 'date'

Given('I have the default category and time period selected {string} and {string}') do |selected_category, selected_time_period|
  # Implement the logic to retrieve the selected category selected time period
  @category = selected_category
  @time_period = selected_time_period
end
When('I press the {string} button') do |button_name|
  # Simulate the button click
  click_button(button_name)
end
Then('the {string} button should grey out') do |button_name|
  # Verify that the button is greyed out
  expect(page).to have_selector(:button, button_name, disabled: true)
end
And('I should see a loading message where the sales insights should be') do
  # Verify the presence of the loading message
  expect(page).to have_content('Loading...')
end
And('I should see the dashboard pertaining to the {string} category and the {string} time range') do |expected_category, expected_time_range|
  # Verify the presence of the dashboard with the expected category and time range
  expect(page).to have_content("Category: #{expected_category}")
  expect(page).to have_content("Time Range: #{expected_time_range}")
end


=begin
Given('that I have switched out the time period presets for the "{string}" text box on the {string} page, but have not entered a valid time period') do |string, given_page|
  # Implement the logic to retrieve the current page and check the text box status
  current_page = get_current_page()
  expect(current_page).to eq(given_page)

  text_box_status = get_text_box_status()
  expect(text_box_status).to eq(true)
end

Then('an error message should appear on the screen instructing the user to select a valid time period') do
  # Implement the logic to check the valid entry message status
  valid_entry_msg_status = get_valid_entry_msg_status()
  expect(valid_entry_msg_status).to eq(true)
end

Given('that I have the default category ("{string}") selected on the {string} page, and a time period in the future') do |given_category, given_page|
  # Implement the logic to retrieve the selected category and current page
  category_selected = get_category_selected()
  current_page = get_current_page()
  expect(category_selected).to eq(given_category)
  expect(current_page).to eq(given_page)

  start_date = '2012-11-01' # Change to the desired start date
  end_date = '2025-07-02' # Change to the desired end date
  expect(check_time_period_valid(start_date, end_date)).to eq('invalid time period')
end

Given('that I have pressed the "{string}" button with a valid category and time period on the {string} page, and the results have not yet returned') do |given_button, given_page|
  # Implement the logic to check the button clicked, current page, selected category, time period, and results status
  button_selected = 'Fetch data' # Change to the button that is pressed
  expect(button_clicked(given_button, button_selected)).to eq(true)
  current_page = get_current_page()
  expect(current_page).to eq(given_page)

  category = 'Running' # Change to the desired category selected
  date_start = '2020-11-02' # Change to the desired start date selected
  date_end = '2021-07-02' # Change to the desired end date selected
  results_status = get_results_status()

  expect(check_time_period_valid(date_start, date_end)).to eq('valid time period')
  expect(check_category_valid(category)).to eq('valid category')
  expect(results_status).to eq(false)
end

Then('I should still see the loading message, and nothing else should happen') do
  # Implement the logic to check the loading message status
  loading_message_status = get_loading_message_status()
  expect(loading_message_status).to eq(true)
end

Given('that I am in the {string} page with the default category and time period preset ("{string}" and "{string}") selected') do |given_page, given_category, given_time_period|
  # Implement the logic to retrieve the selected category, time period, and current page
  category_selected = get_category_selected()
  time_period_selected = get_time_period_selected()
  current_page = get_current_page()

  expect(category_selected).to eq(given_category)
  expect(time_period_selected).to eq(given_time_period)
  expect(current_page).to eq(given_page)
end

When('I press the "{string}" button beside the time period preset') do |given_button|
  # Implement the logic to check the button clicked
  button_selected = 'Calendar' # Change to the button that is pressed
  expect(button_clicked(given_button, button_selected)).to eq(true)
end

Then('the time period presets should now switch to a text box labeled "{string}"') do |string|
  # Implement the logic to check the text box and time presets status
  text_box_status = get_text_box_status()
  expect(text_box_status).to eq(true)

  time_presets_status = get_time_presets_status()
  expect(time_presets_status).to eq(false)
end

Given('that I have switched out the time period presets for the "{string}" text box') do |string|
  # Implement the logic to check the text box status
  text_box_status = get_text_box_status()
  expect(text_box_status).to eq(true)
end

When('I click the "{string}"') do |given_button|
  # Implement the logic to check the button clicked (clicking the text box)
  button_pressed = 'text box' # Change to the button that is clicked
  expect(button_clicked(given_button, button_pressed)).to eq(true)
end

When('I press the "{string}" button') do |given_button|
  # Implement the logic to check the button clicked
  button_selected = 'Fetch data' # Change to the button that is pressed
  expect(button_clicked(given_button, button_selected)).to eq(true)
end

When('I press the "{string}" button again') do |given_button|
  # Implement the logic to check the button clicked
  button_selected = 'Fetch data' # Change to the button that is pressed
  expect(button_clicked(given_button, button_selected)).to eq(true)
end

Then('a calendar popout should be visible') do
  # Implement the logic to check the calendar popout status
  calendar_status = get_calendar_status()
  expect(calendar_status).to eq(true)
end

Then('the "{string}" button should grey out') do |given_button|
  # Implement the logic to check the button selected status (false = disabled)
  button_selected = 'Fetch data' # Change to the button selected
  button_selected_status = get_button_selected_status()
  expect(button_selected_status).to eq(false)
end

Then('I should see a loading message where the sales insights should be') do
  # Implement the logic to check the loading message status
  loading_message_status = get_loading_message_status()
  expect(loading_message_status).to eq(true)
end

Then('I should see the dashboard pertaining to the "{string}" category and the "{string}" time range') do |given_category, given_time_range|
  # Implement the logic to retrieve the shown category and time range after loading is done
  category_shown = get_category_shown()
  time_range_shown = get_time_range_shown()
  expect(category_shown).to eq(given_category)
  expect(time_range_shown).to eq(given_time_range)
end
=end

module AllFns

  def check_category(given_category,category_selected) 
    if category_selected == given_category
      TRUE
    else
      FALSE
    end
  end

  def check_time_range(given_time_range,time_range_selected) 
    if time_range_selected == given_time_range
      TRUE
    else 
      FALSE
    end
  end

  def check_current_page(given_page,current_page) 
    if current_page == given_page
      TRUE
    else 
      FALSE
    end
  end

  def button_clicked(given_button, button_selected) 
    if button_selected == given_button
      TRUE
    else 
      FALSE
    end
  end

  def check_button_status_disabled(given_button,button_selected,button_selected_status)
    if (button_selected == given_button and button_selected_status == TRUE)
      'button still enabled'
    elsif (button_selected == given_button and button_selected_status == FALSE)
      'button disabled'
    else
      'invalid button selection / status'
    end
  end

  def check_loading_message(status) 
    if status == TRUE
      'loading message shown'
    else status == FALSE
      'loading message missing'
    end
  end

  def check_valid_entry_msg(status) 
    if status == TRUE
      'error message: invalid entry shown'
    else status == FALSE
      'error message: invalid entry missing'
    end
  end

  def check_time_period_valid(start, end_date) 
    if (start == nil or end_date == nil)
      'invalid time period'
    elsif (Date.parse(start) < Date.today and Date.parse(end_date) < Date.today and Date.parse(start) < Date.parse(end_date))
      'valid time period'
    else
      'invalid time period'
    end
  end

  def check_category_valid(category) 
    if (category == 'Running' or category == 'Comfortwear')
      'valid category'
    else
      'invalid category'
    end
  end

  def check_results_status(result) 
    if result == TRUE
      TRUE
    else
      FALSE
    end
  end

  def check_text_box(result) 
    if result == TRUE
      TRUE
    else
      FALSE
    end
  end

  def check_time_presets(preset_status) 
    if preset_status == TRUE
      TRUE
    else
      FALSE
    end
  end

  def check_calendar_popout(calendar_status) 
    if calendar_status == TRUE
      TRUE
    else
      FALSE
    end
  end

end

World AllFns

