class StatusUpdate < Thor
  require File.expand_path("config/environment.rb")

  desc "status_update", "user data 10 minute increments"

  def status_update
    total_users = User.all.length
    total_competitions = Competition.all.length

    total_exposure = Competition.all.pluck(:current_value).inject(0) {|sum,x| sum+x }
    current_exposure = 0

    Competition.all.each do |comp|

      if comp.diff > 0
        current_exposure += comp.current_value
      end
    end

    StatusMailer.update(total_users,total_competitions,total_exposure,current_exposure).deliver

  end
end
