class Odds

  def initialize(timelength,competitor)
    @timelength,@competitor = timelength,competitor
    @odds_hash = {
          1=>0.35,
          3=>0.5,
          7=>0.75,
          14=>0.95,
          28=>1,
          56=>1.2
        }
  end

  def calc_odds
    @odds_hash[@timelength.to_i]*0.95
  end

end
