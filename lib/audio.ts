// lib/audio.ts

// A utility to generate premium synthetic sound feedback using the Web Audio API without needing external files.
// This ensures instant loading and no broken asset links.

export function playSuccessSound() {
    if (typeof window === "undefined") return;

    try {
        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();

        // Create oscillator
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();

        oscillator.type = "sine";

        // Premium double beep sequence (C4 -> E4)
        oscillator.frequency.setValueAtTime(523.25, audioCtx.currentTime); // C5
        oscillator.frequency.exponentialRampToValueAtTime(659.25, audioCtx.currentTime + 0.1); // E5

        // Envelope for a soft, pleasant sound
        gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.15, audioCtx.currentTime + 0.02); // Quick attack
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.3); // Smooth decay

        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.3);
    } catch (error) {
        console.warn("Audio generation failed:", error);
    }
}

export function playErrorSound() {
    if (typeof window === "undefined") return;

    try {
        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();

        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();

        oscillator.type = "triangle"; // Slightly harsher tone for error

        // Lower pitched error sound (Eb4 -> C4)
        oscillator.frequency.setValueAtTime(311.13, audioCtx.currentTime); // Eb4
        oscillator.frequency.exponentialRampToValueAtTime(261.63, audioCtx.currentTime + 0.15); // C4

        gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.2, audioCtx.currentTime + 0.05); // Attack
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.4); // Decay

        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.4);
    } catch (error) {
        console.warn("Audio generation failed:", error);
    }
}

export function playTapSound() {
    if (typeof window === "undefined") return;

    try {
        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();

        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();

        oscillator.type = "sine";

        // Extremely quick, high-pitch tiny tap
        oscillator.frequency.setValueAtTime(800, audioCtx.currentTime);

        gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.05, audioCtx.currentTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);

        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.05);
    } catch (error) {
        console.warn("Audio generation failed:", error);
    }
}
