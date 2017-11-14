class Api::V1::LeadsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def create
    data = JSON.parse(request.body.read)
    @lead = Lead.new(data)
    @lead.referer = cookies["referer"]
    if @lead.save
      SurveyMailer.survey(@lead, "survey_0#{@lead.id % 3 + 1}").deliver_now
    end

    render json: {auth:true}
  end

end
