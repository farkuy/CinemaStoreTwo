export function еimerEqualizer(min) {
    let h = `${Math.floor(min / 60)}`;
    let mm = min - (h * 60);
    mm = String(mm)
    if (h.length === 1) {
        h = `0${h}`;
    };
    if (mm.length === 1) {
        mm = `0${mm}`;
    }
    return `${h}:${mm}`
}