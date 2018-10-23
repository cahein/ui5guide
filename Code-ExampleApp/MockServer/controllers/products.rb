# -*- coding: utf-8 -*-
require 'sinatra/base'
require 'json'

class OrderAppMockServer < Sinatra::Base
  get '/queryProducts', :provides => 'json' do
    headers "Access-Control-Allow-Origin" => "http://localhost:8801"
    queryString = params[:query]
    
    products = getProductsByString(queryString)
    response = Hash.new
    response["result"] = true
    response["value"] = products
    JSON.generate(response)
  end
  
  post '/getProducts', :provides => 'json' do
    headers "Access-Control-Allow-Origin" => "http://localhost:8801"

    isbns = params[:isbns]
    @@logger.info "query products with isbns =#{isbns}"
    products = getProductsByIds(isbns.split(","))
    response = Hash.new
    response["result"] = true
    response["value"] = products
    JSON.generate(response)
  end

  private
  def getProductsByString(query)
    products_file_path = "#{@@dataPath}/products.json"
    products = JSON.parse(File.read(products_file_path))

    matchingProducts = Array.new
    products.each{ | product |
      isbn = product["isbn"]
      if isbn.index(query) != nil
        matchingProducts << product
        next
      end
      author = product["author"]
      if author.index(query) != nil
        matchingProducts << product
        next
      end
      
      title = product["title"]
      if title["a"].index(query) != nil
        matchingProducts << product
        next
      end
      if title["b"].index(query) != nil
        matchingProducts << product
        next
      end
    }
    matchingProducts
  end
  
  def getProductsByIds(isbns)
    if @@productMap == nil
      generateProductMap
    end
    products = Array.new
    isbns.each{ | isbn |
      products << @@productMap[isbn]
    }
    products
  end

  def generateProductMap
    @@logger.info "have to read products.json"
    @@productMap = Hash.new
    products_file_path = "#{@@dataPath}/products.json"
    products = JSON.parse(File.read(products_file_path))

    products.each{ | product |
      isbn = product["isbn"]
      @@productMap[isbn] = product
    }
  end
end
