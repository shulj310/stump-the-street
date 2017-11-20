class SurveyMailer < ApplicationMailer
  layout 'survey'

  def survey(lead, template)
    @lead = lead
    mail(
      to: @lead.email,
      subject: 'Welcome to Stump the Street',
      template_name: template,
    )
  end
end
