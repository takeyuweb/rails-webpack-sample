module ApplicationHelper
  def asset_bundle_tag(entry, **options)
    asset_path(webpack_manifest.fetch(entry), **options)
  end

  def javascript_bundle_tag(entry, **options)
    options = {
      src: asset_bundle_tag("#{entry}.js"),
      defer: true
    }.merge(options)

    javascript_include_tag('', **options)
  end

  def stylesheet_bundle_tag(entry, **options)
    options = {
      href: asset_bundle_tag("#{entry}.css")
    }.merge(options)

    stylesheet_link_tag '', options
  end

  private

    def webpack_manifest
      @webpack_manifest ||= JSON.load(Rails.root.join("public", "bundle", "webpack-manifest.json"))
    end
end
