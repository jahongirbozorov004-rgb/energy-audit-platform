import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const body = await req.json()

  const {
    monthlyKwh,
    peakDemandKw,
    employees,
    workingHours,
    solarInstalled,
    hvacEfficiency,
    machineCount,
  } = body

  let score = 100

  if (peakDemandKw > 500) score -= 15
  if (hvacEfficiency < 70) score -= 20
  if (!solarInstalled) score -= 10

  const co2 = monthlyKwh * 12 * 0.42

  const recommendations = []

  if (peakDemandKw > 500)
    recommendations.push('Reduce peak electricity usage')

  if (hvacEfficiency < 70)
    recommendations.push('Upgrade HVAC system')

  if (!solarInstalled)
    recommendations.push('Install solar panels')

  if (machineCount > 15)
    recommendations.push('Optimize machine load distribution')

  return NextResponse.json({
    audit: {
      efficiencyScore: score,
      co2Emission: co2.toFixed(2),
      riskLevel: score < 60 ? 'HIGH' : 'MEDIUM',
      recommendations,
    },
  })
      }
