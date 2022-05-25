function GetNASA() {
  let obj = [];
  let api_key = 'Pl97BSWNlJsZeEOVpXkJAtSDHDunyqR8OsteoVqB';
  let date;

  // let placeholder = document.createElement('img');
  // document.querySelector('.imageSection').appendChild(placeholder);
  // placeholder.src =
  //   'https://github.com/CitrineDragon/Images/blob/master/nasa-logo-web-rgb.png?raw=true';

  this.fetch = function () {
    date = document.querySelector('.pictureDate').value;

    fetch(`https://api.nasa.gov/planetary/apod?api_key=${api_key}&date=${date}`)
      .then((res) => res.json())

      .then((data) => {
        console.log(data);
        obj = JSON.parse(JSON.stringify(data));
        // document.querySelector('img').src = data.hdurl;

        let element = document.querySelector('.imageSection');
        while (element.firstChild) {
          element.removeChild(element.firstChild);
        }

        if (data.media_type === 'image') {
          let image = document.createElement('img');
          document.querySelector('.imageSection').appendChild(image);
          image.src = data.hdurl;
        } else if (data.media_type === 'video') {
          let video = document.createElement('iframe');
          document.querySelector('.imageSection').appendChild(video);
          video.src = data.url;
        }

        this.getUpdate();
      })

      .catch((err) => {
        console.log(`error ${err}`);
      });
  };

  this.randomFetch = function () {
    fetch(`https://api.nasa.gov/planetary/apod?api_key=${api_key}&count=1`)
      .then((res) => res.json())

      .then((data) => {
        console.log(data);
        obj = JSON.parse(JSON.stringify(data[0]));
        // document.querySelector('img').src = data[0].hdurl;

        let element = document.querySelector('.imageSection');
        while (element.firstChild) {
          element.removeChild(element.firstChild);
        }

        if (data[0].media_type === 'image') {
          let image = document.createElement('img');
          document.querySelector('.imageSection').appendChild(image);
          image.src = data[0].hdurl;
        } else if (data[0].media_type === 'video') {
          let video = document.createElement('iframe');
          document.querySelector('.imageSection').appendChild(video);
          video.src = data[0].url;
        }

        this.getUpdate();
      })

      .catch((err) => {
        console.log(`error ${err}`);
      });
  };

  this.getUpdate = function () {
    document.querySelector('.titleDisplay').classList.remove('hidden');
    document.querySelector('.dateDisplay').classList.remove('hidden');
    document.querySelector('.explanationDisplay').classList.remove('hidden');
    document.querySelector('.date').innerText = obj.date;
    document.querySelector('.pictureTitle').innerText = obj.title;
    document.querySelector('.pictureExplanation').innerText = obj.explanation;
  };
}

let nasa = new GetNASA();
document
  .querySelector('.pictureSearch')
  .addEventListener('click', nasa.fetch.bind(nasa));
document
  .querySelector('.lucky')
  .addEventListener('click', nasa.randomFetch.bind(nasa));
