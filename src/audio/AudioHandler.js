let instance = null;

class _AudioHandler {
  #sounds;

  constructor() {
    if (instance) throw new Error("AudioHandler singleton reconstructed");

    this.#sounds = [];

    instance = this;
  }

  /**
   * @brief Load a sound
   *
   * @param {String} audioID  - ID to assign to the sound
   * @param {String} filename - Name of the sound file
   */
  load(audioID, filename) {
    return new Promise((res, rej) => {
      // Reassign the audioID if it already exists
      if (this.#sounds[audioID]) this.#sounds[audioID] = null;

      this.#sounds[audioID] = new Audio();
      this.#sounds[audioID].onloadstart = () => res(`${filename} loaded`);
      this.#sounds[audioID].onerror = () => rej(`Failed to load ${filename}`);
      this.#sounds[audioID].src = `res/snd/${filename}`;

      this.#sounds[audioID].volume = 1;
      this.#sounds[audioID].preservesPitch = false;
    });
  }

  // Basic audio controls
  /**
   * @brief Plays a sound
   *
   * @param {String} audioID - ID of audio file to play
   */
  play(audioID) {
    this.stop(audioID);
    this.#sounds[audioID].play();
  }

  /**
   * @brief Plays a looped sound
   *
   * @param {String} audioID - ID of audio file to play
   */
  playMusic(audioID) {
    if (!this.#sounds[audioID].loop)
      this.#sounds[audioID].loop = true;

    this.play(audioID);
  }

  /**
   * @brief Pauses a sound
   *
   * @param {String} audioID - ID of audio file to pause
   */
  pause(audioID) {
    this.#sounds[audioID].pause();
  }

  /**
   * @brief Resumes a paused sound
   *
   * @param {String} audioID - ID of audio file to resume
   */
  resume(audioID) {
    this.#sounds[audioID].play();
  }

  /**
   * @brief Stops a sound
   *
   * @param {String} audioID - ID of audio file to stop
   */
  stop(audioID) {
    this.#sounds[audioID].pause();
    this.#sounds[audioID].currentTime = 0;
  }

  /**
   * @brief Sets the gain level of a sound
   *
   * @param {String} audioID - ID of the audio file
   * @param {Number} volume  - Gain level of audio. 0 to 1 inclusive
   */
  setVolume(audioID, volume) {
    this.#sounds[audioID].volume = volume;
  }

  /**
   * @brief Get the gain level of a sound
   *
   * @param {String} audioID - ID of the audio file
   *
   * @returns Gain level of the sound
   */
  getVolume(audioID) {
    return this.#sounds[audioID].volume;
  }

  /**
   * @brief Sets the speed of a sound
   *
   * @param {String} audioID - ID of the audio file
   * @param {*} rate - Rate at which to play the sound\
   *                   rate < 1.0: slow\
   *                   rate = 1.0: normal\
   *                   rate > 1.0: fast
   */
  setPlaybackRate(audioID, rate) {
    this.#sounds[audioID].playbackRate = rate;
  }

  /**
   * @brief Get the playback rate of the sound
   *
   * @param {String} audioID - ID of the audio file
   *
   * @returns Playback rate of the sound
   */
  getPlaybackRate(audioID) {
    return this.#sounds[audioID].playbackRate;
  }

  /**
   * @brief Sets to preserve the pitch when the sound is sped up
   *
   * @param {String} audioID - ID of the audio file
   * @param {Boolean} preserve - true: preserve pitch\
   *                             false: don't preserve pitch
   */
  setPreservePitch(audioID, preserve) {
    this.#sounds[audioID].preservesPitch = preserve;
  }

  /**
   * @brief Gets if the sound's pitch is preserved
   *
   * @param {String} audioID - ID of the audio file
   *
   * @returns true if pitch is preserved; false otherwise
   */
  isPitchPreserved(audioID) {
    return this.#sounds[audioID].preservesPitch;
  }

  /**
   * @brief Tells if the sound is in a muted state
   *
   * @param {String} audioID - ID of the audio file
   *
   * @returns true if the sound is muted; false otherwise
   */
  isMuted(audioID) {
    return this.#sounds[audioID].muted;
  }

  /**
   * @brief Tells if the sound is in a paused state
   *
   * @param {String} audioID - ID of the audio file
   *
   * @returns true if the sound is paused; false otherwise
   */
  isPaused(audioID) {
    return this.#sounds[audioID].paused;
  }

  /**
   * @brief Tells if the sound has finished playing
   *
   * @param {String} audioID - ID of the audio file
   *
   * @returns true if the sound has finished playing; false otherwise
   */
  hasEnded(audioID) {
    return this.#sounds[audioID].ended;
  }

  /**
   * @brief Tells if the sound is looping
   *
   * @param {String} audioID - ID of the audio file
   *
   * @returns true if the sound is set to loop; false otherwise
   */
  isLooping(audioID) {
    return this.#sounds[audioID].loop;
  }
};

const AudioHandler = new _AudioHandler;
export default AudioHandler;