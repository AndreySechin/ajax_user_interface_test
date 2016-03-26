class UrlController < ApplicationController
  def index
    @urls = Url.all
    gon.push({
                 mass: @urls.pluck('url')
             })
  end

  def add_to_db
    urls = params[:url]
    urls.each do |url|
      url_create = Url.create(url: url)
      @errors = url_create.errors.full_messages
    end
    # @urls = Url.all
    # gon.push({
    #              mass: @urls.pluck('url')
    #          })
  end

end

