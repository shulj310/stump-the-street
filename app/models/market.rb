class Market
  # hardcoded implementation for US market
  def initialize
    @holidays_schedule = :us
    # Eastern timezone is set as application local timezone in the config
  end

  def open?
    if bank_holiday?(current_time)
      return false
    end
    current_time.between?(opening_time, closing_time)
  end

  def opening_time
    Time.zone.local(current_time.year, current_time.month, current_time.day, 9, 30)
  end

  def closing_time
    Time.zone.local(current_time.year, current_time.month, current_time.day, 16)
  end

  def current_time
    Time.zone.now
  end

  def bank_holiday?(time)
    time.saturday? or time.sunday? or Holidays.on(time, @holidays_schedule).present?
  end

  def next_working_day(time)
    while bank_holiday?(time)
      time += 1.day
    end
    time
  end
end