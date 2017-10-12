class LeadsController < ApplicationController
  skip_before_action :verify_authenticity_token
  
  # GET /leads/new
  def new
    @lead = Lead.new
  end

  # POST /leads
  def create
    @lead = Lead.new(lead_params)
    @lead.referer = cookies[:referer]

    if @lead.save
      render html: 'You have been successfully signed up.'
    else
      render :new
    end
  end

  private
    # Only allow a trusted parameter "white list" through.
    def lead_params
      params.require(:lead).permit(:name, :email, :beta)
    end
end
