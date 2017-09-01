class LimitClear < Thor
  require File.expand_path("config/environment.rb")

  desc "clear","clears all limit orders still outstanding if its past the date"

  def clear
    LimitOrder.where(deadline:(Time.now-100000000.day..Time.now)).destroy
  end
end
