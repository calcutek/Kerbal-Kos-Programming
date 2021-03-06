WHEN STAGE:LIQUIDFUEL < 0.1 THEN {
    STAGE.
    PRESERVE.
}

SET thrott TO 1.
SET dthrott TO 0.
LOCK THROTTLE TO thrott.
LOCK STEERING TO R(0,0,-90) + HEADING(90,90).
STAGE.

WHEN SHIP:ALTITUDE > 1000 THEN {
	SET g TO KERBIN:MU / KERBIN:RADIUS^2.
	LOCK accvec TO SHIP:SENSORS:ACC - SHIP:SENSORS:GRAV.
	// ACCELLERATION VELOCITY? IS EQUAL TO ACCELLERATION - GRAVITY?
	LOCK gforce TO accvec:MAG / g.
	LOCK dthrott TO 0.05 * (1.2 - gforce).

	WHEN SHIP:ALTITUDE > 10000 THEN {
		LOCK dthrott TO 0.05 * (2.0 - gforce).

		WHEN SHIP:ALTITUDE > 20000 THEN { 
			LOCK dthrott TO 0.05 * (4.0 - gforce).

			WHEN SHIP:ALTITUDE > 30000 THEN {
				LOCK dthrott TO 0.05 * (5.0 - gforce).
			}
		}
	}
}

WHEN SHIP:ALTITUDE >10000 THEN {
	PRINT "STARTING TURN. AIMING EAST TO 45 DEGREE PITCH.".
	LOCK STEERING TO HEADING(90, 45). //eAST 45 DEGREES PITCH
}

UNTIL SHIP:ALTITUDE > 40000 {
	SET thrott to thrott + dthrott.
	WAIT 0.1.
}

WHEN SHIP:ALTITUDE > 40000 THEN {
	PRINT "ENDING GRAVITY TURN - BURNING TO HORIZON".
	LOCK STEERING TO HEADING(90, 0).
}

WAIT UNTIL SHIP:ALTITUDE > 70000. //WAIT UNTIL SHIUP IS HIGH UP


