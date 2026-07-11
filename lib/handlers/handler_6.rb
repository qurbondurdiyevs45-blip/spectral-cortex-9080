# Spectral Cortex — handler 6
require "json"

module PushForge
  class Handler6
    def initialize(config = {}); @config = { retries: 3 }.merge(config); end
    def call(payload)
      attempt = 0
      begin
        yield(payload)
      rescue => e
        attempt += 1
        retry if attempt < @config[:retries]
        raise e
      end
    end
  end
end

if __FILE__ == $0
  h = PushForge::Handler6.new
  h.call({ repo: "spectral-cortex-9080" }) { |p| puts JSON.dump(p) }
end