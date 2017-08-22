require 'csv'
require 'pry'
require 'json'

name_to_tag = {}
tag_to_name = {}

CSV.foreach('./lib/tasks/initioTags.csv') do |row|
  name_to_tag[row[0]] = row[1]
  tag_to_name[row[1]] = row[0]
end

File.open("./app/controllers/api/v1/utils/initioTags_to_name.json","w") do |f|
  f.write(tag_to_name.to_json)
end

File.open("./app/controllers/api/v1/utils/initioNames_to_tag.json","w") do |f|
  f.write(name_to_tag.to_json)
end
