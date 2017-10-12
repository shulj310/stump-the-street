require "rails_helper"

RSpec.describe LeadsController, type: :routing do
  describe "routing" do
    it "routes to #create" do
      expect(:post => "/leads").to route_to("leads#create")
    end
  end
end
