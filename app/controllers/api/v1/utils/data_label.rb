class DataLabel

  def initialize(ticker,company,include_tags=false,tags=[])
    @company = company
    @ticker = ticker
    @include_tags = include_tags
    @tags = tags
    @sic = ""
    @stock = []
    @tag_to_name = JSON.parse(File.read('./app/controllers/api/v1/utils/initioTags_to_name.json'))

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
end
