module ApplicationHelper
  def asset_bundle_tag(filename, **options)
    asset_path(webpack_manifest.fetch(filename), **options)
  end

  def javascript_bundle_tag(entry, **options)
    options = {
      src: asset_bundle_tag("#{entry}.js"),
      defer: true
    }.merge(options)

    javascript_include_tag('', **options)
  end

  # app/frontend/images/avatar.png を表示したいとき
  #   image_tag("avatar")
  #   # => <img src="/bundle/avatar" />
  #   image_tag("avatar.png")
  #   # => <img src="/bundle/avatar.png" />
  def image_bundle_tag(source, **options)
    image_tag asset_bundle_tag(File.join('images', source)), **options
  end

  private

    def webpack_manifest
      @webpack_manifest ||= JSON.load(Rails.root.join("public", "bundle", "webpack-manifest.json"))
    end
end
