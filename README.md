# dom-goggles

<div align="center"><img src="http://i.imgur.com/ZkwFZJy.png"></div>

What an adorable name, isn't it? i'm kind of proud of it myself. ANYWAY. This tool basically takes an array of websites, an array of strings to look up and will tell you to the best of its skills (it uses phantomjs so modern javascript might break this poor thing) how many times each appears, per webpage and total

## Install & Usage

    npm install dom-goggles

& then

    import domGoggles from 'dom-goggles'
    domGoggles(
      ['http://facebook.com','http://youtube.com','http://yahoo.com'],
      ['<div'],
      {report: true}
    ).then(results => {
      console.log(results);
    }).catch(e => {})

## Okay but why would i want this

Not for much really (unless your are like VERY into counting things. no judgement there). I built this because it's a perfect fit for [index.co](http://index.co)'s existing module based architecture. Just scanning two or three key pages will let me easily pick up with javascript modules (they use class names) should get packed on the main file and which ones don't. Kind of nifty really
