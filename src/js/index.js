import '../sass/main.scss';

class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.selector = selector;
    this.targetDate = targetDate;

    this.refs = {
      days: document.querySelector('[data-value="days"]'),
      hours: document.querySelector('[data-value="hours"]'),
      mins: document.querySelector('[data-value="mins"]'),
      secs: document.querySelector('[data-value="secs"]'),
    };
  }

  startTimer() {
    setInterval(() => {
      const currentDate = Date.now();
      const targetDate = this.targetDate.getTime();
      const deltaTime = targetDate - currentDate;
      const time = this.getTimeComponents(deltaTime);

      this.updateTimer(time);

      if (deltaTime < 0) this.clearTimer();
    }, 1000);
  }

  getTimeComponents(time) {
    const days = Math.floor(time / (1000 * 60 * 60 * 24));
    const hours = this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

    return { days, hours, mins, secs };
  }

  clearTimer() {
    this.refs.days.textContent = '00';
    this.refs.hours.textContent = '00';
    this.refs.mins.textContent = '00';
    this.refs.secs.textContent = '00';
  }

  pad(value) {
    return String(value).padStart(2, '0');
  }

  updateTimer({ days, hours, mins, secs }) {
    this.refs.days.textContent = `${days}`;
    this.refs.hours.textContent = `${hours}`;
    this.refs.mins.textContent = `${mins}`;
    this.refs.secs.textContent = `${secs}`;
  }
}

const timer = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Sep 23, 2021'),
});

timer.startTimer();
