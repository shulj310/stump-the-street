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
      user = User.find(current_user)

      if coupon == "LAUNCHTHESTREET" && user.used_code == false
        user.wallet += 100
        user.used_code = true
        user.save

        render json: user

      elsif user.used_code == true

        render json: {auth:"coupon"}
      else
        render json: {auth:false}
      end
    else
        render json: {auth:false}
    end
  end

end
