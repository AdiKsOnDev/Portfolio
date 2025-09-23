/**
 * Convert a number to Greek letter (cycling through uppercase Greek alphabet)
 * 
 * Maps numbers to a curated selection of recognizable Greek letters.
 * The order is designed for visual appeal and cultural authenticity.
 */
export function getGreekLetter(num: number): string {
  const greekLetters = [
    'Ω', // Omega - last letter, represents completion/excellence
    'Λ', // Lambda - represents logic and function
    'Σ', // Sigma - represents summation, totality
    'Δ', // Delta - represents change, difference
    'Π', // Pi - mathematical constant, precision
    'Φ', // Phi - golden ratio, beauty
    'Ψ', // Psi - represents mind, psychology
    'Θ', // Theta - represents angles, perspective
    'Ξ', // Xi - represents unknown variables
    'Υ', // Upsilon - represents choice, fork
    'Μ', // Mu - represents micro, precision
    'Ν', // Nu - represents new, innovation
    'Β', // Beta - represents testing, iteration
    'Γ', // Gamma - represents mathematical functions
    'Ζ', // Zeta - represents mathematical analysis
    'Η', // Eta - represents efficiency
    'Κ', // Kappa - represents curvature
    'Ρ', // Rho - represents density, concentration
    'Τ', // Tau - represents time constant
    'Χ'  // Chi - represents distribution, spread
  ]
  
  // Ensure we get a valid index (1-based numbering)
  const index = ((num - 1) % greekLetters.length + greekLetters.length) % greekLetters.length
  return greekLetters[index] || 'Ω'
}