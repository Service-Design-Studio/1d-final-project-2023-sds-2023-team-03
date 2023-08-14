class ApplicationController < ActionController::Base
  # TODO: Remove in the future for API security check
  skip_before_action :verify_authenticity_token
end
