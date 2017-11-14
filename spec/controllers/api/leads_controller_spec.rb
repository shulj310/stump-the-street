require 'rails_helper'

RSpec.describe Api::V1::LeadsController, type: :controller do

  # This should return the minimal set of attributes required to create a valid
  # Lead. As you add validations to Lead, be sure to
  # adjust the attributes here as well.
  let(:valid_attributes) {
    {
      email: 'test@example.com',
      name: 'Test User',
    }
  }

  let(:invalid_attributes) {
    skip("Add a hash of attributes invalid for your model")
  }

  # This should return the minimal set of values that should be in the session
  # in order to pass any filters (e.g. authentication) defined in
  # LeadsController. Be sure to keep this updated too.
  let(:valid_session) { {} }

  describe "POST #create", type: :request do
    context "with valid params" do
      it "creates a new Lead" do
        expect {
          post '/api/v1/leads', params: valid_attributes.to_json, headers: { 'CONTENT_TYPE' => 'application/json', 'ACCEPT' => 'application/json' }
        }.to change(Lead, :count).by(1)
      end

      it "sends survey mail" do
        assert_difference 'ActionMailer::Base.deliveries.size', +1 do
          post '/api/v1/leads', params: valid_attributes.to_json, headers: { 'CONTENT_TYPE' => 'application/json', 'ACCEPT' => 'application/json' }
        end
      end
    end

    context "with invalid params" do
      it "returns a success response (i.e. to display the 'new' template)" do
        post :create, params: {lead: invalid_attributes}, session: valid_session
        expect(response).to be_success
      end
    end
  end

end
