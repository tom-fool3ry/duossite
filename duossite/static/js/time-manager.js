let timeManager = {
    answerMap : {true: 'yes', false: 'no'},
    iconPaths : {true: '/static/media/images/yes.svg', false: '/static/media/images/no.svg'},
    intervalSize : 5,
    startTimeStr : "2024-12-31T17:00:00Z",
    startTime : null,
    timeLeftClass : 'time-left',

    init : function() {
        this.startTime = new Date(this.startTimeStr);
        this.set_timer();
    },
    set_timer() {
        let self = this;
        let prevAnswer = null;
        setInterval(() => {
            let currentTime = new Date();
            let isOn = (Math.floor((Math.abs(self.startTime - currentTime) / 36e5)/self.intervalSize) % 2 ) == 0;
            // isOn = true;
    
            self.update_timer(currentTime);
            
            if (isOn != prevAnswer){
                document.querySelector('.root').classList.remove('hide');

                self.update_answer(isOn);
            }
            prevAnswer = isOn;
        }, 1000);
    },
    time_to_str : function(time) { 
        return (time < 10 ? '0' : '') + time
    },

    update_answer : function(isOn) {
        let classes = document.querySelector('body').classList;
        classes.add(this.answerMap[isOn]);
        classes.remove(this.answerMap[!isOn]);
        document.querySelector('link[rel="icon"]').href = this.iconPaths[isOn];
        document.querySelector('title').textContent = `${isOn ? 'duos is live' : 'duos is not live'}`;
        document.querySelector('.answer').textContent = this.answerMap[isOn];
        document.querySelector('.next-message').textContent = `duos is live ${isOn ? 'until' : 'at'} `;
    },
    update_timer : function(currentTime) {
        const timeDifference = currentTime - this.startTime;
        const switchInterval = this.intervalSize * 60 * 60 * 1000;
        const nextSwitchTime = new Date(this.startTime.getTime() + Math.floor(timeDifference / switchInterval) * switchInterval + switchInterval);
        const timeLeft = nextSwitchTime - currentTime;
        const hoursSwitch = nextSwitchTime.getHours();
        const hoursDisplay = hoursSwitch%12==0 ? 12 : hoursSwitch%12;

        const minutesSwitch = this.time_to_str(Math.floor((nextSwitchTime % (60 * 60 * 1000)) / (60 * 1000)));
        const hoursLeft = this.time_to_str(Math.floor(timeLeft / (60 * 60 * 1000)));
        const minutesLeft = this.time_to_str(Math.floor((timeLeft % (60 * 60 * 1000)) / (60 * 1000)));
        const secondsLeft = this.time_to_str(Math.floor((timeLeft % (60 * 1000)) / 1000));

        document.querySelector(`.${this.timeLeftClass}`).textContent = `${hoursDisplay}:${minutesSwitch}${hoursSwitch>11?'pm':'am'}  (-${hoursLeft}:${minutesLeft}:${secondsLeft})`
    }
}

