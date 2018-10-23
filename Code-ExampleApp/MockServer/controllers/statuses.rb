# -*- coding: utf-8 -*-
require 'sinatra/base'
require 'json'

class OrderAppMockServer < Sinatra::Base
  get '/getStatuses', :provides => 'json' do
    headers "Access-Control-Allow-Origin" => "http://localhost:8801"

    statuses_file_path = "#{@@dataPath}/statuses.json"
    statuses = JSON.parse(File.read(statuses_file_path))
    JSON.generate(statuses)
  end
end
