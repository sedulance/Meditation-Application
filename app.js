const app = () => {
    const song = document.querySelector(".song");
    const play = document.querySelector(".play");
    const outline = document.querySelector(".moving-outline circle");
    const video = document.querySelector(".vid-container video");
    //tunes
    const tunes = document.querySelectorAll(".sound-picker button");
    //the time
    const timeDisplay = document.querySelector(".time-display");
    const timeSelect = document.querySelectorAll(".time-select button");
    //length of outline
    const outlineLength = outline.getTotalLength();
    //duration of buttons
    let pseudoDuration = 300;

    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;

    //pick different sounds
    tunes.forEach(sound =>{
        sound.addEventListener("click" , function(){
            song.src = this.getAttribute("data-sound");
            video.src = this.getAttribute("data-video");
            checkPlaying(song);
        });
    });


    //play tunes
        play.addEventListener("click" , () => {
            checkPlaying(song);
    });



    // Select sounds
    timeSelect.forEach(option => {
            option.addEventListener("click", function() {
                pseudoDuration = this.getAttribute("data-time");
                timeDisplay.textContent = `${Math.floor(pseudoDuration / 60)}:${Math.floor(pseudoDuration % 60)};`
            });
        });

        // make function to stop and play sounds
        const checkPlaying = song => {
            if (song.paused) {
                song.play();
                play.src = "./svg/pause.svg";
            } else {
                song.pause();
                video.pause();
                play.src = "./svg/play.svg";
            }
        }


        //can animate the circle
        song.ontimeupdate = () => {
            let currentTime = song.currentTime;
            let elapsed = pseudoDuration - currentTime;
            let seconds = Math.floor(elapsed % 60);
            let minutes = Math.floor(elapsed / 60);


            // Animate circle
            let progress = outlineLength - (currentTime / pseudoDuration) * outlineLength;
            outline.style.strokeDashoffset = progress;
            // Animate text
            timeDisplay.textContent = `${minutes}:${seconds}`;

            if(currentTime >= pseudoDuration){
                song.pause();
                song.currentTime = 0;
                play.src = './svg/play.svg';
                video.pause();
            }
        };
    };



    app();