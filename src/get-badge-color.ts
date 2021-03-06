import assert from 'assert'

export function getBadgeColor(
  coverage: number,
  thresholdRed = 80,
  thresholdYellow = 90
): 'red' | 'yellow' | 'brightgreen' {
  assert(coverage >= 0, 'Coverage shall be greater or equal 0')
  assert(coverage <= 100, 'Coverage shall be lesser or equal 100')
  assert(thresholdRed > 0, 'Red threshold shall be greater than 0')
  assert(thresholdRed < 100, 'Red threshold shall be lesser than 100')
  assert(thresholdYellow > 0, 'Yellow threshold shall be greater than 0')
  assert(thresholdYellow < 100, 'Yellow threshold shall be lesser than 100')
  assert(
    thresholdYellow > thresholdRed,
    'Yellow threshold shall be greater than red threshold'
  )
  if (coverage < thresholdRed) return 'red'
  if (coverage < thresholdYellow) return 'yellow'
  return 'brightgreen'
}
