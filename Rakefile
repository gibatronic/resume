require 'rubygems'
require 'bundler/setup'

require 'htmlcompressor'

STYLE_IN = 'src/main.scss'
STYLE_OUT = 'style.css'

TEMPLATE_IN = 'src/main.html'
TEMPLATE_OUT = 'index.html'

task :install do
  `bourbon install --path=etc`
end

task :style do
  `sass --load-path etc/bourbon --no-cache --style compressed --sourcemap=none #{STYLE_IN} #{STYLE_OUT}`
end

task :template do
  open TEMPLATE_OUT, 'w' do |file|
    compressor = HtmlCompressor::Compressor.new remove_intertag_spaces: true
    file.write compressor.compress File.read TEMPLATE_IN
  end
end
