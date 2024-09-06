// Simple Additive Weighting (SAW) method
const calculatePerformanceScore = ({performances, criterion}) => {
  // Normalisasi matriks keputusan
  const normalizedMatrix = performances.map((emp) => {
    const normalizedValues = emp.scores.map((scoreObj) => {
      // Cari kriteria yang sesuai dengan criterionId dari scores
      const criteria = criterion.find((c) => c.id === scoreObj.criterionId);
      const maxValue = Math.max(
        ...performances.map(
          (e) =>
            e.scores.find((s) => s.criterionId === scoreObj.criterionId)
              ?.score || 0
        )
      );
      // Normalisasi nilai (avoid division by zero)
      const normalizedValue = maxValue === 0 ? 0 : scoreObj.score / maxValue;
      return {
        criterionId: scoreObj.criterionId,
        normalizedValue: normalizedValue,
        weight: criteria ? criteria.weight : 0, // Jika kriteria ditemukan, ambil weight
      };
    });

    return {employeeId: emp.employeeId, values: normalizedValues};
  });

  // Hitung skor akhir dengan perkalian nilai normalisasi dan bobot
  const scores = normalizedMatrix.map((emp) => {
    const finalScore = emp.values.reduce((acc, valueObj) => {
      return acc + valueObj.normalizedValue * valueObj.weight;
    }, 0);

    return {employeeId: emp.employeeId, finalScore};
  });

  // Sortir berdasarkan skor tertinggi
  scores.sort((a, b) => b.finalScore - a.finalScore);

  return scores;
};

module.exports = {calculatePerformanceScore};
