class DataLabel

  def initialize(ticker,company,tags=[],id=nil,store_data=false,signed_in=true)
    @company = company
    @ticker = ticker
    @id = id
    @tags = tags
    @signed_in = signed_in
    @sic = ""
    @stock = []
    @tag_to_name = JSON.parse(File.read('./app/controllers/api/v1/utils/initioTags_to_name.json'))
    if store_data
      self.save_data
    end
  end

  def output
    data = @company["data"].map do |data|
      tag_hash = @tag_to_name[data["item"]]
      {tag_hash["tag"]=>[data["value"],tag_hash["data_type"]]}
    end
    @stock = {@ticker=>data}
    return @stock
  end

  def header
    data = @company["data"].map {|data| {@tag_to_name[data.values[1]]=>data.values[2]}}
    @stock = {@ticker=>data}
    return @stock
  end

  def save_data
    original_tags = ["name", "marketcap", "pricetoearnings", "operatingmargin"]
    new_tags = @tags.split(',').select { |t| !original_tags.include?(t) }

    tags = new_tags.join(',')
    if @signed_in
      unless SearchHistory.where({user_id:@id,fields:tags,created_at:(Time.now-1.day..Time.now)}).length > 0
        SearchHistory.create(
          user_id: @id,
          fields: tags,
          ticker: @ticker
        )
      end
    else
      unless SearchHistory.where({session_id:@id,fields:tags,created_at:(Time.now-1.day..Time.now)}).length > 0
        SearchHistory.create(
          session_id: @id,
          fields: tags,
          ticker: @ticker
        )
      end
    end
  end
end
