

class DataLabel

  def initialize(ticker,company)
    @company = company
    @ticker = ticker
    @sic = ""
    @stock = []
    @tag_to_name = JSON.parse(File.read('./app/controllers/api/v1/utils/initioTags_to_name.json'))
    @name_to_tag = JSON.parse(File.read('./app/controllers/api/v1/utils/initioNames_to_tag.json'))

  end

  def output
    data = @company["data"].map {|data| {@tag_to_name[data.values[1]]=>[data.values[2]]}}
    @stock = {@ticker=>data}
    # self.comps
    return @stock
  end

  def comps
    username = ENV["INTRINIO_USERNAME"]
    password = ENV["INTRINIO_PASSWORD"]

    request_url = "https://api.intrinio.com/data_point?identifier=$SIC.#{@sic}&item=#{TAGS}"

    restclient = RestClient::Resource.new(request_url,username,password)

    response = restclient.get

    industry = JSON.parse(response)

    data = industry["data"].map {|data| {@tag_to_name[data.values[1]]=>data.values[2]}}

    @stock = data.map do |comp|
      {comp.keys[0]=>@stock[@ticker].select {|key| key.keys[0]==comp.keys[0]}[0].values[0].push(comp.values[0])}
    end

    return {@ticker=>@stock}

  end

  def header
    data = @company["data"].map {|data| {@tag_to_name[data.values[1]]=>data.values[2]}}
    @stock = {@ticker=>data}
    return @stock
  end


end
