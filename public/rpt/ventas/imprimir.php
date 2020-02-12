<?php
require_once '../../vendor/setasign/fpdf/fpdf.php';
require_once '../../src/Conexion.php';

class PDF extends FPDF
{
    public $id_venta_cabecera = "";
    public $fiscal_venta_cabecera = "";
    public $emision_venta_cabecera = "";
    public $id_cliente = "";
    public $nombre_cliente = "";
    public $total_venta_cabecera = 0;

    function Header()
    {
        $this->SetFont('Arial','B',15);
        $this->Cell(1);
        $this->Cell(20,10,utf8_decode($this->id_venta_cabecera),0,0);
        $this->Cell(50,10,utf8_decode($this->fiscal_venta_cabecera),0,0);
        $this->Cell(20,10,utf8_decode($this->emision_venta_cabecera),0,1);
        $this->Cell(10,10,utf8_decode($this->id_cliente),0,0);
        $this->Cell(30,10,utf8_decode($this->nombre_cliente),0,0);
        $this->Ln(20);
    }

    function Footer()
    {
        $this->SetY(-15);
        $this->SetFont('Arial','I',8);
        $this->Cell(20,10,utf8_decode($this->total_venta_cabecera),0,0);
    }
}

$id_venta_cabecera = 2;
$conexion = new Conexion();
$pgsql  =  $conexion->conectar();

$pdf = new PDF();

// Cabecera
            
$sql = "SELECT * FROM ventas_cabeceras vc ".
       "LEFT JOIN clientes c on vc.id_cliente = c.id_cliente ".
       "WHERE id_venta_cabecera = :id_venta_cabecera";
$stmt = $pgsql->prepare($sql); 
$stmt->bindParam(':id_venta_cabecera', $id_venta_cabecera); 
if ($stmt->execute()) { 
    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
    foreach ($data as $row) {
        $pdf->id_venta_cabecera = $row['id_venta_cabecera'];
        $pdf->fiscal_venta_cabecera = $row['fiscal_venta_cabecera'];
        $pdf->emision_venta_cabecera = $row['emision_venta_cabecera'];
        $pdf->id_cliente = $row['id_cliente'];
        $pdf->nombre_cliente = $row['nombre_cliente'];
     }
} else {
    $pdf->Cell(0,10,utf8_decode('No existen registros...'),0,1);
}


$pdf->AliasNbPages();
$pdf->AddPage();
$pdf->SetFont('Times','',12);

// Detalle            
$sql = "SELECT * FROM ventas_detalles vd ".
       "LEFT JOIN productos p on vd.id_producto = p.id_producto ".
       "WHERE id_venta_cabecera = :id_venta_cabecera";
$stmt = $pgsql->prepare($sql); 
$stmt->bindParam(':id_venta_cabecera', $id_venta_cabecera); 
            
if ($stmt->execute()) { 
    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $total = 0;
    foreach ($data as $row) {
        $sub_total = $row['cantidad_venta_detalle']*$row['precio_venta_detalle'];
        $pdf->Cell(10,10,utf8_decode($row['id_producto']),0,0);
        $pdf->Cell(50,10,utf8_decode($row['nombre_producto']),0,0);
        $pdf->Cell(20,10,utf8_decode($row['cantidad_venta_detalle']),0,0);
        $pdf->Cell(20,10,utf8_decode($row['precio_venta_detalle']),0,0);
        $pdf->Cell(20,10,utf8_decode($sub_total),0,1);
        $total += $sub_total;
     }
     $pdf->total_venta_cabecera = $total;
} else {
    $pdf->Cell(0,10,utf8_decode('No existen registros...'),0,1);
}

$pdf->Output();

?>