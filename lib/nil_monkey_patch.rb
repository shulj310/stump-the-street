# Monkey patch nil for Intrinio::Realtime gem leave function (error in line 70)
class NilClass
  def empty?
    true
  end
end
