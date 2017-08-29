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

    last_day_users = User.where(updated_at:(Time.now-1.day..Time.now)).pluck(:updated_at,:first_name,:last_name)

    if last_day_users.length == 0
      last_day_users = [["none", "none", "none"]]
    end

    latest_users = User.where(created_at:(Time.now-1.day..Time.now)).pluck(:updated_at,:first_name,:last_name)

    if latest_users.length == 0
      latest_users = [["none", "none", "none"]]
    end

    ########## GET THE WEIGHT OF EACH STOCK ACROSS ALL PORTFOLIOS ##############

    stock_exposure_hash = Position.group(:stock_id).sum(:value)
    total_value = Portfolio.all.sum(:value)
    sorted_exposure_hash = Hash[stock_exposure_hash.sort_by { |k,v| v }.reverse]
    sorted_exposure_hash = sorted_exposure_hash.map { |key,value| {Stock.find(key).ticker => value/total_value} }

    ########## GET THE DOLLAR EXPOSURE BY EACH STOCK ACROSS ALL PORTFOLIOS ##############

    stock_exposure = {}
    Competition.all.each do |comp|
      stock_hash = comp.portfolio.positions.group(:stock_id).sum(:value)
      stocks_by_weight = stock_hash.map { |key,value| {Stock.find(key).ticker => value/total_value*comp.current_value}}
      # stocks_by_weight.map { |k,v| stock_exposure[k].nil? ? stock_exposure[k]=v : stock_exposure[k] += v }
      stocks_by_weight.each { |hash| stock_exposure[hash.keys[0]].nil? ? stock_exposure[hash.keys[0]] = hash.values[0] : stock_exposure[hash.keys[0]] += hash.values[0]}
    end

    StatusMailer.update(total_users,total_competitions,total_exposure,last_day_users,latest_users,current_exposure,stock_exposure, sorted_exposure_hash).deliver

  end
end
