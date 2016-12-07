let arr = Array(30).fill().map((_, i) => (i % 9) + 1),
    DEBUG = true,
    log = DEBUG ? console.log.bind(window.console) : () => {}, 
    imgSpec = {
      width: 200,
      height: 300
    },
    imgs = _.map(arr,
  (elem) => {
    return "/imgs/" + elem + ".jpg";
  });

const loadImages = () => {
  log("loading images");
  let insert = $("#wall");
  _.each(imgs, (img) => {
    log("loading image", img);
    insert.append(
      $("<img>").attr({
        src: img,
        width: imgSpec.width,
        height: imgSpec.height
      })
    );
  });
};

const scroll = () => {
  log("scroll");
  

};
