class Users::SessionsController < Devise::SessionsController
  before_action :configure_sign_in_params, only: [:create]

  # GET /resource/sign_in
  def new
    super do |resource|
      @competitions = Competition.all.limit(3)
      binding.pry
    end
  end

  # POST /resource/sign_in
  def create
    super
  end

  # DELETE /resource/sign_out
  def destroy
    super
  end

  protected

  # If you have extra params to permit, append them to the sanitizer.
  def configure_sign_in_params
        devise_parameter_sanitizer.permit(:sign_up, keys: [:first_name, :last_name,
              :dob, :zip, :country])
  end
end
