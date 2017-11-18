class SurveyMailer < ApplicationMailer
  layout false

  def survey(lead, template)
    @lead = lead
    mail(
      to: @lead.email,
      subject: 'Welcome to Stump the Street',
      template_name: template,
    )
  end
end
