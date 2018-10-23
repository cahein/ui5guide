$LOAD_PATH << '.'

require 'rubygems'
require 'sinatra/base'
require 'logger'

require 'controllers/orders'
require 'controllers/addresses'
require 'controllers/products'
require 'controllers/statuses'
require 'controllers/countries'


class OrderAppMockServer < Sinatra::Base
  set :root, File.dirname(__FILE__)
  @@dataPath = "#{root}/data/"

  set :titel, "UI5 User Manual: Example Application MockServer"
  set :environment, "development"
  set :port, 3000


  # logging
  class ::Logger; alias_method :write, :<<; end
  @@logger = Logger.new(File.join(root, 'logs/debug.log'))
  use Rack::CommonLogger, @@logger

  @@productMap = nil
  @@addressMap = nil

  # routes
  get '/', :provides => 'html' do
    erb :index
  end

  run! if __FILE__ == $0
end
