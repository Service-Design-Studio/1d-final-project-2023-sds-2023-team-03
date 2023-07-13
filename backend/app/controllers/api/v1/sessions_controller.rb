module Api
    module V1
        class SessionsController < ApplicationController
            def create
                @user = User.find_by(username: session_params[:username])
        
                if @user && @user.authenticate(session_params[:password])
                    login!
                    render json: {
                        logged_in: true,
                        user: @user
                    }
                else
                    render json: {
                        status: 401,
                        errors: ['User not found']
                    }
                end
            end
        
            def destroy
                logout!
                cookies.delete :sds_back_end_user_id
                render json: {
                    status: 200,
                    logged_out: true
                }
            end

            def is_logged_in?
                if logged_in? && current_user
                    render json: {
                        logged_in: true,
                        user: current_user
                    }
                else
                    render json: {
                        logged_in: false,
                        message: 'User not found'
                    }
                end
            end

            def set_admin!
                @user = User.new(:username => "admin", :password => "Abc12345")
                @user.save!
            end

            private
            def session_params
                params.require(:user).permit(:username, :password)
            end
        end
    end
end
