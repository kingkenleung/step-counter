let x_fluctuation = [0, 0]
let y_fluctuation = [0, 0]
let z_fluctuation = [0, 0]
let step_count = 0
let show_step = false
let running = false

input.onButtonPressed(Button.AB, () => {
    show_step = true

    step_count = 0
    basic.showNumber(step_count)
    basic.clearScreen()
    music.playTone(Note.C, 300)
    basic.pause(100)
    music.playTone(Note.C, 300)
    basic.pause(100)
    music.playTone(Note.C, 300)
    basic.pause(100)
    music.playTone(Note.F, 500)

    running = true
    show_step = false

    basic.pause(30000)
    music.playTone(Note.C, 1000)

    running = false
})

input.onButtonPressed(Button.B, () => {
    show_step = true
    basic.showNumber(Math.floor(step_count))
    basic.clearScreen()
    show_step = false
})

function isStep(fluctuation: number[]): boolean {
    if (fluctuation[0] - fluctuation[1] > 1500) {
        fluctuation[0] = 0
        fluctuation[1] = 0
        // basic.showIcon(IconNames.Heart)
        // basic.clearScreen()
        return true
    }
    return false
}

basic.forever(() => {
    let x = input.acceleration(Dimension.X)
    let y = input.acceleration(Dimension.Y)
    let z = input.acceleration(Dimension.Z)
    // serial.writeValue("x", x)
    // serial.writeValue("y", y)
    // serial.writeValue("z", z)
    if (!show_step) {
        led.plotBarGraph(x, 0)
    }

    serial.writeValue("Step Count", step_count)

    if (x > x_fluctuation[0]) {
        x_fluctuation[0] = x
    }

    if (y > y_fluctuation[0]) {
        y_fluctuation[0] = y
    }

    if (z > z_fluctuation[0]) {
        z_fluctuation[0] = z
    }

    if (x < x_fluctuation[1]) {
        x_fluctuation[1] = x
    }

    if (y > y_fluctuation[1]) {
        y_fluctuation[1] = y
    }

    if (z > z_fluctuation[1]) {
        z_fluctuation[1] = z
    }

    if (running && isStep(x_fluctuation)) {
        step_count += 0.5
        basic.pause(100)
    }

})
