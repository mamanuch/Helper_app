json.array!(@orders) do |order|
  json.extract! order, :status, :id,
  json.url order_url(order, format: :json)
end