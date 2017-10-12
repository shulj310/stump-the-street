class Api::V1::LeadsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def create
    data = JSON.parse(request.body.read)
    @lead = Lead.new(data)
    @lead.referer = cookies["referer"]
    @lead.save

    render json: {auth:true}
  end

end
