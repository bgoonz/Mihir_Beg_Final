# MIDI Synth

This application is a analog synthesizer simulation built on the [Web Audio API](https://webaudio.github.io/web-audio-api/).  It is very loosely based on the architecture of a [Moog Prodigy](http://www.vintagesynth.com/moog/prodigy.php) synthesizer, although this is a polyphonic synthesizer, and it lacks the oscillator sync and glide effects of the Prodigy.  (AKA: this is not intended to be a replication of the Prodigy, so pleased don't tell me how crappy a reproduction it is! :)

  The polyfill uses Java to access the MIDI device, so if you're wondering why Java is loading, that's why.  It may take a few seconds for MIDI to become active - the library takes a while to load - but when the ring turns gray (instead of blue), it's ready.  If you have a native implementation of the Web MIDI API in your browser, the polyfill shouldn't load - at the time of this writing, Chrome Stable (from version 43) has the only such implementation. Earlier versions of Chrome (from version 33) can enable Web MIDI via chrome://flags/#enable-web-midi


Check it out, feel free to fork, submit pull requests, etc.


