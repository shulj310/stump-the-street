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

      coupon_code = ENV["COUPON_CODE"]

      if coupon == coupon_code && !user.used_code
        user.wallet += 100
        user.used_code = true
        user.save

        render json: user

      elsif user.used_code && coupon == coupon_code

        render json: {auth:"coupon"}
      else
        render json: {auth:false}
      end
    else
        render json: {auth:false}
    end
  end

end
