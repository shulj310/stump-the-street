class CompetitorPortfolio < ApplicationRecord
    belongs_to :competition

    after_create do |comp_port|
      spy = Stock.find_by(ticker:"SPY")
      spy.get_price
      comp_port.value = spy.price
      comp_port.cost = spy.price
      comp_port.save
    end

    after_touch do |comp_port|
      spy = Stock.find_by(ticker:"SPY")
      comp_port.value = spy.price
      comp_port.return = ((spy.price/comp_port.cost) -1)
      comp_port.save
    end
end
