
module Api
    module V1
        class UsersController < ApplicationController
    
            def index
                @users = User.all
                if @users
                    render json: {
                        users: @users
                    }
                else
                    render json: {
                        status: 500,
                        errors: ['No users registered']
                    }
                end
            end
        
            def show
                @user = User.find(params[:user_id])
                if @user
                    render json: {
                        user: @user
                    }
                else
                    render json: {
                        status 500,
                        errors: ['User not found']
                    }
                end
            end
        end        
    end
end


