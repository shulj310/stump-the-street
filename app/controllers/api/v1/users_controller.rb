class Api::V1::UsersController < ApplicationController
  skip_before_action :verify_authenticity_token

  def show
    wallet = User.find(current_user.id)
    render json: wallet
  end

  def update

    if current_user

      data = JSON.parse(request.body.read)

      coupon = data["couponCode"]

      if coupon == "LAUNCHTHESTREET"
        user = User.find(current_user)
        user.wallet += 100
        user.save
        render json: user
      else
        render json: {auth:false}
      end
    else
        render json: {auth:false}
    end
  end

end
