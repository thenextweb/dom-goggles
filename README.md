# dom-goggles

<div align="center"><img src="http://i.imgur.com/Jj4dyHY.png"></div>

What an adorable name, isn't it? i'm kind of proud of it myself. ANYWAY. This tool basically takes an array of websites, an array of strings to look up and will tell you to the best of its skills _(it uses phantomjs so modern javascript might break this poor thing)_ how many times each one appears, per webpage and total

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
    }).catch(e => {
        console.error(e);
    })

## Okay but why would i want this

Not for much really (unless you are like VERY into counting things. No judgement there). You can, for example, use it to scan the dom on pages you serve to find the most common web components & load those into the main app bundle, leaving the rest as chunks on demand.

*I mean you might think this is overkill and there's probably better ways to do this but if you are plugging this directly into a php monolyth it's actually like the lightest way? I tried grepping the templates folder first, that actually took longer.*

Let me know if this helped you! PR's for deeper DOM introspection (such as having queryselectorAll or any js really in addition to regex) are EXTREMELY welcome, I just didn't have the need for its particular usage.
