class ApplicationMailer < ActionMailer::Base
  default from: "\"Dash\" <no-reply@stumpthestreet.com>"
  layout 'mailer'
end
