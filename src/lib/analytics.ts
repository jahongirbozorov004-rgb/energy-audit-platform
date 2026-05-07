export function calculateScore(data: any) {
  let score = 100

  if (data.peakDemandKw > 500) score -= 15
  if (data.hvacEfficiency < 70) score -= 20
  if (!data.solarInstalled) score -= 10

  return Math.max(score, 0)
}

export function co2(monthlyKwh: number) {
  return monthlyKwh * 12 * 0.42
}
