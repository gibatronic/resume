require 'bundler/setup'
require 'htmlcompressor'
require 'nokogiri'
require 'uglifier'

SCRIPT_IN = 'src/main.js'
SCRIPT_OUT = 'script.js'

STYLE_IN = 'src/main.scss'
STYLE_OUT = 'style.css'

TEMPLATE_IN = 'src/main.html'
TEMPLATE_OUT = 'index.html'

desc 'generate the template from the source'
task build: [:script, :style, :template]

task :install do
  `bourbon install --path=etc`
end

task :script do
  open SCRIPT_OUT, 'w' do |file|
    uglifier = Uglifier.new
    file.write uglifier.compile File.read SCRIPT_IN
  end
end

task :style do
  `sass --load-path etc/bourbon --no-cache --style compressed --sourcemap=none #{STYLE_IN} #{STYLE_OUT}`
end

task :template do
  open TEMPLATE_OUT, 'w' do |file|
    compressor = HtmlCompressor::Compressor.new remove_intertag_spaces: true
    template = Nokogiri::HTML File.read TEMPLATE_IN

    template.css('link[rel="stylesheet"]').each do |style|
      asset = style['href']
      content = File.read asset

      embed = Nokogiri::XML::Node.new 'style', template
      embed.content = content.strip

      style.add_next_sibling embed
      style.remove

      File.delete asset
    end

    template.css('script[src]').each do |script|
      asset = script['src']
      content = File.read asset

      script.content = content.strip
      script.remove_attribute 'src'

      File.delete asset
    end

    file.write compressor.compress template.to_html
  end
end

task :watch do
  trap 'SIGINT' do end
  `bundle exec guard`
end
