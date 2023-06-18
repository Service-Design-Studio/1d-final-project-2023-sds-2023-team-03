require 'date'


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

Given('that I have the default category and time period selected on the {string} page \({string} and {string})') do |given_page, given_category, given_time_period|
  category_selected = 'Running' ## change to category selected 
  time_period_selected = 'Last 30 days'
  current_page = 'Sales' ## change to current page
  expect(check_category(given_category, category_selected)).to eq(TRUE)
  expect(check_time_range(given_time_period, time_period_selected)).to eq(TRUE)
  expect(check_current_page(given_page, current_page)).to eq(TRUE)
end

Given('that I have switched out the time period presets for the {string} text box on the {string} page, but have not entered a valid time period') do |string, given_page|
  current_page = 'Sales' ## change to current page
  expect(check_current_page(given_page, current_page)).to eq(TRUE)

  text_box_status = TRUE ## change to text box status. TRUE if show, FALSE if still hidden
  expect(check_text_box(text_box_status)).to eq(TRUE)
end

Then('an error message should appear on the screen instructing the user to select a valid time period') do
  valid_entry_msg = TRUE ## change to status of the error message shown, prompting user to select valid time period. TRUE = msg shown, FALSE = msg hidden
  expect(check_valid_entry_msg(valid_entry_msg)).to eq('error message: invalid entry shown')
end

Given('that I have the default category \({string}) selected on the {string} page, and a time period in the future') do |given_category, given_page|
  category_selected = 'Running' ## change to category selected 
  current_page = 'Sales' ## change to current page
  expect(check_category(given_category, category_selected)).to eq(TRUE)
  expect(check_current_page(given_page, current_page)).to eq(TRUE)

  start_date = '2012-11-01' ## change to start date
  end_date = '2025-07-02' ## change to end date
  expect(check_time_period_valid(start_date, end_date)).to eq('invalid time period')
end

Given('that I have pressed the {string} button with a valid category and time period on the {string} page, and the results have not yet returned') do |given_button, given_page|
  button_selected = 'Fetch data' ## change to button that is pressed 
  expect(button_clicked(given_button, button_selected)).to eq(TRUE)
  current_page = 'Sales' ## change to current page
  expect(check_current_page(given_page, current_page)).to eq(TRUE)

  category = 'Running' ## change to category selected
  date_start = '2020-11-02' ## change to start date selected
  date_end = '2021-07-02' ## change to end date selected
  results_status = TRUE ## change to results status. If results retrieved already, set to TRUE, else FALSE

  expect(check_time_period_valid(date_start,date_end)).to eq('valid time period')
  expect(check_category_valid(category)).to eq('valid category')
  expect(check_results_status(results_status)).to eq(TRUE)

end

Then('I should still see the loading message, and nothing else should happen') do
  loading_message_status = TRUE ## change to status of loading message
  expect(check_loading_message(loading_message_status)).to eq('loading message shown')
end

Given('that I am in the {string} page with the default category and time period preset \({string} and {string}) selected') do |given_page, given_category, given_time_period|
  category_selected = 'Running' ## change to category selected 
  time_period_selected = 'Last 30 days'
  current_page = 'Sales' ## change to current page
  expect(check_category(given_category, category_selected)).to eq(TRUE)
  expect(check_time_range(given_time_period, time_period_selected)).to eq(TRUE)
  expect(check_current_page(given_page, current_page)).to eq(TRUE)
end

When('I press the {string} button beside the time period preset') do |given_button|
  button_selected = 'Calendar' ## change to button that is pressed 
  expect(button_clicked(given_button, button_selected)).to eq(TRUE)
end

Then('the time period presets should now switch to a text box labeled {string}') do |string|
  text_box_status = TRUE ## change to text box status. TRUE if show, FALSE if still hidden
  expect(check_text_box(text_box_status)).to eq(TRUE)

  time_presets_status = FALSE ## change to time presets status. FALSE if time presets are hidden
  expect(check_time_presets(time_presets_status)).to eq(FALSE)
end

Given('that I have switched out the time period presets for the {string} text box') do |string|
  text_box_status = TRUE ## change to text box status. TRUE if show, FALSE if still hidden
  expect(check_text_box(text_box_status)).to eq(TRUE)
end

When('I click the {string}') do |given_button|
  button_pressed = 'text box' ## change to button clicked. clicking the text box
  expect(button_clicked(given_button,button_pressed)).to eq(TRUE)
end

When('I press the {string} button') do |given_button|
  button_selected = 'Fetch data' ## change to button that is pressed 
  expect(button_clicked(given_button, button_selected)).to eq(TRUE)
end

When('I press the {string} button again') do |given_button|
  button_selected = 'Fetch data' ## change to button that is pressed 
  expect(button_clicked(given_button, button_selected)).to eq(TRUE)
end

Then('a calendar popout should be visible') do
  calendar_status = TRUE ## change to calendar popout status. TRUE if show, FALSE if still hidden
  expect(check_calendar_popout(calendar_status)).to eq(TRUE)
end

Then('the {string} button should grey out') do |given_button|
  button_selected = 'Fetch data' ## change to button selected
  button_selected_status = FALSE ## change to the status of the button selected. FALSE = DISABLED
  expect(check_button_status_disabled(given_button,button_selected,button_selected_status)).to eq('button disabled')
end

Then('I should see a loading message where the sales insights should be') do
  loading_message_status = TRUE ## change to status of loading message
  expect(check_loading_message(loading_message_status)).to eq('loading message shown')
end

Then('I should see the dashboard pertaining to the {string} category and the {string} time range') do |given_category, given_time_range|
  category_shown = 'Running' ## change to category shown after loading is done
  time_range_shown = 'Last 30 days' ## change to time range shown after loading is done
  expect(check_category(given_category,category_shown)).to eq(TRUE)
  expect(check_time_range(given_time_range,time_range_shown)).to eq(TRUE)
end