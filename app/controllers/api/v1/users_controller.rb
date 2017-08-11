class Api::V1::UsersController < ApplicationController
  skip_before_action :verify_authenticity_token

  def show
    wallet = User.find(current_user.id)
    render json: wallet
  end

  def update
    if current_user

      data = JSON.parse(request.body.read)

      coupon,dollar_added = data["coupon"],dollar_added["dollarAdded"]

      if coupon == "LAUNCHTHESTREET"
        user = User.find(current_user)
        user.wallet += dollar_added
        user.save
        render json: user
      else
        render json: {message:"There was an error processing your order"}
      end
    else
        render json: {message:"You must be an authorized user to add to your wallet"}
    end
  end

end
