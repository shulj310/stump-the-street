class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  
  before_action :configure_permitted_parameters, if: :devise_controller?
  before_action :store_referer

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:first_name, :last_name,
            :dob, :zip, :country])
  end

  def store_referer
    unless cookies[:referer].present?
      cookies[:referer] = { value: request.referer, expires: 3.months.from_now }
    end
  end
 end
