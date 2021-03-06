// Match inclinations with target by planning a burn at the ascending or
// descending node, whichever comes first.

// Desired orbital inclination
parameter target_inclination is ship:orbit:inclination.

local position is ship:position-ship:body:position.
local velocity is ship:velocity:orbit.
local ang_vel is 4 * ship:obt:inclination / ship:obt:period.

local equatorial_position is V(position:x, 0, position:z).
local angle_to_equator is vang(position,equatorial_position).

if position:y > 0 {
  if velocity:y > 0 {
    // above & traveling away from equator; need to rise to inc, then fall back to 0
    set angle_to_equator to 2 * ship:obt:inclination - abs(angle_to_equator).
  }
} else {
  if velocity:y < 0 {
    // below & traveling away from the equator; need to fall to inc, then rise back to 0
    set angle_to_equator to 2 * ship:obt:inclination - abs(angle_to_equator).
  }
}

local frac is (angle_to_equator / (4 * ship:obt:inclination)).
local dt is frac * ship:obt:period.
local t is time + dt.

set nd to node(t:seconds, 0, 0, 0).
add nd.