# -*- coding: utf-8 -*-
require 'sinatra/base'
require 'json'

class OrderAppMockServer < Sinatra::Base
  post '/getAddresses', :provides => 'json' do
    headers "Access-Control-Allow-Origin" => "http://localhost:8801"

    ids = params[:ids]
    @@logger.info "query addresses with ids =#{ids}"
    addresses = getAddressesByIds(ids.split(","))
    response = Hash.new
    response["result"] = true
    response["value"] = addresses
    JSON.generate(response)
  end

  get '/queryAddresses', :provides => 'json' do
    headers "Access-Control-Allow-Origin" => "http://localhost:8801"
    queryString = params[:query]
    matchType = params[:matchType]

    addresses = getAddressesByString(queryString, matchType)
    response = Hash.new
    response["result"] = true
    response["value"] = addresses
    JSON.generate(response)
  end

  post '/saveAddress', :provides => 'json' do
    headers "Access-Control-Allow-Origin" => "http://localhost:8801"

    addressString = params[:addressString]
    @@logger.info "save address #{addressString}"
    address = JSON.parse(addressString)

    if !address["id"]
      address["id"] = @@nextAddressId
      @@logger.info "new address id: #{@@nextAddressId}"
      @@nextAddressId = @@nextAddressId + 1
    end

    response = Hash.new
    response["result"] = true
    response["value"] = address
    JSON.generate(response)
  end

  post '/getAddress', :provides => 'json' do
    headers "Access-Control-Allow-Origin" => "http://localhost:8801"
    id = params[:id]
    idArray = [ id ]

    addresses = getAddressesByIds(idArray)
    JSON.generate(addresses.first)
  end

  private
  def getAddressesByString(query, matchType)
    addresses_file_path = "#{@@dataPath}/addresses.json"
    addresses = JSON.parse(File.read(addresses_file_path))

    matchingAddresses = Array.new
    addresses.each{ | address |
      lastName = address["lastname"]
      if matchType && matchType == "EQ"
        if lastName == query
          matchingAddresses << address
          next
        end
      else
        if lastName.index(query) != nil
          matchingAddresses << address
          next
        end
      end
    }
    matchingAddresses
  end

  def getAddressesByIds(ids)
    if @@addressMap == nil
      generateAddressMap
    end

    addresses = Array.new
    ids.each{ | id |
      addresses << @@addressMap[Integer(id)]
    }
    addresses
  end

  def generateAddressMap
    @@logger.info "have to read addresses.json"
    @@nextAddressId = 0
    @@addressMap = Hash.new
    addresses_file_path = "#{@@dataPath}/addresses.json"
    addresses = JSON.parse(File.read(addresses_file_path))
    addresses.each{ | address |
      addressId = address["id"]
      @@addressMap[addressId] = address
      if addressId > @@nextAddressId
        @@nextAddressId = addressId + 1
      end
    }
  end
end
