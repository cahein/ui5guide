# -*- coding: utf-8 -*-
require 'sinatra/base'
require 'json'
require 'time'

class OrderAppMockServer < Sinatra::Base
  get '/getOrders', :provides => 'json' do
    headers "Access-Control-Allow-Origin" => "http://localhost:8801"

    startDateStr = params[:startDate]
    endDateStr = params[:endDate]
    statuses = params[:statuses]

    @@logger.info "query orders with startDate =#{startDateStr}"
    @@logger.info "query orders with endDate =#{endDateStr}"
    @@logger.info "query orders with statuses =#{statuses}"

    filteredOrders = filterOrders(startDateStr, endDateStr, statuses);

    response = Hash.new
    response["result"] = true
    response["value"] = filteredOrders
    JSON.generate(response)
  end

  get '/getOrder', :provides => 'json' do
    headers "Access-Control-Allow-Origin" => "http://localhost:8801"
    orderId = params[:id]
    if !orderId.match(/^\d+$/)
      orderId = nil
    end

    @@logger.info "get order with id =#{orderId}"

    response = Hash.new

    order = nil
    if orderId != nil
      order = getOrder(orderId)

      if order == nil
        response["result"] = false
        response["reason"] = "not found"
      else
        response["result"] = true
        response["value"] = order
      end
    else
      response["result"] = false
      response["reason"] = "no ID given"
    end

    JSON.generate(response)
  end

  post '/saveOrder', :provides => 'json' do
    headers "Access-Control-Allow-Origin" => "http://localhost:8801"

    if !defined? @@nextOrderId
      @@nextOrderId = 1011
    end

    orderString = params[:orderString]
    @@logger.info "save order #{orderString}"
    order = JSON.parse(orderString)

    if !order["id"]
      order["id"] = @@nextOrderId
      @@logger.info "new order id: #{@@nextOrderId}"
      @@nextOrderId = @@nextOrderId + 1
    end

    response = Hash.new
    response["result"] = true
    response["value"] = order
    JSON.generate(response)
  end

  private
  def getOrder(orderId)
    orders_file_path = "#{@@dataPath}/orders.json"
    orders = JSON.parse(File.read(orders_file_path))

    orderData = nil
    orders.each{ | order |
      if order["id"] == Integer(orderId)
        orderData = order
        break
      end
    }
    orderData
  end

  def filterOrders(startDateStr, endDateStr, statusParam)
    orders_file_path = "#{@@dataPath}/orders.json"
    orders = JSON.parse(File.read(orders_file_path))

    startDate = Time.parse startDateStr
    endDate = nil
    statuses = nil
    if endDateStr
      endDate = Time.parse endDateStr
    end
    if statusParam
      statuses = statusParam.split ","
    end

    filteredOrders = Array.new
    orders.each{ | order |
      orderDate = Time.parse order["orderDate"]
      if orderDate < startDate
        next
      end

      if endDate != nil && orderDate > endDate
        next
      end

      if statuses != nil && !(statuses.include? order["status"])
        next
      end

      filteredOrders << order
    }
    filteredOrders
  end
end
