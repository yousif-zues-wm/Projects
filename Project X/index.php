
<?php


function Luhn($number, $iterations)
{
    while ($iterations-- >= 1)
    {
        $stack = 0;
        $number = str_split(strrev($number), 1);

        foreach ($number as $key => $value)
        {
                if ($key % 2 == 0)
                {
                        $value = array_sum(str_split($value * 2, 1));
                }

                $stack += $value;
        }

        $stack %= 10;

        if ($stack != 0)
        {
                $stack -= 10;
        }

        $number = implode('', array_reverse($number)) . abs($stack);
    }

    return $number;
}

$orgin = "627668730839";
$last = "358";
?>
INSERT INTO `cards` (`card_number`, `pin_number`, `success`, `proccessing`, `current_pin`, `balance`) VALUES
<?php
for ($x = 0; $x <= 40; $x++) {

    echo "('" . Luhn($orgin . $last, 1) . "', '0', 0, 0, '0', '')," . "</br>";
    $last -= 1;
}

?>
