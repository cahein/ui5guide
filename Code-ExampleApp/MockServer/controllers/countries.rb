# -*- coding: utf-8 -*-
require 'sinatra/base'
require 'json'

class OrderAppMockServer < Sinatra::Base
  get '/getCountries', :provides => 'json' do
    headers "Access-Control-Allow-Origin" => "http://localhost:8801"

    countries_file_path = "#{@@dataPath}/countries.json"
    countries = JSON.parse(File.read(countries_file_path))
    JSON.generate(countries)
  end
end
