require 'bundler/setup'
require 'htmlcompressor'
require 'nokogiri'
require 'sass'
require 'uglifier'

TEMPLATE_IN = 'src/main.html'
TEMPLATE_OUT = 'index.html'

task :install do
  `bourbon install --path=etc`
end

desc 'generate the template from the source'
task :build do
  open TEMPLATE_OUT, 'w' do |file|
    compressor = HtmlCompressor::Compressor.new remove_intertag_spaces: true
    scripts = ''
    styles = ''
    template = Nokogiri::HTML File.read TEMPLATE_IN

    template.css('link[rel="stylesheet"]').each do |style|
      asset = style['href']
      content = File.read asset
      styles << content.strip
      style.remove
    end

    unless styles.empty?
      options = {
        cache: false,
        load_paths: ['.', 'etc/bourbon'],
        sourcemap: false,
        style: :compressed,
        syntax: :scss
      }

      embed = Nokogiri::XML::Node.new 'style', template
      sass = Sass::Engine.new styles, options

      embed.content = sass.render.strip
      template.at_css('head').add_child embed
    end

    template.css('script[src]').each do |script|
      asset = script['src']
      content = File.read asset
      scripts << content.strip
      script.remove
    end

    unless scripts.empty?
      options = {
        comments: :none
      }

      embed = Nokogiri::XML::Node.new 'script', template
      embed.content = Uglifier.compile(scripts, options).strip
      template.at_css('body').add_child embed
    end

    file.write compressor.compress template.to_html
  end
end

task :watch do
  trap 'SIGINT' do end
  `bundle exec guard`
end
