<?php
// Vérifier si les données sont reçues en POST
$data = json_decode(file_get_contents("php://input"), true);

// Extraire les données
$studentName = $data['studentName'];
//$ineNumber = $data['ineNumber'];
//$dateOfBirth = $data['dateOfBirth'];
//$academicYear = $data['academicYear'];
$qrUrl = $data['qrUrl'];

// Simuler une vérification (remplacez ceci par votre logique réelle)
$validData = [
    "name" => "SOUMAILA BISSIRI",
    //"ineNumber" => "N00123820221",
    //"birthDate" => "2000-01-01",
    //"academicYear" => "2023-2024"
];

// Comparer les données
if (
    $studentName === $validData['name'] &&
    $ineNumber === $validData['ineNumber'] &&
    $dateOfBirth === $validData['birthDate'] &&
    $academicYear === $validData['academicYear']
) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false]);
}
?>
