function goSearching () {
    basic.showString("S")
    maqueen.MotorRun(maqueen.aMotors.M1, maqueen.Dir.CW, 150)
    maqueen.MotorRun(maqueen.aMotors.M2, maqueen.Dir.CCW, 150)
    counter = 0
    searching = true
    basic.pause(500)
    while (searching) {
        distance = maqueen.sensor(PingUnit.Centimeters)
        if (distance > 0 && distance < 950) {
            maqueen.motorStopAll()
            maqueen.MotorRun(maqueen.aMotors.M1, maqueen.Dir.CCW, 100)
            basic.pause(200)
            maqueen.motorStop(maqueen.aMotors.M1)
            found = true
            searching = false
        }
        if (counter > 50) {
            maqueen.motorStopAll()
            found = false
            searching = false
        }
        counter += 1
    }
}
function goDance () {
    basic.showIcon(IconNames.Yes)
    maqueen.MotorRun(maqueen.aMotors.M1, maqueen.Dir.CCW, 255)
    maqueen.MotorRun(maqueen.aMotors.M2, maqueen.Dir.CW, 255)
    music.playTone(262, music.beat(BeatFraction.Eighth))
    basic.pause(100)
    music.playTone(262, music.beat(BeatFraction.Half))
    basic.pause(500)
    maqueen.motorStopAll()
}
function goBack () {
    basic.showString("B")
    maqueen.MotorRun(maqueen.aMotors.M1, maqueen.Dir.CCW, 255)
    maqueen.MotorRun(maqueen.aMotors.M2, maqueen.Dir.CCW, 255)
    basic.pause(2000)
    maqueen.motorStopAll()
}
function goPush () {
    basic.showString("P")
    maqueen.MotorRun(maqueen.aMotors.M1, maqueen.Dir.CW, 255)
    maqueen.MotorRun(maqueen.aMotors.M2, maqueen.Dir.CW, 255)
    pushing = true
    while (pushing) {
        if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 0 || maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 0) {
            maqueen.motorStopAll()
            pushing = false
        }
    }
}
let pushing = false
let distance = 0
let searching = false
let counter = 0
let found = false
let active = true
while (active) {
    found = false
    goSearching()
    if (found) {
        goPush()
        goBack()
    } else {
        active = false
    }
}
goDance()
