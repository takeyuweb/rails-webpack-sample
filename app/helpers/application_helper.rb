module ApplicationHelper
  def javascript_bundle_tag(entry, **options)
    path = asset_path(webpack_manifest.fetch("#{entry}.js"), **options)

    options = {
      src: path,
      defer: true
    }.merge(options)

    javascript_include_tag('', **options)
  end

  private

    def webpack_manifest
      @webpack_manifest ||= JSON.load(Rails.root.join("public", "bundle", "webpack-manifest.json"))
    end
end
