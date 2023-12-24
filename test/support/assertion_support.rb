# frozen_string_literal: true

module AssertionSupport
  module Minitest::Assertions
    def assert_picked_elements_are_same(expected, actual, pick_by = "id")
      assert_equal expected.pluck(pick_by).sort, actual.pluck(pick_by).sort
    end
  end
end
