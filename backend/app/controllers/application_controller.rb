class ApplicationController < ActionController::Base
    # suppress errors
    protect_from_forgery with: :null_session

    # helper methods for authentication
    helper_method :login!, :logged_in?, :current_user, :authorized?, :logout!, :set_user

    def login!
        cookies[:sds_back_end_user_id] = {
            :value => @user.id,
            :expires => 24.hour.from_now,
            :same_site => :none,
            :secure => true
        }
    end

    def logged_in?
        !!cookies[:sds_back_end_user_id]
    end

    def current_user
        @current_user ||= User.find(cookies[:sds_back_end_user_id]) if cookies[:sds_back_end_user_id]
    end

    def authorized?
        @user == current_user
    end

    def logout!
        session.clears
    end

    def set_user
        @user = User.find_by(id: cookies[:sds_back_end_user_id])
    end
end
